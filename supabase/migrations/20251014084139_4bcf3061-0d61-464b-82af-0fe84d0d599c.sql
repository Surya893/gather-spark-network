-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types
CREATE TYPE meeting_type AS ENUM ('one_on_one', 'group', 'braindate', 'project_sync');
CREATE TYPE meeting_location AS ENUM ('in_person', 'video', 'hybrid');
CREATE TYPE meeting_status AS ENUM ('scheduled', 'completed', 'cancelled', 'rescheduled');
CREATE TYPE user_status AS ENUM ('online', 'offline', 'busy', 'away');

-- Profiles table (extends auth.users)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  role TEXT,
  department TEXT,
  skills TEXT[],
  interests TEXT[],
  phone TEXT,
  linkedin_url TEXT,
  status user_status DEFAULT 'offline',
  availability_status TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Members table (for cohort-specific data)
CREATE TABLE public.members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  cohort_id UUID,
  join_date TIMESTAMPTZ DEFAULT now(),
  is_active BOOLEAN DEFAULT true,
  UNIQUE(profile_id, cohort_id)
);

-- Meetings table
CREATE TABLE public.meetings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  meeting_type meeting_type NOT NULL,
  location_type meeting_location NOT NULL,
  location_details TEXT,
  scheduled_date TIMESTAMPTZ NOT NULL,
  duration_minutes INTEGER DEFAULT 30,
  status meeting_status DEFAULT 'scheduled',
  is_recurring BOOLEAN DEFAULT false,
  recurrence_pattern TEXT,
  agenda TEXT,
  notes TEXT,
  recording_url TEXT,
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Meeting participants (many-to-many)
CREATE TABLE public.meeting_participants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  meeting_id UUID REFERENCES public.meetings(id) ON DELETE CASCADE,
  participant_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending',
  UNIQUE(meeting_id, participant_id)
);

-- Meeting combinations tracker (for analytics)
CREATE TABLE public.meeting_combinations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  participant_1_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  participant_2_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  meeting_count INTEGER DEFAULT 0,
  last_meeting_date TIMESTAMPTZ,
  connection_strength DECIMAL(3,2) DEFAULT 0.00,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(participant_1_id, participant_2_id),
  CHECK (participant_1_id < participant_2_id) -- Ensure ordered pairs
);

-- Private ratings and feedback (encrypted at app level)
CREATE TABLE public.meeting_feedback (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  meeting_id UUID REFERENCES public.meetings(id) ON DELETE CASCADE,
  reviewer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  private_notes TEXT,
  effectiveness_score INTEGER CHECK (effectiveness_score >= 1 AND effectiveness_score <= 5),
  follow_up_actions TEXT[],
  would_meet_again BOOLEAN,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(meeting_id, reviewer_id)
);

-- Meeting reminders
CREATE TABLE public.meeting_reminders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  meeting_id UUID REFERENCES public.meetings(id) ON DELETE CASCADE,
  participant_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  reminder_time TIMESTAMPTZ NOT NULL,
  sent BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Calendar integrations
CREATE TABLE public.calendar_integrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  provider TEXT NOT NULL, -- 'google', 'outlook', etc.
  access_token TEXT,
  refresh_token TEXT,
  token_expires_at TIMESTAMPTZ,
  calendar_id TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, provider)
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meetings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meeting_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meeting_combinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meeting_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meeting_reminders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.calendar_integrations ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Profiles are viewable by authenticated users"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- RLS Policies for members
CREATE POLICY "Members are viewable by authenticated users"
  ON public.members FOR SELECT
  TO authenticated
  USING (true);

-- RLS Policies for meetings
CREATE POLICY "Meetings are viewable by participants"
  ON public.meetings FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.meeting_participants
      WHERE meeting_id = id AND participant_id = auth.uid()
    ) OR created_by = auth.uid()
  );

CREATE POLICY "Users can create meetings"
  ON public.meetings FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Meeting creators can update their meetings"
  ON public.meetings FOR UPDATE
  TO authenticated
  USING (auth.uid() = created_by);

-- RLS Policies for meeting_participants
CREATE POLICY "Participants can view their own participation"
  ON public.meeting_participants FOR SELECT
  TO authenticated
  USING (participant_id = auth.uid() OR meeting_id IN (
    SELECT id FROM public.meetings WHERE created_by = auth.uid()
  ));

CREATE POLICY "Meeting creators can add participants"
  ON public.meeting_participants FOR INSERT
  TO authenticated
  WITH CHECK (meeting_id IN (
    SELECT id FROM public.meetings WHERE created_by = auth.uid()
  ));

-- RLS Policies for meeting_combinations
CREATE POLICY "Users can view their own combinations"
  ON public.meeting_combinations FOR SELECT
  TO authenticated
  USING (participant_1_id = auth.uid() OR participant_2_id = auth.uid());

-- RLS Policies for meeting_feedback (private)
CREATE POLICY "Users can view their own feedback"
  ON public.meeting_feedback FOR SELECT
  TO authenticated
  USING (reviewer_id = auth.uid());

CREATE POLICY "Users can create their own feedback"
  ON public.meeting_feedback FOR INSERT
  TO authenticated
  WITH CHECK (reviewer_id = auth.uid());

CREATE POLICY "Users can update their own feedback"
  ON public.meeting_feedback FOR UPDATE
  TO authenticated
  USING (reviewer_id = auth.uid());

-- RLS Policies for calendar_integrations
CREATE POLICY "Users can manage their own calendar integrations"
  ON public.calendar_integrations FOR ALL
  TO authenticated
  USING (user_id = auth.uid());

-- Function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  );
  RETURN NEW;
END;
$$;

-- Trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update meeting combinations
CREATE OR REPLACE FUNCTION public.update_meeting_combinations()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
  participant_ids UUID[];
  p1 UUID;
  p2 UUID;
BEGIN
  -- Get all participants for this meeting
  SELECT array_agg(participant_id) INTO participant_ids
  FROM public.meeting_participants
  WHERE meeting_id = NEW.id;

  -- Update combinations for each pair
  IF array_length(participant_ids, 1) >= 2 THEN
    FOR i IN 1..array_length(participant_ids, 1)-1 LOOP
      FOR j IN i+1..array_length(participant_ids, 1) LOOP
        p1 := LEAST(participant_ids[i], participant_ids[j]);
        p2 := GREATEST(participant_ids[i], participant_ids[j]);
        
        INSERT INTO public.meeting_combinations (participant_1_id, participant_2_id, meeting_count, last_meeting_date)
        VALUES (p1, p2, 1, NEW.scheduled_date)
        ON CONFLICT (participant_1_id, participant_2_id)
        DO UPDATE SET
          meeting_count = public.meeting_combinations.meeting_count + 1,
          last_meeting_date = NEW.scheduled_date,
          updated_at = now();
      END LOOP;
    END LOOP;
  END IF;

  RETURN NEW;
END;
$$;

-- Trigger to update combinations when meeting is completed
CREATE TRIGGER update_combinations_on_meeting_complete
  AFTER UPDATE OF status ON public.meetings
  FOR EACH ROW
  WHEN (NEW.status = 'completed' AND OLD.status != 'completed')
  EXECUTE FUNCTION public.update_meeting_combinations();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Triggers for updated_at
CREATE TRIGGER handle_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_meetings_updated_at BEFORE UPDATE ON public.meetings
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_meeting_combinations_updated_at BEFORE UPDATE ON public.meeting_combinations
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_meeting_feedback_updated_at BEFORE UPDATE ON public.meeting_feedback
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();