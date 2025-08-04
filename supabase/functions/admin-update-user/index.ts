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
    console.log('Admin update user function called')
    
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Get the authorization header
    const authHeader = req.headers.get('Authorization')
    console.log('Auth header present:', !!authHeader)
    
    if (!authHeader) {
      console.log('No authorization header')
      return new Response(
        JSON.stringify({ error: 'No authorization header' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Verify the user is authenticated and is an admin
    const token = authHeader.replace('Bearer ', '')
    console.log('Getting user from token')
    
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(token)
    console.log('Auth result:', { user: !!user, authError })
    
    if (authError || !user) {
      console.log('Invalid token or auth error:', authError)
      return new Response(
        JSON.stringify({ error: 'Invalid token' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Parse request body first
    console.log('Parsing request body')
    const { userId, email, action } = await req.json()
    console.log('Request data:', { userId, email, action })

    // Check if user is admin or updating their own profile
    const { data: profile, error: profileError } = await supabaseClient
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    // Allow if user is admin OR if user is updating their own email
    const isAdmin = profile?.role === 'admin'
    const isUpdatingOwnProfile = userId === user.id
    
    if (profileError || (!isAdmin && !isUpdatingOwnProfile)) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized: You can only update your own profile' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (action === 'update-email') {
      console.log('Starting email update for user:', userId, 'to email:', email)
      
      // Update user email with forced confirmation
      const { data: updateData, error: updateError } = await supabaseClient.auth.admin.updateUserById(userId, {
        email: email,
        email_confirm: true
      })

      if (updateError) {
        console.error('Error updating user email:', updateError)
        return new Response(
          JSON.stringify({ error: updateError.message }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      console.log('User email updated successfully:', updateData)

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