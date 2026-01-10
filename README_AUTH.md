# Google Authentication Setup

This project uses NextAuth.js v5 with Google OAuth for authentication.

## Setup Instructions

### 1. Create Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to **APIs & Services** > **Credentials**
4. Click **Create Credentials** > **OAuth client ID**
5. Choose **Web application**
6. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (for development)
   - `https://yourdomain.com/api/auth/callback/google` (for production)
7. Copy the **Client ID** and **Client Secret**

### 2. Set Environment Variables

Create a `.env.local` file in the root directory:

```env
# Google OAuth Credentials
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_here
```

### 3. Generate NextAuth Secret

Run this command to generate a secure secret:

```bash
openssl rand -base64 32
```

Or use an online generator: https://generate-secret.vercel.app/32

### 4. Start the Development Server

```bash
npm run dev
```

## Features

- ✅ Google OAuth authentication
- ✅ Beautiful sign-in page with glassmorphic design
- ✅ Auth button in navbar showing user info when logged in
- ✅ Session management with NextAuth
- ✅ Protected routes (can be configured in middleware)
- ✅ Automatic redirects for authenticated users

## Usage

- Click "Sign In" in the navbar to authenticate
- Users are redirected to `/auth/signin` page
- After signing in, user info appears in the navbar
- Click the logout button to sign out

## Customization

- Edit `app/auth/signin/page.tsx` to customize the sign-in page
- Edit `components/auth-button.tsx` to customize the auth button
- Edit `middleware.ts` to add protected routes
