export async function POST(request: Request) {
  const res = await fetch("/Member/Save", {
    method: "POST",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(await request.json()),
  });
  const txt = await res.text();
  return Response.json(txt);
}
