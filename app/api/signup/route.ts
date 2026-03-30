import { NextResponse } from "next/server";
import { Client } from "pg";

// ✅ DB CONNECTION FUNCTION (reuse)
const getClient = async () => {
  const client = new Client({
    user: "postgres",
    host: "localhost",
    database: "postgres",
    password: "1234",
    port: 5432,
  });

  await client.connect();
  return client;
};


// ✅ 1. CREATE USER (SIGNUP)
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const client = await getClient();

    const query = `
      INSERT INTO "user"(firstname, lastname, country, email, password)
      VALUES($1, $2, $3, $4, $5)
    `;

    const values = [
      body.firstName,
      body.lastName,
      body.country,
      body.email,
      body.password,
    ];

    await client.query(query, values);

    await client.end();

    return NextResponse.json({ message: "Signup successful ✅" });

  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Signup error ❌" });
  }
}


// ✅ 2. GET ALL USERS
export async function GET() {
  try {
    const client = await getClient();

    const result = await client.query(`SELECT * FROM "user"`);

    await client.end();

    return NextResponse.json(result.rows);

  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Fetch error ❌" });
  }
}


// ✅ 3. DELETE USER
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    const client = await getClient();

    await client.query(`DELETE FROM "user" WHERE id=$1`, [id]);

    await client.end();

    return NextResponse.json({ message: "Deleted ✅" });

  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Delete error ❌" });
  }
}