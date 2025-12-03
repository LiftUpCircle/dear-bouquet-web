import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// Initialize S3 client for Cloudflare R2
export const r2Client = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY || "",
  },
});

export const BUCKET_NAME =
  process.env.CLOUDFLARE_R2_BUCKET_NAME || "dear-bouquet-uploads";
export const R2_PUBLIC_URL = process.env.CLOUDFLARE_R2_PUBLIC_URL || "";

// Generate a unique filename
export function generateFileName(originalName: string): string {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 15);
  const extension = originalName.split(".").pop();
  return `bouquets/${timestamp}-${randomString}.${extension}`;
}

// Upload file to R2
export async function uploadToR2(
  file: Buffer,
  fileName: string,
  contentType: string
): Promise<string> {
  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: fileName,
    Body: file,
    ContentType: contentType,
  });

  await r2Client.send(command);

  // Return the public URL
  return `${R2_PUBLIC_URL}/${fileName}`;
}

// Generate presigned URL for direct upload (alternative method)
export async function getPresignedUploadUrl(
  fileName: string,
  contentType: string
): Promise<string> {
  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: fileName,
    ContentType: contentType,
  });

  return getSignedUrl(r2Client, command, { expiresIn: 3600 });
}
