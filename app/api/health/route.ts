import { connection } from "next/server";

// GET /api/health
// The deploy script calls this after every restart. If it answers
// {"status":"ok"}, the new version is running and the deploy is kept.
export async function GET() {
  // Wait for a real request, so this is checked live and never cached.
  await connection();

  // The app now needs an API key. Without it, report a problem.
  if (!process.env.API_KEY) {
    return Response.json({ status: "error", problem: "API_KEY is not set" }, { status: 503 });
  }

  return Response.json({ status: "ok", time: new Date().toISOString() });
}