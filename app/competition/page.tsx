"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export default function UploadPage() {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [instagramUsername, setInstagramUsername] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Please upload an image file");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError("Image must be less than 5MB");
        return;
      }
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name || !phoneNumber || !instagramUsername || !image) {
      setError("Please fill in all fields and upload an image");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("phoneNumber", phoneNumber);
      formData.append("instagramUsername", instagramUsername);
      formData.append("image", image);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit");
      }

      setSubmitSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-[#FDF6F0] flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-xl border-2 border-[#E8C4B8]">
          <div className="text-6xl mb-4">💐</div>
          <h2 className="text-2xl font-bold text-[#4A3728] mb-4">
            Bouquet Submitted!
          </h2>
          <p className="text-[#8B6F5C] mb-6">
            Your beautiful bouquet has been added to the album. Share it with
            friends and ask them to like it!
          </p>
          <div className="flex flex-col gap-3">
            <Link
              href="/album"
              className="bg-[#8B3A3A] text-white px-6 py-3 rounded-full font-medium hover:bg-[#7A3333] transition-colors"
            >
              View Bouquet Album
            </Link>
            <button
              onClick={() => {
                setSubmitSuccess(false);
                setName("");
                setPhoneNumber("");
                setInstagramUsername("");
                setImage(null);
                setImagePreview(null);
              }}
              className="text-[#8B6F5C] hover:text-[#4A3728] transition-colors"
            >
              Submit Another Bouquet
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDF6F0] py-8 px-4">
      {/* Header */}
      <div className="max-w-2xl mx-auto mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[#8B6F5C] hover:text-[#4A3728] transition-colors mb-4"
        >
          <span>←</span> Back to Home
        </Link>
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#4A3728] mb-2">
            🌸 Submit Your Bouquet 🌸
          </h1>
          <p className="text-[#8B6F5C]">
            Share your beautiful creation and win GoPay prizes!
          </p>
        </div>
      </div>

      {/* Prize Info Banner */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="bg-gradient-to-r from-[#8B3A3A] to-[#A84444] text-white rounded-2xl p-6 text-center">
          <h3 className="text-xl font-bold mb-2">Competition Prize</h3>
          <p className="text-white/90">
            The bouquet with the <span className="font-bold">most likes</span>{" "}
            wins <span className="font-bold">GoPay rewards!</span>
          </p>
          <p className="text-sm text-white/70 mt-2">
            Share your submission and ask friends to like it in the Bouquet
            Album
          </p>
        </div>
      </div>

      {/* Upload Form */}
      <div className="max-w-2xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-[#E8C4B8]"
        >
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-6">
              {error}
            </div>
          )}

          {/* Image Upload */}
          <div className="mb-6">
            <label className="block text-[#4A3728] font-semibold mb-2">
              Bouquet Screenshot <span className="text-red-500">*</span>
            </label>
            <p className="text-sm text-[#8B6F5C] mb-3">
              Take a screenshot of your bouquet from the game
            </p>

            <div
              onClick={() => fileInputRef.current?.click()}
              className={`
                border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all
                ${
                  imagePreview
                    ? "border-[#8B3A3A] bg-[#FDF6F0]"
                    : "border-[#E8C4B8] hover:border-[#8B6F5C] hover:bg-[#FDF6F0]"
                }
              `}
            >
              {imagePreview ? (
                <div className="relative">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    width={400}
                    height={300}
                    className="rounded-xl mx-auto max-h-64 w-auto object-contain"
                  />
                  <p className="text-sm text-[#8B6F5C] mt-3">
                    Click to change image
                  </p>
                </div>
              ) : (
                <div>
                  <div className="text-4xl mb-2">📷</div>
                  <p className="text-[#8B6F5C]">
                    Click to upload your bouquet screenshot
                  </p>
                  <p className="text-sm text-[#8B6F5C]/70 mt-1">
                    PNG, JPG up to 5MB
                  </p>
                </div>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>

          {/* Name */}
          <div className="mb-6">
            <label className="block text-[#4A3728] font-semibold mb-2">
              Your Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-3 border-2 border-[#E8C4B8] rounded-xl focus:border-[#8B3A3A] focus:outline-none transition-colors bg-white text-[#4A3728]"
            />
          </div>

          {/* Phone Number */}
          <div className="mb-6">
            <label className="block text-[#4A3728] font-semibold mb-2">
              Phone Number (GoPay) <span className="text-red-500">*</span>
            </label>
            <p className="text-sm text-[#8B6F5C] mb-2">
              ⚠️ Must be registered with{" "}
              <span className="font-semibold text-[#00AA13]">GoPay</span> for
              prize transfer
            </p>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="08xxxxxxxxxx"
              className="w-full px-4 py-3 border-2 border-[#E8C4B8] rounded-xl focus:border-[#8B3A3A] focus:outline-none transition-colors bg-white text-[#4A3728]"
            />
          </div>

          {/* Instagram */}
          <div className="mb-8">
            <label className="block text-[#4A3728] font-semibold mb-2">
              Instagram Username <span className="text-red-500">*</span>
            </label>
            <p className="text-sm text-[#8B6F5C] mb-2">
              📱 We&apos;ll contact you via Instagram DM if you win!
            </p>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8B6F5C]">
                @
              </span>
              <input
                type="text"
                value={instagramUsername}
                onChange={(e) =>
                  setInstagramUsername(e.target.value.replace("@", ""))
                }
                placeholder="yourusername"
                className="w-full pl-8 pr-4 py-3 border-2 border-[#E8C4B8] rounded-xl focus:border-[#8B3A3A] focus:outline-none transition-colors bg-white text-[#4A3728]"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`
              w-full py-4 rounded-full font-bold text-lg transition-all
              ${
                isSubmitting
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-[#8B3A3A] text-white hover:bg-[#7A3333] shadow-lg hover:shadow-xl"
              }
            `}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin">🌸</span> Submitting...
              </span>
            ) : (
              "Submit My Bouquet"
            )}
          </button>

          <p className="text-center text-sm text-[#8B6F5C] mt-4">
            By submitting, you agree that your bouquet may be displayed publicly
            in the album
          </p>
        </form>
      </div>

      {/* Link to Album */}
      <div className="max-w-2xl mx-auto mt-8 text-center">
        <Link
          href="/album"
          className="inline-flex items-center gap-2 text-[#8B3A3A] hover:text-[#7A3333] font-medium transition-colors"
        >
          View Bouquet Album →
        </Link>
      </div>
    </div>
  );
}
