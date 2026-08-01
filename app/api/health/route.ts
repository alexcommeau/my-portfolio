export function GET() {
  return Response.json(
    {
      status: "ok",
      revision: process.env.APP_REVISION?.trim() || "unknown",
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}
