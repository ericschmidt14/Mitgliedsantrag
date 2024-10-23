import { FCN_WEB_API } from "@/app/constants";

export async function GET(
  request: Request,
  { params }: { params: { token: string } }
) {
  const res = await fetch(`${FCN_WEB_API}/Member/Confirm/${params.token}`, {
    method: "GET",
    headers: {
      Accept: "*/*",
    },
  });
  const ok = res.status;
  return Response.json(ok);
}
