import { useState } from "react";
import { imageFor, fallbackImage } from "@/lib/img";

interface Props {
  keyword: string;
  seed?: string;
  size?: number;
  className?: string;
  alt?: string;
}

export function ProductImage({ keyword, seed, size = 400, className, alt }: Props) {
  const [errored, setErrored] = useState(false);
  const src = errored ? fallbackImage(seed || keyword, size) : imageFor(keyword, size);
  return (
    <img
      src={src}
      alt={alt || keyword}
      loading="lazy"
      onError={() => setErrored(true)}
      className={className}
      draggable={false}
    />
  );
}
