import Link from "next/link";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";
//NB ALWAYS FROM HERE AND NOT VERCEL
import { db } from "~/server/db";
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const images = await db.query.images.findMany({
    orderBy: (model, { desc }) => desc(model.id),
  });
  return (
    <main className="">
      <div className="flex flex-wrap">
        {[...images, ...images, ...images].map((image, index) => (
          <div key={image.id + "-" + index} className="flex w-48 flex-col">
            <img src={image.url} alt={"image"} />
            <div>{image.name}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
