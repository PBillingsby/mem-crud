import axios from "axios";


export async function GET({ request }: { request: Request }) {
  const result = (
    await axios.get(
      "https://api.mem.tech/api/state/VWPW_NwscxexXJ3IcV97O8bIchZ97vEJ1hsOfycBZWw", {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:5173'
      }
    }
    )
  )?.data;

  return new Response(JSON.stringify({
    data: result.posts
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

export async function POST({ request }: { request: Request }) {
  const data = await request.json();

  const result = (
    await axios.post(
      "https://api.mem.tech/api/transactions",
      {
        functionId: data.functionId,
        inputs: [data]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    )
  )?.data;

  return new Response(JSON.stringify({
    response: result
  }), {
    status: 200
  });
}

export async function PUT({ request }: { request: Request }) {
  const data = await request.json();

  const result = (
    await axios.post(
      "https://api.mem.tech/api/transactions",
      {
        functionId: data.functionId,
        inputs: [data]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    )
  )?.data;

  return new Response(JSON.stringify({
    response: result
  }), {
    status: 200
  });
}

export async function DELETE({ request }: { request: Request }) {
  const data = await request.json();
  const result = (
    await axios.post(
      "https://api.mem.tech/api/transactions",
      {
        data: {
          functionId: "VWPW_NwscxexXJ3IcV97O8bIchZ97vEJ1hsOfycBZWw",
          inputs: [data]
        }
      }
    )
  ).data;

  return new Response(JSON.stringify({
    result: result
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    }
  });
}