import { MessageSquare } from "lucide-react";
import AuthImagePattern from "../components/AuthImagePattern";
import GoogleOAuth from "../components/GoogleOAuth";

const GoogleLoginPage = () => {
  return (
    <div className="h-screen grid lg:grid-cols-2">
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Continue with Google</h1>
              <p className="text-base-content/60">
                We use Google to sign you in securely. No redirects or popups.
              </p>
            </div>
          </div>

          {/* Auto One Tap + fallback button */}
          <GoogleOAuth />

          <div className="text-sm text-base-content/60 text-center px-6">
            By continuing, you agree to our Terms and acknowledge our Privacy Policy.
          </div>
        </div>
      </div>

      <AuthImagePattern
        title={"Fast, secure sign-in"}
        subtitle={"Use your Google account to jump right back into your chats."}
      />
    </div>
  );
};

export default GoogleLoginPage;


