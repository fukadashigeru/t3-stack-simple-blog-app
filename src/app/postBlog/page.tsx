"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { api } from "~/trpc/react";

const PostBlog = () => {
  const titleRef = useRef<HTMLInputElement>(null);
  const allBlogs = api.post.getAllBlogs.useQuery();
  const postBlog = api.post.create.useMutation();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (titleRef.current) {
      postBlog.mutate(
        {
          name: titleRef.current.value,
        },
        {
          onSuccess: () => {
            router.push("/");
            router.refresh();
          },
        },
      );
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          <span className="text-[hsl(280,100%,70%)]">T3</span> App Blog
        </h1>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md rounded-lg bg-white p-6 shadow-md"
        >
          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-bold text-gray-800"
              htmlFor="title"
            >
              タイトル
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              id="title"
              type="text"
              placeholder="タイトルを入力"
              ref={titleRef}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="focus:shadow-outline rounded bg-orange-500 px-4 py-2 font-bold text-white hover:bg-orange-700 focus:outline-none"
              type="submit"
            >
              投稿する
            </button>
            <Link
              href="/"
              className="inline-block align-baseline text-sm font-bold text-orange-500 hover:text-orange-800"
            >
              キャンセル
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
};

export default PostBlog;
