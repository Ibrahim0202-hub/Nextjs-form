import { Pool } from "pg";

export const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "mydb",
  password: "1234",
  port: 5432,
});