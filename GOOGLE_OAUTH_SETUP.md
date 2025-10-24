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

Create a `.env` file in your `frontend` directory and add this environment variable:

```env
VITE_GOOGLE_CLIENT_ID=your-google-client-id-here
```

**Important:** Make sure the `.env` file is in the `frontend` directory, not the root directory. The variable must start with `VITE_` to be accessible in the frontend code.

Example:
```env
VITE_GOOGLE_CLIENT_ID=123456789-abcdefghijklmnop.apps.googleusercontent.com
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

## Troubleshooting

### "Missing required parameter: client_id" Error

This error occurs when the `VITE_GOOGLE_CLIENT_ID` environment variable is not set or not accessible. To fix:

1. **Check your `.env` file location**: Make sure it's in the `frontend` directory, not the root
2. **Verify the variable name**: Must be exactly `VITE_GOOGLE_CLIENT_ID` (case-sensitive)
3. **Restart your development server**: After adding environment variables, restart with `npm run dev`
4. **Check the file format**: No spaces around the `=` sign
   ```env
   VITE_GOOGLE_CLIENT_ID=your-client-id-here
   ```

### Common Issues

- **Environment variable not loading**: Restart your dev server after adding `.env` file
- **Wrong client ID**: Make sure you're using the correct Google OAuth client ID from Google Cloud Console
- **CORS errors**: Add your domain to authorized origins in Google Cloud Console
- **Script loading errors**: Check browser console for network errors loading Google OAuth script
