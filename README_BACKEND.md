# Backend Implementation Guide

This document describes the backend implementation for Characteria.

## Tech Stack

- **Next.js App Router** - API routes
- **TypeScript** - Type safety
- **Supabase** - Authentication & Database
- **Google OAuth** - Authentication provider (via Supabase)

## Setup Instructions

### 1. Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **Settings** > **API** and copy:
   - Project URL
   - Anon (public) key

### 2. Environment Variables

Create a `.env.local` file:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# NextAuth (if still using for frontend)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_here
```

### 3. Database Setup

1. Go to Supabase Dashboard > **SQL Editor**
2. Run the SQL from `supabase/schema.sql`
3. This creates:
   - `users` table
   - `characters` table
   - `generations` table
   - RLS policies
   - Indexes

### 4. Google OAuth Setup

1. In Supabase Dashboard, go to **Authentication** > **Providers**
2. Enable **Google** provider
3. Add your Google OAuth credentials:
   - Client ID
   - Client Secret
4. Add redirect URL: `https://your-project.supabase.co/auth/v1/callback`

## API Routes

### POST /api/characters

Create a new character.

**Request:**
```json
{
  "name": "Character Name",
  "metadata": {
    "basics": {
      "name": "Character Name",
      "age": "24",
      "gender": "Female",
      "setting": "Cyberpunk Neo-Tokyo",
      "relationship": "Mentor"
    },
    "personality": {
      "warmth": 65,
      "confidence": 45,
      "calmness": 70,
      "reserve": 50
    }
  }
}
```

**Response:**
```json
{
  "id": "uuid",
  "name": "Character Name",
  "metadata": {...},
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-01T00:00:00Z"
}
```

### GET /api/characters

Get all characters for the authenticated user.

**Response:**
```json
{
  "characters": [
    {
      "id": "uuid",
      "name": "Character Name",
      "metadata": {...},
      "created_at": "2024-01-01T00:00:00Z",
      "updated_at": "2024-01-01T00:00:00Z"
    }
  ]
}
```

### GET /api/characters/:id

Get a single character by ID.

**Response:**
```json
{
  "id": "uuid",
  "name": "Character Name",
  "metadata": {...},
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-01T00:00:00Z"
}
```

### POST /api/generate

Generate AI content for a character.

**Request:**
```json
{
  "character_id": "uuid",
  "section_type": "personality",
  "user_api_key": "user-provided-api-key",
  "selected_model": "gemini-pro"
}
```

**Response:**
```json
{
  "content": "Generated content...",
  "section_type": "personality",
  "character_id": "uuid"
}
```

**Supported section types:**
- `personality`
- `backstory`
- `traits`
- `speech`
- `initial_message`

**Supported models:**
- `gemini-pro` (Google Gemini)
- `gpt-4`, `gpt-3.5-turbo` (OpenAI)

### POST /api/image-prompt

Generate image prompts (text only).

**Request:**
```json
{
  "character_id": "uuid",
  "mode": "SFW",
  "style": "realistic",
  "environment": "Neon-lit Tokyo back alley",
  "camera": "85mm Prime, f/1.8"
}
```

**Response:**
```json
{
  "prompt": "Highly detailed SFW realistic style portrait of...",
  "character_id": "uuid",
  "mode": "SFW",
  "style": "realistic"
}
```

## Security Features

1. **Authentication Required**: All API routes require Supabase authentication
2. **Ownership Validation**: Users can only access their own characters
3. **Rate Limiting**: Generation endpoints are rate-limited (10 requests/minute)
4. **Input Validation**: All inputs are validated before processing
5. **RLS Policies**: Database-level security via Row Level Security

## Architecture

```
lib/
  supabase/        # Supabase client utilities
  prompts/         # Prompt builders
  ai/              # AI provider implementations
  validation/      # Input validation
  rate-limit.ts    # Rate limiting

app/api/
  characters/      # Character CRUD
  generate/        # AI generation
  image-prompt/    # Image prompt generation

types/
  database.ts      # TypeScript types
```

## Key Design Decisions

1. **BYO API Keys**: Users provide their own AI API keys (no cost to platform)
2. **Section-based Generation**: Each section has its own prompt template
3. **Metadata as JSONB**: Flexible character data storage
4. **Supabase Auth**: Centralized authentication
5. **RLS Policies**: Database-level security

## Error Handling

All routes return consistent error responses:

```json
{
  "error": "Error message"
}
```

Status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `429` - Rate Limited
- `500` - Internal Server Error

## Testing

Test the API routes using:

```bash
# Create character
curl -X POST http://localhost:3000/api/characters \
  -H "Cookie: sb-access-token=..." \
  -H "Content-Type: application/json" \
  -d '{"name": "Test", "metadata": {...}}'

# List characters
curl http://localhost:3000/api/characters \
  -H "Cookie: sb-access-token=..."
```

## Future Enhancements

- Redis-based rate limiting
- Caching for frequently accessed characters
- Batch generation endpoints
- Character templates/presets
- Export functionality
