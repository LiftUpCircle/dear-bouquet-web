"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface Bouquet {
  id: number;
  name: string;
  instagram_username: string;
  image_url: string;
  likes_count: number;
  created_at: string;
  isLiked: boolean;
}

export default function AlbumPage() {
  const [bouquets, setBouquets] = useState<Bouquet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [likingId, setLikingId] = useState<number | null>(null);

  useEffect(() => {
    fetchBouquets();
  }, []);

  const fetchBouquets = async () => {
    try {
      const response = await fetch("/api/bouquets");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch bouquets");
      }

      setBouquets(data.bouquets);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLike = async (bouquetId: number, isCurrentlyLiked: boolean) => {
    setLikingId(bouquetId);

    try {
      const response = await fetch("/api/like", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bouquetId,
          action: isCurrentlyLiked ? "unlike" : "like",
        }),
      });

      if (response.ok) {
        // Update local state
        setBouquets((prev) =>
          prev.map((b) =>
            b.id === bouquetId
              ? {
                  ...b,
                  isLiked: !isCurrentlyLiked,
                  likes_count: isCurrentlyLiked
                    ? b.likes_count - 1
                    : b.likes_count + 1,
                }
              : b
          )
        );
      }
    } catch (err) {
      console.error("Failed to like:", err);
    } finally {
      setLikingId(null);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-[#FDF6F0] py-8 px-4">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[#8B6F5C] hover:text-[#4A3728] transition-colors mb-4"
        >
          <span>←</span> Back to Home
        </Link>
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#4A3728] mb-2">
            🌷 Bouquet Album 🌷
          </h1>
          <p className="text-[#8B6F5C] max-w-xl mx-auto">
            Vote for your favorite bouquet! The one with the most likes wins the
            GoPay prize
          </p>
        </div>
      </div>

      {/* CTA to submit */}
      <div className="max-w-6xl mx-auto mb-8 text-center">
        <Link
          href="/competition"
          className="inline-flex items-center gap-2 bg-[#8B3A3A] text-white px-6 py-3 rounded-full font-medium hover:bg-[#7A3333] transition-colors shadow-lg"
        >
          <span>📷</span> Submit Your Bouquet
        </Link>
      </div>

      {/* Leaderboard Info */}
      {bouquets.length > 0 && (
        <div className="max-w-6xl mx-auto mb-8">
          <div className="bg-gradient-to-r from-[#FFD700]/20 via-[#FDF6F0] to-[#FFD700]/20 border-2 border-[#FFD700]/50 rounded-2xl p-4 text-center">
            <p className="text-[#4A3728] font-semibold">
              🥇 Current Leader:{" "}
              <span className="text-[#8B3A3A]">{bouquets[0]?.name}</span> with{" "}
              <span className="text-[#8B3A3A]">
                {bouquets[0]?.likes_count} likes
              </span>
            </p>
          </div>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-20">
          <div className="text-4xl animate-bounce mb-4">🌸</div>
          <p className="text-[#8B6F5C]">Loading beautiful bouquets...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="max-w-md mx-auto text-center py-20">
          <div className="text-4xl mb-4">😢</div>
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={fetchBouquets}
            className="text-[#8B3A3A] hover:text-[#7A3333] font-medium"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && bouquets.length === 0 && (
        <div className="max-w-md mx-auto text-center py-20">
          <div className="text-6xl mb-4">💐</div>
          <h3 className="text-xl font-semibold text-[#4A3728] mb-2">
            No bouquets yet!
          </h3>
          <p className="text-[#8B6F5C] mb-6">
            Be the first to submit your beautiful creation
          </p>
          <Link
            href="/competition"
            className="inline-flex items-center gap-2 bg-[#8B3A3A] text-white px-6 py-3 rounded-full font-medium hover:bg-[#7A3333] transition-colors"
          >
            Submit Your Bouquet
          </Link>
        </div>
      )}

      {/* Bouquet Grid */}
      {!isLoading && !error && bouquets.length > 0 && (
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bouquets.map((bouquet, index) => (
              <div
                key={bouquet.id}
                className={`
                  bg-white rounded-2xl overflow-hidden shadow-lg border-2 transition-all hover:shadow-xl
                  ${
                    index === 0
                      ? "border-[#FFD700] ring-2 ring-[#FFD700]/30"
                      : "border-[#E8C4B8]"
                  }
                `}
              >
                {/* Image */}
                <div className="relative aspect-video bg-[#FDF6F0]">
                  <Image
                    src={bouquet.image_url}
                    alt={`Bouquet by ${bouquet.name}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    unoptimized
                  />
                  {index < 3 && (
                    <div className="absolute top-3 left-3">
                      <span className="text-3xl drop-shadow-lg">
                        {index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"}
                      </span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-[#4A3728] truncate">
                      {bouquet.name}
                    </h3>
                    <span className="text-sm text-[#8B6F5C]">
                      @{bouquet.instagram_username}
                    </span>
                  </div>

                  <p className="text-xs text-[#8B6F5C] mb-3">
                    {formatDate(bouquet.created_at)}
                  </p>

                  {/* Like Button */}
                  <button
                    onClick={() => handleLike(bouquet.id, bouquet.isLiked)}
                    disabled={likingId === bouquet.id}
                    className={`
                      w-full py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2
                      ${
                        bouquet.isLiked
                          ? "bg-[#FFE4E4] text-[#8B3A3A] border-2 border-[#8B3A3A]"
                          : "bg-[#FDF6F0] text-[#8B6F5C] border-2 border-[#E8C4B8] hover:border-[#8B3A3A] hover:text-[#8B3A3A]"
                      }
                      ${
                        likingId === bouquet.id
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }
                    `}
                  >
                    <span
                      className={`text-xl ${
                        bouquet.isLiked ? "animate-pulse" : ""
                      }`}
                    >
                      {bouquet.isLiked ? "❤️" : "🤍"}
                    </span>
                    <span>
                      {bouquet.likes_count}{" "}
                      {bouquet.likes_count === 1 ? "Like" : "Likes"}
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer Info */}
      <div className="max-w-3xl mx-auto mt-12 text-center">
        <div className="bg-white/50 rounded-2xl p-8 border border-[#E8C4B8]">
          <h3 className="text-2xl font-bold text-[#4A3728] mb-4">How to Win</h3>
          <ol className="text-lg text-[#8B6F5C] text-left max-w-lg mx-auto space-y-3">
            <li>1. Play Dear Bouquet at our booth</li>
            <li>2. Screenshot your most beautiful bouquet</li>
            <li>3. Upload it on the competition page</li>
            <li>4. Share with friends and ask them to like it!</li>
            <li>5. The bouquet with most likes wins GoPay prize!</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
