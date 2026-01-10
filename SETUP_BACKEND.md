# Backend Setup Guide

## Quick Start

### 1. Install Dependencies

Already installed:
- `@supabase/supabase-js`
- `@supabase/ssr`

### 2. Supabase Project Setup

1. **Create Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Wait for database to initialize

2. **Get Credentials**
   - Go to **Settings** > **API**
   - Copy **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - Copy **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

3. **Set Environment Variables**
   
   Create `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

### 3. Database Setup

1. **Run SQL Schema**
   - Go to Supabase Dashboard > **SQL Editor**
   - Copy contents of `supabase/schema.sql`
   - Paste and run
   - This creates:
     - Tables (users, characters, generations)
     - Indexes
     - RLS policies
     - Triggers

2. **Verify Tables**
   - Go to **Table Editor**
   - You should see: `users`, `characters`, `generations`

### 4. Google OAuth Setup

1. **Enable Google Provider**
   - Go to **Authentication** > **Providers**
   - Enable **Google**
   - Add your Google OAuth credentials:
     - Client ID
     - Client Secret
   - Save

2. **Set Redirect URL**
   - In Google Cloud Console, add:
     - `https://your-project.supabase.co/auth/v1/callback`

### 5. Test the Backend

1. **Start Dev Server**
   ```bash
   npm run dev
   ```

2. **Test Authentication**
   - Sign in with Google
   - Check Supabase Dashboard > **Authentication** > **Users**
   - You should see your user

3. **Test API Routes**
   - Use the API routes from `README_BACKEND.md`
   - Or test via frontend

## File Structure

```
lib/
  supabase/
    client.ts          # Browser client
    server.ts          # Server client
    middleware.ts      # Auth middleware
    auth.ts            # Auth helpers
  prompts/
    builders.ts        # Prompt generation
  ai/
    providers.ts       # AI provider implementations
    parsers.ts         # Response parsers
  validation/
    characters.ts      # Input validation
  rate-limit.ts        # Rate limiting

app/api/
  characters/
    route.ts           # POST, GET /api/characters
    [id]/
      route.ts         # GET, PATCH, DELETE /api/characters/:id
  generate/
    route.ts           # POST /api/generate
  image-prompt/
    route.ts           # POST /api/image-prompt

supabase/
  schema.sql           # Database schema

types/
  database.ts          # TypeScript types
```

## Security Checklist

- ✅ All API routes require authentication
- ✅ Ownership validation on all character operations
- ✅ Rate limiting on generation endpoints
- ✅ Input validation on all endpoints
- ✅ RLS policies on database tables
- ✅ No API keys stored in backend
- ✅ No sensitive data in logs

## Troubleshooting

### "Unauthorized" errors
- Check Supabase session is valid
- Verify user is authenticated
- Check RLS policies are enabled

### Database errors
- Verify schema.sql was run
- Check table names match
- Verify foreign key constraints

### AI generation fails
- Check user provided valid API key
- Verify model name is correct
- Check AI provider API status

## Next Steps

1. Update frontend to use Supabase auth
2. Connect frontend to API routes
3. Test full character creation flow
4. Deploy to production
