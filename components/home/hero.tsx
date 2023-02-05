import Link from "next/link";
import { Github, Twitter } from "@/components/shared/icons";

const Hero = () => {
  return (
    <div className="mx-auto mt-20 mb-10 max-w-md px-2.5 text-center sm:max-w-lg sm:px-0">
      {/*
      <a
        href="https://acme.st/launch"
        target="_blank"
        rel="noreferrer"
        className="mx-auto flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full bg-blue-100 px-7 py-2 transition-all hover:bg-blue-200"
      >
        <Twitter className="h-5 w-5 text-[#1d9bf0]" />
        <p className="text-sm font-semibold text-[#1d9bf0]">
          Introducing acme.st
        </p>
      </a>
      */}

      <h1 className="mt-5 font-display text-5xl font-extrabold leading-tight text-black sm:text-6xl sm:leading-tight">
      Acme ShorTener
        <br />
        <span className="bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 bg-clip-text text-transparent">
        Acme.ST
        </span>
      </h1>
      <p className="mt-5 text-xl text-gray-600 sm:text-2xl">
      It's simple to use and absolutely free!, you can shorten your links in seconds, and share them with ease!
      </p>

      <div className="mx-auto mt-10 flex max-w-fit space-x-4">
        <Link href="https://app.acme.st/register">
          <a className="rounded-full border border-black bg-black py-2 px-5 text-sm text-white shadow-lg transition-all hover:bg-white hover:text-black">
            Start For Free
          </a>
        </Link>
        {/*
        <a
          className="flex items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white py-2 px-5 shadow-lg transition-all hover:border-gray-800"
          href="https://acme.st/biblic"
          target="_blank"
          rel="noreferrer"
        >
          <Github className="h-5 w-5 text-black" />
          <p className="text-sm">Star on GitHub</p>
        </a>
        */}
      </div>
    </div>
  );
};

export default Hero;
