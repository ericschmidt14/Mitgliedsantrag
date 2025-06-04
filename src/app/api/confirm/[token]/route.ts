import { FCN_WEB_API } from "@/app/lib/constants";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;

  const res = await fetch(`${FCN_WEB_API}/Member/Confirm/${token}`, {
    method: "GET",
    headers: {
      Accept: "*/*",
    },
  });
  const ok = res.status;
  return Response.json(ok);
}
