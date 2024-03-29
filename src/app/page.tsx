import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";

import { CreatePost } from "~/app/_components/create-post";
import { api } from "~/trpc/server";

export default async function Home() {
  noStore();
  // const hello = await api.post.hello.query({ text: "from tRPC" });
  // console.log(hello.greeting);
  const allBlogs = await api.post.getAllBlogs.query();
  console.log(allBlogs);

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#2e026d] to-[#15162c] py-12 text-white">
      <div className="container mx-auto px-4">
        <h1 className="text-center text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          <span className="text-[hsl(280,100%,70%)]">T3</span> App Blog
        </h1>
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {allBlogs.map((blog) => (
            <Link key={blog.id} href={`/blog/${blog.id}`}>
              <div className="rounded-xl bg-white/15 p-6 hover:bg-white/20">
                <h3 className="mb-4 text-2xl font-bold">id：{blog.id}</h3>
                <div className="mb-4 text-lg">{blog.name}</div>
                <span className="text-base text-gray-400">
                  {blog.createdAt.toLocaleDateString()}
                </span>
              </div>
            </Link>
          ))}
        </div>
        <div className="flex flex-col items-center gap-2">
          {/* <p className="text-2xl text-white">
            {hello ? hello.greeting : "Loading tRPC query..."}
          </p> */}
        </div>
        <div className="mt-8 flex justify-center">
          {/* <CrudShowcase /> */}
          <Link
            href="/postBlog"
            className="rounded-md bg-orange-500 px-6 py-3 font-medium text-white transition-colors duration-300 ease-in-out hover:bg-orange-600"
          >
            投稿する
          </Link>
        </div>
      </div>
    </main>
  );
}

async function CrudShowcase() {
  const latestPost = await api.post.getLatest.query();

  return (
    <div className="w-full max-w-xs">
      {latestPost ? (
        <p className="truncate">Your most recent post: {latestPost.name}</p>
      ) : (
        <p>You have no posts yet.</p>
      )}

      <CreatePost />
    </div>
  );
}
