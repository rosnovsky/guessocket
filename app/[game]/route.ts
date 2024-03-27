import { NextRequest } from 'next/server';

export const PUT = async (req: NextRequest) => {
  const connectionId = req.nextUrl.pathname.split('/').pop();
  console.log("connectionId", connectionId)

  const headers = req.headers;
  console.log(headers.get("Authorization"))

  return new Response("OK", { status: 200 });
}
