-- Add DELETE policy for consultation_bookings table so admins can delete records
CREATE POLICY "Only admins can delete consultation bookings" 
ON consultation_bookings 
FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'::user_role
  )
);