-- Fix missing search_path for functions
ALTER FUNCTION public.update_meeting_combinations() SET search_path = public;
ALTER FUNCTION public.handle_updated_at() SET search_path = public;

-- Add missing RLS policies for meeting_reminders
CREATE POLICY "Users can view their own reminders"
  ON public.meeting_reminders FOR SELECT
  TO authenticated
  USING (participant_id = auth.uid());

CREATE POLICY "Users can manage their own reminders"
  ON public.meeting_reminders FOR ALL
  TO authenticated
  USING (participant_id = auth.uid());