// Image URL helper — returns a real photographic image URL for any keyword.
// Uses LoremFlickr (no API key, real photos). Falls back to picsum.photos on error.

export function imageFor(keyword: string, size = 400): string {
  const slug = (keyword || "product")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || "product";
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  return `https://loremflickr.com/${size}/${size}/${encodeURIComponent(slug)}?lock=${h % 100000}`;
}

export function fallbackImage(seed: string, size = 400): string {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return `https://picsum.photos/seed/${h % 100000}/${size}/${size}`;
}
