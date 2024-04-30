import Link from "next/link";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";
//NB ALWAYS FROM HERE AND NOT VERCEL
import { db } from "~/server/db";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { getImages } from "~/server/queries";
export const dynamic = "force-dynamic";

async function Images() {
  const images = await getImages();
  return (
    <div className="flex flex-wrap gap-2">
      {[...images, ...images, ...images].map((image, index) => (
        <div key={image.id + "-" + index} className="flex w-48 flex-col">
          <img src={image.url} alt={"image"} />
          <div>{image.name}</div>
        </div>
      ))}
    </div>
  );
}

export default async function HomePage() {
  return (
    <main className="">
      <div className="flex flex-wrap">
        <SignedOut>
          <div className="h-full w-full text-2xl">Please sign in above</div>
        </SignedOut>
        <SignedIn>
          <Images/>
        </SignedIn>
      </div>
    </main>
  );
}
