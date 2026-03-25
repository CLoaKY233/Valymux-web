import "server-only";
import { Surreal } from "surrealdb";

export async function getDb(): Promise<Surreal> {
  const db = new Surreal();
  await db.connect(process.env.SURREAL_URL!);
  await db.signin({
    namespace: process.env.SURREAL_NS!,
    database: process.env.SURREAL_DB!,
    username: process.env.SURREAL_USER!,
    password: process.env.SURREAL_PASS!,
  });
  return db;
}
