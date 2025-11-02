import postgres, { Sql } from "postgres";
import { env } from "../env";

export const sql: Sql = postgres(env.DATABASE_URL);
