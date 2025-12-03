-- Cloudflare D1 Schema for Dear Bouquet Competition
-- Run this in your Cloudflare D1 dashboard

-- Table for bouquet submissions
CREATE TABLE IF NOT EXISTS bouquets (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  instagram_username TEXT NOT NULL,
  image_url TEXT NOT NULL,
  likes_count INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Table for tracking likes (prevent duplicate likes)
CREATE TABLE IF NOT EXISTS likes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  bouquet_id INTEGER NOT NULL,
  visitor_id TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (bouquet_id) REFERENCES bouquets(id),
  UNIQUE(bouquet_id, visitor_id)
);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_bouquets_likes ON bouquets(likes_count DESC);
CREATE INDEX IF NOT EXISTS idx_likes_bouquet ON likes(bouquet_id);
CREATE INDEX IF NOT EXISTS idx_likes_visitor ON likes(visitor_id);
