import React from 'react';

const AboutUs = () => {
  return (
    <div className="mt-8 mb-16 ">
      <h1 className="text-4xl md:5xl text-yellow-500 text-center uppercase font-bold font-serif">
        how about us
      </h1>
      <div className="w-52 h-2 bg-gradient-to-br from-indigo-800 mb-8 to-yellow-800 text-center mx-auto mt-2 rounded-full"></div>
      <div className="block md:flex  md:justify-between  md:gap-16 lg:gap-20">
        {/* left section */}
        <div className="flex-1 w-full mb-10 max-h-[390px]">
          <img
            src="/assets//about-bg.jpg"
            className="md:w-[80%] w-full mx-auto rounded-3xl h-[390px] object-cover object-center"
            alt="about-image"
          />
        </div>
        {/* right section */}
        <div className="flex-1  mx-auto md:mx-0 max-w-md">
          <div className="block mb-5">
            <h1 className="text-transparent text-2xl uppercase font-semibold bg-clip-text bg-gradient-to-r from-indigo-700 via-green-500 to-yellow-600">
              all about food-store
            </h1>
            <p className=" text-gray-700 ">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Praesentium, consectetur?
            </p>
          </div>
          <div className="space-y-3">
            <p className="text-gray-700">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
              mollitia quod aut laudantium sit! Laudantium, quis, ex voluptas
              repellendus quasi nesciunt amet accusamus omnis illum, iure
              aliquid distinctio porro voluptatibus.
            </p>
            <p className="text-gray-700">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
              mollitia quod aut laudantium sit! Laudantium, quis, ex voluptas
              repellendus quasi nesciunt amet accusamus omnis illum, iure
              aliquid distinctio porro voluptatibus.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
