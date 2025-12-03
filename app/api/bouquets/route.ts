import { NextRequest, NextResponse } from "next/server";
import { getAllBouquets, getVisitorLikes } from "@/lib/d1";
import { v4 as uuidv4 } from "uuid";

export async function GET(request: NextRequest) {
  try {
    // Get or create visitor ID from cookie
    let visitorId = request.cookies.get("visitor_id")?.value;
    let shouldSetCookie = false;

    if (!visitorId) {
      visitorId = uuidv4();
      shouldSetCookie = true;
    }

    const bouquets = await getAllBouquets();
    const likedBouquets = await getVisitorLikes(visitorId);

    // Add isLiked flag to each bouquet
    const bouquetsWithLikes = bouquets.map((bouquet) => ({
      ...bouquet,
      isLiked: likedBouquets.includes(bouquet.id),
    }));

    const response = NextResponse.json({ bouquets: bouquetsWithLikes });

    // Set the visitor_id cookie if it was newly created
    if (shouldSetCookie) {
      response.cookies.set("visitor_id", visitorId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 365, // 1 year
      });
    }

    return response;
  } catch (error) {
    console.error("Error fetching bouquets:", error);
    return NextResponse.json(
      { error: "Failed to fetch bouquets" },
      { status: 500 }
    );
  }
}
