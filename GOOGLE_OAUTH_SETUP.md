# Google OAuth Setup Instructions

## Backend Environment Variables

Add these environment variables to your backend `.env` file:

```env
# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id-here

# JWT Secret (if not already set)
JWT_SECRET=your-super-secret-jwt-key-here
```

## Frontend Environment Variables

Add this environment variable to your frontend `.env` file:

```env
VITE_GOOGLE_CLIENT_ID=your-google-client-id-here
```

## Google Cloud Console Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to "Credentials" in the API & Services section
5. Create credentials → OAuth 2.0 Client IDs
6. Set application type to "Web application"
7. Add authorized JavaScript origins:
   - For development: `http://localhost:3000`
   - For production: `https://natterly.onrender.com`
8. Copy the Client ID and add it to your environment variables

## API Endpoints

The following endpoints have been added:

- `POST /api/auth/google/callback` - Google OAuth callback endpoint
- `GET /api/auth/current-user` - Get current user info (requires JWT token)

## Features Implemented

✅ Google OAuth login with JWT tokens stored in localStorage
✅ User info saved to MongoDB (name, email, Google ID, profile photo)
✅ Duplicate user prevention - existing users are updated with Google info
✅ JWT generation and validation
✅ Protected API routes with Authorization header
✅ Logout functionality that clears JWT from localStorage
✅ Frontend components for Google OAuth integration

## Installation

1. Install the new backend dependency:
```bash
cd backend
npm install google-auth-library
```

2. The frontend components are already created and integrated into LoginPage and SignUpPage.

## Usage

Users can now:
1. Click "Continue with Google" on login/signup pages
2. Authenticate with Google
3. Get automatically logged in with JWT token stored in localStorage
4. Use the app with protected routes
5. Logout to clear the JWT token

The system handles both new users (creates account) and existing users (updates with Google info if needed).
