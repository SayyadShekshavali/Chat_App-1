import React from "react";
import useAuthUser from "../hooks/useAuthUser";
import { useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { compeleteOnboading } from "../lib/api";
import {
  CameraIcon,
  ShuffleIcon,
  MapPinIcon,
  ShipWheelIcon,
  Loader2,
} from "lucide-react";
import { LANGUAGES } from "../constants";
console.log("LANGUAGES:", LANGUAGES, Array.isArray(LANGUAGES));

import { useNavigate } from "react-router-dom";
const OnboardingPage = () => {
  const navigate = useNavigate();
  const { authUser } = useAuthUser();
  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
    location: authUser?.location || "",
    Profilepic: authUser?.Profilepic || "",
  });

  const queryClient = useQueryClient();
  const { mutate: onboadingMutation, isPending } = useMutation({
    mutationFn: compeleteOnboading,
    onSuccess: () => {
      toast.success("Profile onboarded successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      navigate("/");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onboadingMutation(formState);
  };
  const handleRandomAvatar = () => {
    const idx = Math.floor(Math.random() * 100) + 1;
    const randAvatar = `https:avatar.iran.liara.run/public/${idx}.png`;
    setFormState({ ...formState, Profilepic: randAvatar });
    toast.success("Random Avatar Generated");
  };
  return (
    <div className="min-h-screen bg-base-200 w-full flex items-center justify-center p-4">
      <div className="card w-full max-w-lg shadow-lg bg-base-100">
        <div className="card-body p-6 sm:p-8 lg:p-10">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-6 ">
            Completer your Profile
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/** Profile Pic Container */}
            <div className=" flex flex-col items-center justify-center space-y-4">
              {/** Profile Pic Preview */}
              <div className="size-32 rounded-full bg-base-200 overflow-hidden">
                {formState.Profilepic ? (
                  <img
                    src={formState.Profilepic}
                    alt="Profile preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <CameraIcon className="size-12 text-base-content opacity-40" />
                  </div>
                )}
              </div>
              {/** Genearate random avata */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleRandomAvatar}
                  className="btn btn-accent"
                >
                  <ShuffleIcon className="size-4 mr-2" />
                  Generate Random Avatar
                </button>
              </div>
            </div>
            {/** Full Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formState.fullName}
                onChange={(e) =>
                  setFormState({ ...formState, fullName: e.target.value })
                }
                className="input input-bordered w-full"
                required
                placeholder="Enter your full name"
              />
            </div>
            {/**BIO */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Bio</span>
              </label>
              <textarea
                name="bio"
                value={formState.bio}
                onChange={(e) =>
                  setFormState({ ...formState, bio: e.target.value })
                }
              />
            </div>
            {/** Languages */}
            <div className="grid  grid-cols-1 md:grid-cols-2 gap-4">
              {/**Native Languages */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Native Language</span>
                </label>
                <select
                  name="nativeLanguage"
                  value={formState.nativeLanguage}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      nativeLanguage: e.target.value,
                    })
                  }
                  className="select select-bordered w-full"
                >
                  <option value={""}>Select Ur native Language</option>
                  {Array.isArray(LANGUAGES) &&
                    LANGUAGES.map((lang) => (
                      <option key={`native-${lang}`} value={lang.toLowerCase()}>
                        {lang}
                      </option>
                    ))}
                </select>
              </div>
              {/**Learning Languages */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Learning Language</span>
                </label>
                <select
                  name="learningLanguage"
                  value={formState.learningLanguage}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      learningLanguage: e.target.value,
                    })
                  }
                  className="select select-bordered w-full"
                >
                  <option value={""}>Select Ur native Language</option>
                  {Array.isArray(LANGUAGES) &&
                    LANGUAGES.map((lang) => (
                      <option key={`native-${lang}`} value={lang.toLowerCase()}>
                        {lang}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            {/** Location */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Location</span>
              </label>
              <div className="relative">
                <MapPinIcon className=" absolute left-3 top-1/2  transform -translate-y-1/2 text-gray-500 opacity-100 size-5 z-10" />
                <input
                  type="text"
                  name="location"
                  value={formState.location}
                  onChange={(e) =>
                    setFormState({ ...formState, location: e.target.value })
                  }
                  className="input input-bordered w-full pl-10 "
                  placeholder="Enter your location"
                />
              </div>
            </div>
            {/** Submit Button */}
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isPending}
            >
              {!isPending ? (
                <>
                  <ShipWheelIcon className="size-5 mr-2" />
                  Complete Onboarding
                </>
              ) : (
                <>
                  <Loader2 className="size-5 mr-2 animate-spin" />
                  Onboarding....
                </>
              )}
            </button>
          </form>
          /
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
