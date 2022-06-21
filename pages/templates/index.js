import React from "react";
import Head from "next/head";
import Link from "next/link";

export default function Templates() {
  return (
    <>
      <Head>
        <title>Templates | Formified</title>
      </Head>
      <header className="flex flex-col justify-evenly items-center px-5 py-3 bg-slate-800 text-white min-h-fit mt-56 m-auto gap-y-4 w-2/3 rounded-lg">
        <h1 className="text-3xl font-bold">So curious! 👀</h1>
        <h2 className="text-xl font-semibold">
          It's great to see your would like to explore pre-built forms. <br />
          Sadly, I'm not done yet but it's worth to keep an eye on this page!
          <br />
          Thank you, and see you later!
        </h2>
        <Link href="/">
          <a className="hover:underline text-slate-200 uppercase">
            ⬅Back to home
          </a>
        </Link>
      </header>
    </>
  );
}
