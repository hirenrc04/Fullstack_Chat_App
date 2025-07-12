import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
  <div className="min-h-screen flex items-center justify-center bg-base-100 px-4 ">
    <div className="w-full max-w-lg p-6 bg-base-300 rounded-xl shadow-md space-y-6 mt-15">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-semibold">Profile</h1>
        <p className="text-sm text-zinc-500 mt-1">Your profile information</p>
      </div>

      {/* Avatar Upload */}
      <div className="flex flex-col items-center gap-2">
        <div className="relative">
          <img
            src={selectedImg || authUser.profilePic || "/avatar.png"}
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border-4 border-base-content"
          />
          <label
            htmlFor="avatar-upload"
            className={`absolute bottom-0 right-0 bg-base-content hover:scale-105 p-1.5 rounded-full cursor-pointer transition ${
              isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
            }`}
          >
            <Camera className="w-4 h-4 text-base-200" />
            <input
              type="file"
              id="avatar-upload"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={isUpdatingProfile}
            />
          </label>
        </div>
        <p className="text-xs text-zinc-400">
          {isUpdatingProfile ? "Uploading..." : "Tap camera to update photo"}
        </p>
      </div>

      {/* Profile Info */}
      <div className="space-y-4 text-sm">
        <div>
          <div className="flex items-center gap-2 text-zinc-500 mb-1">
            <User className="w-4 h-4" />
            Full Name
          </div>
          <p className="px-4 py-2 bg-base-200 rounded-lg border text-base">{authUser?.fullName}</p>
        </div>

        <div>
          <div className="flex items-center gap-2 text-zinc-500 mb-1">
            <Mail className="w-4 h-4" />
            Email Address
          </div>
          <p className="px-4 py-2 bg-base-200 rounded-lg border text-base">{authUser?.email}</p>
        </div>
      </div>

      {/* Account Info */}
      <div className="bg-base-200 rounded-lg p-4 text-sm space-y-2">
        <h2 className="text-base font-medium mb-2">Account Information</h2>
        <div className="flex justify-between border-b pb-1">
          <span>Member Since</span>
          <span>{authUser.createdAt?.split("T")[0]}</span>
        </div>
        <div className="flex justify-between">
          <span>Status</span>
          <span className="text-green-500">Active</span>
        </div>
      </div>
    </div>
  </div>
);

};
export default ProfilePage;
