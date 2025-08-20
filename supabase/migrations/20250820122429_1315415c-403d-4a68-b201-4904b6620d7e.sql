-- Add DELETE policy for contact_messages table so admins can delete records
CREATE POLICY "Only admins can delete contact messages" 
ON contact_messages 
FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'::user_role
  )
);