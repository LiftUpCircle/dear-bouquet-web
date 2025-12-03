import { NextRequest, NextResponse } from "next/server";
import { createBouquet } from "@/lib/d1";
import { uploadToR2, generateFileName } from "@/lib/r2";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const name = formData.get("name") as string;
    const phoneNumber = formData.get("phoneNumber") as string;
    const instagramUsername = formData.get("instagramUsername") as string;
    const image = formData.get("image") as File;

    // Validate required fields
    if (!name || !phoneNumber || !instagramUsername || !image) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate phone number format (Indonesian)
    const phoneRegex = /^(\+62|62|0)[0-9]{9,13}$/;
    if (!phoneRegex.test(phoneNumber.replace(/[\s-]/g, ""))) {
      return NextResponse.json(
        { error: "Please enter a valid Indonesian phone number" },
        { status: 400 }
      );
    }

    // Validate image type
    if (!image.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Please upload an image file" },
        { status: 400 }
      );
    }

    // Validate image size (max 5MB)
    if (image.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Image must be less than 5MB" },
        { status: 400 }
      );
    }

    // Upload image to R2
    const fileName = generateFileName(image.name);
    const buffer = Buffer.from(await image.arrayBuffer());
    const imageUrl = await uploadToR2(buffer, fileName, image.type);

    // Save to D1 database
    const bouquetId = await createBouquet(
      name,
      phoneNumber,
      instagramUsername.replace("@", ""), // Remove @ if present
      imageUrl
    );

    return NextResponse.json({
      success: true,
      bouquetId,
      message: "Bouquet submitted successfully!",
    });
  } catch (error) {
    console.error("Error uploading bouquet:", error);
    return NextResponse.json(
      { error: "Failed to submit bouquet. Please try again." },
      { status: 500 }
    );
  }
}
