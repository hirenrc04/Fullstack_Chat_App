import React, { useCallback, useRef, useState } from 'react';

/**
 * Handles response after successful Google login.
 * You can move or expand this outside the component as well.
 */
async function handleGoogleResponse(credentialResponse) {
  // Replace with your own logic, e.g. send ID token to backend
  // console.log('Received Google credential!', credentialResponse);
  // Example POST request to your backend:
  // await axios.post('/api/auth/google', { token: credentialResponse.credential });
}

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const GOOGLE_AUTH_REDIRECT_URL = 'https://natterly.onrender.com/auth/google';

export default function GoogleLogin() {
  const [cooldown, setCooldown] = useState(false);
  const lastAttemptTime = useRef(0);
  const popupRef = useRef(null);

  // This ensures google.accounts.id is loaded only on demand
  const loadGoogleScript = useCallback(() => {
    return new Promise((resolve, reject) => {
      if (window.google && window.google.accounts && window.google.accounts.id) {
        resolve(window.google.accounts.id);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = () => resolve(window.google.accounts.id);
      script.onerror = reject;
      document.body.appendChild(script);
    });
  }, []);

  // The main login handler
  const handleLoginClick = useCallback(async () => {
    // Chrome/FedCM spam protection: 2s cooldown after every attempt
    const now = Date.now();
    if (cooldown || now - lastAttemptTime.current < 2000) {
      setCooldown(true);
      setTimeout(() => setCooldown(false), 2000);
      return;
    }
    lastAttemptTime.current = now;
    setCooldown(true);
    setTimeout(() => setCooldown(false), 2000);

    try {
      const googleId = await loadGoogleScript();
      let popupClosed = false;

      // Initiate the login flow in popup mode
      googleId.initialize({
        client_id: GOOGLE_CLIENT_ID,
        ux_mode: 'popup',
        callback: async (response) => {
          if (!popupClosed && response?.credential) {
            await handleGoogleResponse(response);
          }
        },
        cancel_on_tap_outside: false,
        // Set auto_select: false to prevent auto popup
        auto_select: false,
      });

      // Show the one-tap popup ONLY on user click
      googleId.prompt((notification) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          // Fallback: If popup is blocked by browser, FedCM blocked/disabled, or user can't proceed
          window.location.href = GOOGLE_AUTH_REDIRECT_URL;
        }
      });
      // No return value
    } catch (err) {
      // Fallback: If script fails to load, or any other issue
      window.location.href = GOOGLE_AUTH_REDIRECT_URL;
    }
  }, [cooldown, loadGoogleScript]);

  return (
    <button
      type="button"
      onClick={handleLoginClick}
      disabled={cooldown}
      style={{
        background: '#fff',
        color: '#555',
        border: '1px solid #ddd',
        borderRadius: '6px',
        padding: '10px 18px',
        fontWeight: 'bold',
        fontSize: '16px',
        cursor: cooldown ? 'not-allowed' : 'pointer',
        boxShadow: '0 1px 3px 0 rgba(60,64,67,.15)',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        transition: 'background 0.19s',
      }}
      aria-disabled={cooldown}
      title={cooldown ? 'Please wait 2s between attempts' : 'Sign in with Google'}
    >
      {/* If you have a Google logo asset, you can include it here */}
      <svg width="20" height="20" viewBox="0 0 48 48" style={{ display: 'inline' }}><g><path fill="#4285F4" d="M24 9.5c3.54 0 6.41 1.23 8.36 3.08l6.25-6.25C34.44 2.58 29.74 0 24 0 14.82 0 6.85 5.52 2.82 13.37l7.54 5.85C12.4 14.08 17.7 9.5 24 9.5z"/><path fill="#34A853" d="M46.12 24.56c0-1.96-.19-3.84-.54-5.63H24v10.66h12.46c-.54 2.91-2.17 5.39-4.6 7.06l7.13 5.57C44.63 38.03 46.12 31.77 46.12 24.56z"/><path fill="#FBBC05" d="M10.36 28.98a14.47 14.47 0 010-9.97l-7.54-5.85A23.935 23.935 0 000 24c0 3.99.97 7.77 2.82 11.15l7.54-6.17z"/><path fill="#EA4335" d="M24 48c6.48 0 11.93-2.13 15.9-5.83l-7.13-5.57c-2 1.41-4.53 2.27-8.77 2.27-6.3 0-11.6-4.58-13.54-10.77l-7.55 6.18C6.87 42.48 14.84 48 24 48z"/></g></svg>
      <span>Sign in with Google</span>
      {cooldown && (
        <span style={{ marginLeft: '8px', color: '#999', fontSize: '13px' }}>Wait…</span>
      )}
    </button>
  );
}
