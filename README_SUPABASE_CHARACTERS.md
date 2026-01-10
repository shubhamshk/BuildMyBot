# Supabase Character Storage Setup

This guide explains how to set up Supabase to store generated characters for your Anisoul Forge project.

## Prerequisites

1. A Supabase account at [supabase.com](https://supabase.com)
2. A Supabase project created
3. Your environment variables configured in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Database Setup

### Option 1: Run the Migration (Recommended)

Copy and paste the contents of `supabase/migrations/001_create_characters_table.sql` into the SQL Editor in your Supabase dashboard:

1. Go to your Supabase project dashboard
2. Click on "SQL Editor" in the left sidebar
3. Click "New Query"
4. Paste the entire contents of the migration file
5. Click "Run"

### Option 2: Manual Table Creation

If you prefer to create the table manually through the UI:

1. Go to "Table Editor" in your Supabase dashboard
2. Click "Create a new table"
3. Name it `characters`
4. Add the following columns:

| Column | Type | Default | Notes |
|--------|------|---------|-------|
| id | uuid | gen_random_uuid() | Primary Key |
| user_id | uuid | - | Foreign key to auth.users |
| name | text | - | Required |
| age | text | - | Required |
| gender | text | - | Required |
| setting | text | - | Required |
| relationship | text | - | Required |
| personality_warmth | int4 | 50 | |
| personality_confidence | int4 | 50 | |
| personality_calmness | int4 | 50 | |
| personality_reserve | int4 | 50 | |
| backstory_style | text | - | Nullable |
| speech_tone | text | - | Nullable |
| speech_vocabulary | text | - | Nullable |
| speech_patterns | text | - | Nullable |
| content_rating | text | - | Nullable |
| topics | text | - | Nullable |
| tone | text | - | Nullable |
| generated_personality | text | - | Nullable |
| generated_backstory | text | - | Nullable |
| generated_traits | text | - | Nullable |
| generated_speech | text | - | Nullable |
| generated_initial_message | text | - | Nullable |
| generated_scenario | text | - | Nullable |
| created_at | timestamptz | now() | |
| updated_at | timestamptz | now() | |

5. Enable Row Level Security (RLS)
6. Create the RLS policies as shown in the migration file

## Row Level Security Policies

The migration file creates the following RLS policies to ensure users can only access their own characters:

- **SELECT**: Users can view their own characters
- **INSERT**: Users can create characters for themselves
- **UPDATE**: Users can update their own characters
- **DELETE**: Users can delete their own characters

## Features

Once set up, users can:

1. **Save Characters**: After generating a character, click "Save" to store it to their profile
2. **View Saved Characters**: Visit `/profile` to see all saved characters
3. **View Character Details**: Click on any saved character to view its full details
4. **Delete Characters**: Remove unwanted characters (with confirmation)

## Authentication

The system uses Supabase Auth with Google OAuth. Make sure you have configured:

1. Google OAuth in your Supabase project (Authentication > Providers > Google)
2. Proper redirect URLs in your Google Cloud Console
3. The callback URL in your app (`/auth/callback`)

## Troubleshooting

### Characters not saving
- Check that RLS policies are correctly set up
- Verify the user is authenticated
- Check browser console for error messages

### Can't see saved characters
- Make sure you're logged in with the same account
- Check that the `user_id` column matches your auth user ID

### Database errors
- Verify all columns exist with correct types
- Check that foreign key to `auth.users` is properly set up
