import Link from "next/link";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";
//NB ALWAYS FROM HERE AND NOT VERCEL
import { db } from "~/server/db";
export const dynamic = "force-dynamic";

const mockUrls = [
  "https://utfs.io/f/25c0c126-4ee1-4287-a370-d27360fde6aa-ibcluw.jpg",
  "https://utfs.io/f/e4968c89-3387-40c4-9a44-c4bc3ef69bdb-ibclwm.jpg",
  "https://utfs.io/f/573980cd-6de4-4ab6-9e1e-d4b0c1058040-nm33wo.png",
  "https://utfs.io/f/9a0896fc-4180-4de5-9cd8-c7aacda3e476-ibclvr.jpg",
];

const mockImages = mockUrls.map((url, index) => ({
  id: index + 1,
  url,
}));
export default async function HomePage() {
  const posts = await db.query.posts.findMany()
  return (
    <main className="">
      <div className="flex flex-wrap">
      {posts.map((post) => (
          <div key={post.id} className="w-48 p-4">
            <div>{post.name}</div>
          </div>
        ))}
        {[...mockImages,...mockImages,...mockImages].map((image,index) => (
          <div key={image.id + "-" + index} className="w-48 p-4">
            <img src={image.url} alt={"image"}/>
          </div>
        ))}
      </div>
    </main>
  );
}
