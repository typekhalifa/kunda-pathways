
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { validateEmail, sanitizeHtml, rateLimiter } from '@/lib/security';

interface Profile {
  id: string;
  email: string | null;
  full_name: string | null;
  role: 'admin' | 'user';
  created_at: string;
  updated_at: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  updatePassword: (newPassword: string) => Promise<{ error: any }>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchProfile = async (userId: string) => {
      try {
        console.log('🔍 Fetching profile for user:', userId);
        const { data: profileData, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .maybeSingle();
        
        console.log('📊 Profile fetch result:', { profileData, error });
        
        if (mounted) {
          if (error) {
            console.error('❌ Error fetching profile:', error);
            setProfile(null);
          } else if (profileData) {
            console.log('✅ Setting profile:', profileData);
            setProfile(profileData);
          } else {
            console.log('⚠️ No profile found for user');
            setProfile(null);
          }
        }
      } catch (error) {
        console.error('💥 Profile fetch error:', error);
        if (mounted) {
          setProfile(null);
        }
      }
    };

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('🔐 Auth state changed:', { event, user: session?.user?.email });
        if (!mounted) return;
        
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          console.log('👤 User found, fetching profile...');
          // Use setTimeout to avoid blocking the auth state change
          setTimeout(() => {
            fetchProfile(session.user.id);
          }, 0);
        } else {
          console.log('👻 No user, clearing profile');
          setProfile(null);
        }
        
        console.log('✨ Setting loading to false');
        setLoading(false);
      }
    );

    // Check for existing session
    const initializeAuth = async () => {
      try {
        console.log('🚀 Initializing auth...');
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (!mounted) return;
        
        if (error) {
          console.error('❌ Session error:', error);
          setLoading(false);
          return;
        }

        console.log('📝 Initial session:', { user: session?.user?.email });
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          console.log('👤 Initial user found, fetching profile...');
          await fetchProfile(session.user.id);
        }
        
        console.log('✨ Initial loading complete');
        setLoading(false);
      } catch (error) {
        console.error('💥 Auth initialization error:', error);
        if (mounted) {
          setLoading(false);
        }
      }
    };

    initializeAuth();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      // Input validation
      if (!validateEmail(email)) {
        return { error: { message: 'Invalid email format' } };
      }
      
      // Rate limiting check
      if (!rateLimiter.isAllowed(email, 5, 900000)) { // 5 attempts per 15 minutes
        return { error: { message: 'Too many login attempts. Please try again later.' } };
      }

      const { error } = await supabase.auth.signInWithPassword({
        email: sanitizeHtml(email),
        password
      });

      // Log security event
      try {
        await supabase.rpc('log_security_event', {
          p_action: 'auth_attempt',
          p_resource: 'authentication',
          p_success: !error,
          p_details: { email, timestamp: new Date().toISOString() }
        });
      } catch (logError) {
        console.warn('Failed to log security event:', logError);
      }

      if (error) {
        console.error('Sign-in error:', error);
      } else {
        rateLimiter.reset(email);
      }

      return { error };
    } catch (error) {
      console.error('Sign-in error:', error);
      return { error };
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      // Input validation
      if (!validateEmail(email)) {
        return { error: { message: 'Invalid email format' } };
      }
      
      if (password.length < 8) {
        return { error: { message: 'Password must be at least 8 characters long' } };
      }

      const { error } = await supabase.auth.signUp({
        email: sanitizeHtml(email),
        password,
        options: {
          data: {
            full_name: sanitizeHtml(fullName),
          },
          emailRedirectTo: `${window.location.origin}/admin/dashboard`,
        },
      });

      // Log security event
      try {
        await supabase.rpc('log_security_event', {
          p_action: 'user_signup',
          p_resource: 'authentication',
          p_success: !error,
          p_details: { email, timestamp: new Date().toISOString() }
        });
      } catch (logError) {
        console.warn('Failed to log security event:', logError);
      }

      return { error };
    } catch (error) {
      console.error('Sign-up error:', error);
      return { error };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const updatePassword = async (newPassword: string) => {
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    });
    return { error };
  };

  const isAdmin = profile?.role === 'admin';

  const value = {
    user,
    session,
    profile,
    loading,
    signIn,
    signUp,
    signOut,
    updatePassword,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
