import axios from "axios";


export async function GET({ request }: { request: Request }) {
  const result = (
    await axios.get(
      "https://api.mem.tech/api/state/Cn9Kft63zDpHnPZ-aPPWWKZRGU1vm9fKVjpxCVuasKQ", {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:5173'
      }
    }
    )
  )?.data;

  console.log("--------", result)
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

  console.log("DATA ", {
    functionId: data.functionId,
    inputs: [data]
  })
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
          functionId: "Cn9Kft63zDpHnPZ-aPPWWKZRGU1vm9fKVjpxCVuasKQ",
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