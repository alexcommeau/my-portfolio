import { serializeJsonLd } from "@/lib/site";

// Injecte des données structurées JSON-LD en échappant `<` (voir serializeJsonLd).
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
