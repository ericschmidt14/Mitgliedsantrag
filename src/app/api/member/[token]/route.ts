import { FCN_WEB_API } from "@/app/lib/constants";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;

  const res = await fetch(`${FCN_WEB_API}/Member/${token}`, {
    method: "GET",
    headers: {
      Accept: "*/*",
    },
  });
  const data = await res.json();
  return Response.json(data);
}
