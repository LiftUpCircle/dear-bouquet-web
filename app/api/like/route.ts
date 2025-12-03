import { NextRequest, NextResponse } from "next/server";
import { likeBouquet, unlikeBouquet } from "@/lib/d1";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: NextRequest) {
  try {
    const { bouquetId, action } = await request.json();

    if (!bouquetId || !action) {
      return NextResponse.json(
        { error: "Bouquet ID and action are required" },
        { status: 400 }
      );
    }

    // Get or create visitor ID from cookie
    let visitorId = request.cookies.get("visitor_id")?.value;
    const response = NextResponse.json({ success: true });

    if (!visitorId) {
      visitorId = uuidv4();
      response.cookies.set("visitor_id", visitorId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 365, // 1 year
      });
    }

    let success = false;

    if (action === "like") {
      success = await likeBouquet(bouquetId, visitorId);
    } else if (action === "unlike") {
      success = await unlikeBouquet(bouquetId, visitorId);
    } else {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    return NextResponse.json({ success, action });
  } catch (error) {
    console.error("Error processing like:", error);
    return NextResponse.json(
      { error: "Failed to process like" },
      { status: 500 }
    );
  }
}
