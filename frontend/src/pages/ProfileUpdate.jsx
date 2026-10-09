import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ImagePlus, Loader2, Lock, UserRound } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { useAuthStore } from "../store/useAuthStore.js";

const ProfileUpdateSchema = z.object({
  name: z.string().trim().min(3, "Name must be at least 3 characters."),
  profileImage: z.instanceof(File).optional().refine(
    (file) => !file || file.type.startsWith("image/"),
    "Please select an image file."
  ),
  password: z.string(),
  confirmPassword: z.string(),
}).superRefine(({ password, confirmPassword }, context) => {
  if (!password) {
    if (confirmPassword) {
      context.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "Enter a new password first.",
      });
    }
    return;
  }

  if (password.length < 6 || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password)) {
    context.addIssue({
      code: "custom",
      path: ["password"],
      message: "Use at least 6 characters with uppercase, lowercase, and a number.",
    });
  }
  if (password !== confirmPassword) {
    context.addIssue({
      code: "custom",
      path: ["confirmPassword"],
      message: "Passwords do not match.",
    });
  }
});

const ProfileUpdate = () => {
  const { authUser, updateProfile, isUpdatingProfile } = useAuthStore();
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(authUser.image || "");
  const previewUrlRef = useRef(null);
  const { register, control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(ProfileUpdateSchema),
    defaultValues: {
      name: authUser.name,
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    return () => {
      if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
    };
  }, []);

  const onImageChange = (event, onChange) => {
    const file = event.target.files?.[0];
    onChange(file);

    if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
    previewUrlRef.current = file ? URL.createObjectURL(file) : null;
    setImagePreview(previewUrlRef.current || authUser.image || "");
  };

  const onSubmit = async ({ name, password, profileImage }) => {
    const formData = new FormData();
    formData.append("name", name);
    if (password) formData.append("password", password);
    if (profileImage) formData.append("profileImage", profileImage);

    const updated = await updateProfile(formData);
    if (updated) navigate("/profile");
  };

  return (
    <section className="mx-auto w-full max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Update profile</h1>
        <p className="mt-1 text-sm text-base-content/70">Update your profile details or change your password.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <div className="flex size-28 shrink-0 items-center justify-center overflow-hidden rounded-full border-4 border-primary/70 bg-primary/10">
            {imagePreview ? (
              <img src={imagePreview} alt="Profile image preview" className="h-full w-full object-cover" />
            ) : (
              <span className="text-5xl font-bold">{authUser.name?.charAt(0).toUpperCase()}</span>
            )}
          </div>
          <div className="form-control w-full">
            <label htmlFor="profile-image" className="label font-medium">Profile image</label>
            <Controller
              name="profileImage"
              control={control}
              render={({ field: { onChange, ref, name } }) => (
                <input
                  id="profile-image"
                  name={name}
                  ref={ref}
                  type="file"
                  accept="image/*"
                  className={`file-input file-input-bordered w-full ${errors.profileImage ? "file-input-error" : ""}`}
                  onChange={(event) => onImageChange(event, onChange)}
                />
              )}
            />
            <p className="mt-1 text-xs text-base-content/60">Choose an image to preview it before saving.</p>
            {errors.profileImage && <p className="mt-1 text-sm text-error">{errors.profileImage.message}</p>}
          </div>
        </div>

        <div className="form-control">
          <label htmlFor="profile-name" className="label font-medium">Name</label>
          <div className="relative">
            <UserRound className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-base-content/50" />
            <input
              id="profile-name"
              {...register("name")}
              className={`input input-bordered w-full pl-10 ${errors.name ? "input-error" : ""}`}
              placeholder="Your name"
            />
          </div>
          {errors.name && <p className="mt-1 text-sm text-error">{errors.name.message}</p>}
        </div>

        <div className="border-t border-base-300 pt-4">
          <h2 className="font-semibold">Change password <span className="font-normal text-base-content/60">(optional)</span></h2>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            <div className="form-control">
              <label htmlFor="profile-password" className="label font-medium">New password</label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-base-content/50" />
                <input
                  id="profile-password"
                  type="password"
                  {...register("password")}
                  className={`input input-bordered w-full pl-10 ${errors.password ? "input-error" : ""}`}
                  placeholder="Leave blank to keep current"
                  autoComplete="new-password"
                />
              </div>
              {errors.password && <p className="mt-1 text-sm text-error">{errors.password.message}</p>}
            </div>
            <div className="form-control">
              <label htmlFor="profile-confirm-password" className="label font-medium">Confirm password</label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-base-content/50" />
                <input
                  id="profile-confirm-password"
                  type="password"
                  {...register("confirmPassword")}
                  className={`input input-bordered w-full pl-10 ${errors.confirmPassword ? "input-error" : ""}`}
                  placeholder="Confirm new password"
                  autoComplete="new-password"
                />
              </div>
              {errors.confirmPassword && <p className="mt-1 text-sm text-error">{errors.confirmPassword.message}</p>}
            </div>
          </div>
        </div>

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Link to="/profile" className="btn btn-ghost">Cancel</Link>
          <button type="submit" className="btn btn-primary" disabled={isUpdatingProfile}>
            {isUpdatingProfile ? (
              <>
                <Loader2 className="size-5 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <ImagePlus className="size-5" />
                Save changes
              </>
            )}
          </button>
        </div>
      </form>
    </section>
  );
};

export default ProfileUpdate;
