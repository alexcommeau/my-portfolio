import Image from "next/image";
import type { BlogPost } from "@/lib/data";

type BlogCoverProps = {
  post: BlogPost;
  preload?: boolean;
};

// Couvertures pré-générées en 1200×630 servies telles quelles (`unoptimized`),
// donc pas de `srcSet` ni de prop `sizes` : elles n'auraient aucun effet.
export function BlogCover({ post, preload = false }: BlogCoverProps) {
  return (
    <Image
      src={post.image.src}
      alt={post.image.alt}
      width={1200}
      height={630}
      preload={preload}
      unoptimized
      className="h-full w-full bg-[#09090b] object-contain"
    />
  );
}
