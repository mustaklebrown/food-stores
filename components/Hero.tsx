import React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import Image from 'next/image';

const Hero = () => {
  return (
    <div className="relative text-gray-100 h-[350px] sm:h-[400px] md:h-[480px]    my-5  rounded-3xl overflow-hidden ">
      <div className="bg-black/50 w-full absolute left-0 top-0 z-50 h-full">
        <div className="flex space-y-5 flex-col justify-center items-center w-full h-full max-w-md mx-auto">
          <h1 className="leading-8 text-3xl lg:text-4xl tracking-wider font-bold uppercase text-center">
            <span className="text-yellow-500">welcome</span> to your favorite
            food
            <span className="text-yellow-500">store</span>
          </h1>
          <p className="text-lglg:text-xl leading-5 tracking-wider font-semibold text-center text-gray-300">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Est iste
            nisi distinctio totam reprehenderit sapiente
          </p>
          <div className="flex space-x-3 items-center">
            <Link
              href="/about"
              type="button"
              className="inline-block px-4 sm:px-6 py-1 sm:py-2 truncate bg-yellow-500 text-white font-medium text-sm sm:text-md  uppercase rounded shadow-md hover:bg-yellow-700 hover:shadow-lg focus:bg-yellow-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-700 active:shadow-lg transition duration-150 ease-in-out"
            >
              learn more
            </Link>
            <button
              onClick={() => Router.push('#contact')}
              type="button"
              className="inline-block px-4 sm:px-6 py-1 sm:py-2 truncate border-2 border-yellow-500 text-yellow-600 font-medium text-sm sm:text-md  uppercase rounded hover:bg-yellow-700 hover:text-gray-200 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
            >
              contact us
            </button>
          </div>
        </div>
      </div>
      <Image
        src="/assets/burger5.jpg"
        className="w-full h-full object-cover object-center block"
        alt=""
        width={1000}
        height={600}

      />
    </div>
  );
};

export default Hero;
