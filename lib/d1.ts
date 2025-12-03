// Cloudflare D1 API helper

const D1_API_URL = `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/d1/database/${process.env.CLOUDFLARE_D1_DATABASE_ID}/query`;

interface D1Response<T> {
  success: boolean;
  result: Array<{
    results: T[];
    success: boolean;
    meta: {
      changed_db: boolean;
      changes: number;
      duration: number;
      last_row_id: number;
      rows_read: number;
      rows_written: number;
    };
  }>;
  errors: Array<{ code: number; message: string }>;
}

export async function queryD1<T>(
  sql: string,
  params: unknown[] = []
): Promise<T[]> {
  const response = await fetch(D1_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.CLOUDFLARE_D1_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sql,
      params,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`D1 query failed: ${error}`);
  }

  const data: D1Response<T> = await response.json();

  if (!data.success) {
    throw new Error(
      `D1 query failed: ${data.errors.map((e) => e.message).join(", ")}`
    );
  }

  return data.result[0]?.results || [];
}

export async function executeD1(
  sql: string,
  params: unknown[] = []
): Promise<{ lastRowId: number; changes: number }> {
  const response = await fetch(D1_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.CLOUDFLARE_D1_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sql,
      params,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`D1 execute failed: ${error}`);
  }

  const data: D1Response<unknown> = await response.json();

  if (!data.success) {
    throw new Error(
      `D1 execute failed: ${data.errors.map((e) => e.message).join(", ")}`
    );
  }

  return {
    lastRowId: data.result[0]?.meta.last_row_id || 0,
    changes: data.result[0]?.meta.changes || 0,
  };
}

// Bouquet types
export interface Bouquet {
  id: number;
  name: string;
  phone_number: string;
  instagram_username: string;
  image_url: string;
  likes_count: number;
  created_at: string;
}

// Get all bouquets sorted by likes
export async function getAllBouquets(): Promise<Bouquet[]> {
  return queryD1<Bouquet>(
    "SELECT * FROM bouquets ORDER BY likes_count DESC, created_at DESC"
  );
}

// Create a new bouquet submission
export async function createBouquet(
  name: string,
  phoneNumber: string,
  instagramUsername: string,
  imageUrl: string
): Promise<number> {
  const result = await executeD1(
    "INSERT INTO bouquets (name, phone_number, instagram_username, image_url) VALUES (?, ?, ?, ?)",
    [name, phoneNumber, instagramUsername, imageUrl]
  );
  return result.lastRowId;
}

// Like a bouquet
export async function likeBouquet(
  bouquetId: number,
  visitorId: string
): Promise<boolean> {
  try {
    // Try to insert the like (will fail if duplicate due to UNIQUE constraint)
    await executeD1(
      "INSERT INTO likes (bouquet_id, visitor_id) VALUES (?, ?)",
      [bouquetId, visitorId]
    );

    // Update the likes count
    await executeD1(
      "UPDATE bouquets SET likes_count = likes_count + 1 WHERE id = ?",
      [bouquetId]
    );

    return true;
  } catch {
    // Like already exists
    return false;
  }
}

// Unlike a bouquet
export async function unlikeBouquet(
  bouquetId: number,
  visitorId: string
): Promise<boolean> {
  try {
    const result = await executeD1(
      "DELETE FROM likes WHERE bouquet_id = ? AND visitor_id = ?",
      [bouquetId, visitorId]
    );

    if (result.changes > 0) {
      await executeD1(
        "UPDATE bouquets SET likes_count = likes_count - 1 WHERE id = ? AND likes_count > 0",
        [bouquetId]
      );
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

// Check if visitor has liked a bouquet
export async function hasLiked(
  bouquetId: number,
  visitorId: string
): Promise<boolean> {
  const result = await queryD1<{ count: number }>(
    "SELECT COUNT(*) as count FROM likes WHERE bouquet_id = ? AND visitor_id = ?",
    [bouquetId, visitorId]
  );
  return result[0]?.count > 0;
}

// Get all likes for a visitor
export async function getVisitorLikes(visitorId: string): Promise<number[]> {
  const result = await queryD1<{ bouquet_id: number }>(
    "SELECT bouquet_id FROM likes WHERE visitor_id = ?",
    [visitorId]
  );
  return result.map((r) => r.bouquet_id);
}
