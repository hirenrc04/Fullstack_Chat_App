# Environment Variables Setup Instructions

## 📁 Step-by-Step Setup

### 1. Create Frontend Environment File

**Create file:** `frontend/.env`

**Content:**
```env
VITE_GOOGLE_CLIENT_ID=your-google-client-id-here
```

### 2. Create Backend Environment File

**Create file:** `backend/.env`

**Content:**
```env
# Google OAuth Configuration
GOOGLE_CLIENT_ID=your-google-client-id-here

# JWT Secret (for token generation)
JWT_SECRET=your-super-secret-jwt-key-here

# Database Connection
MONGODB_URI=mongodb://localhost:27017/chat-app

# Server Configuration
PORT=5001
NODE_ENV=development
```

## 🔑 Getting Your Google Client ID

1. **Go to [Google Cloud Console](https://console.cloud.google.com/)**
2. **Create/Select a project**
3. **Enable Google+ API:**
   - APIs & Services → Library
   - Search "Google+ API" → Enable
4. **Create OAuth 2.0 Credentials:**
   - APIs & Services → Credentials
   - Create Credentials → OAuth 2.0 Client ID
   - Application type: Web application
   - Authorized origins:
     - `http://localhost:3000`
     - `https://natterly.onrender.com`
5. **Copy the Client ID** and use it in both `.env` files

## 📋 File Structure

Your project should look like this:

```
Fullstack_Chat_App/
├── frontend/
│   ├── .env                    ← Create this file
│   ├── src/
│   └── package.json
├── backend/
│   ├── .env                    ← Create this file
│   ├── src/
│   └── package.json
└── .gitignore                  ← Make sure .env is ignored
```

## ✅ Verification

After creating the files:

1. **Restart both servers:**
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev
   
   # Terminal 2 - Frontend  
   cd frontend
   npm run dev
   ```

2. **Check for errors:**
   - Browser console should not show "client_id=undefined"
   - Google OAuth button should work
   - No environment variable errors

## 🚨 Common Issues

- **"client_id=undefined"**: Check if `VITE_GOOGLE_CLIENT_ID` is set in `frontend/.env`
- **Environment not loading**: Restart your development server
- **Wrong file location**: `.env` must be in `frontend/` and `backend/` directories
- **CORS errors**: Add your domain to Google Cloud Console authorized origins

## 🔒 Security Notes

- Never commit `.env` files to git
- Use different client IDs for development/production
- Keep your JWT secret secure and random
- Rotate keys regularly
