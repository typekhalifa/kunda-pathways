import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Get the authorization header
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'No authorization header' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Verify the user is authenticated and is an admin
    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(token)
    
    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Invalid token' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Check if user is admin
    const { data: profile, error: profileError } = await supabaseClient
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profileError || profile?.role !== 'admin') {
      return new Response(
        JSON.stringify({ error: 'Unauthorized: Admin access required' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const { userId, email, action } = await req.json()

    if (action === 'update-email') {
      // First, invalidate all existing sessions for security
      const { error: signOutError } = await supabaseClient.auth.admin.signOutUser(userId)
      if (signOutError) {
        console.log('Warning: Could not sign out user sessions:', signOutError.message)
      }

      // Update user email with forced confirmation and invalidate old email
      const { error: updateError } = await supabaseClient.auth.admin.updateUserById(userId, {
        email: email,
        email_confirm: true,
        // Force the old email to be completely replaced
        new_email: null,
        email_change_sent_at: null,
        email_change_token: null,
        email_change_confirm_status: 0
      })

      if (updateError) {
        console.error('Error updating user email:', updateError)
        return new Response(
          JSON.stringify({ error: updateError.message }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      // Force sign out all sessions after email change
      const { error: finalSignOutError } = await supabaseClient.auth.admin.signOutUser(userId)
      if (finalSignOutError) {
        console.log('Warning: Could not sign out user sessions after email change:', finalSignOutError.message)
      }

      // Update email in profiles table
      const { error: profileUpdateError } = await supabaseClient
        .from('profiles')
        .update({ email })
        .eq('id', userId)

      if (profileUpdateError) {
        console.error('Error updating profile email:', profileUpdateError)
        return new Response(
          JSON.stringify({ error: profileUpdateError.message }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      return new Response(
        JSON.stringify({ message: 'User email updated successfully. Old email is now invalid.' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify({ error: 'Invalid action' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error in admin-update-user function:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})