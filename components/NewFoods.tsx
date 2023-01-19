import React, { useState, useEffect } from 'react';

import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';

const NewFoods = () => {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    getFoods();
  }, []);

  const getFoods = async () => {
    const res = await axios.get(
      'http://localhost:3000/api/foods'
    );
    if (res.status == 200) {
      setFoods(res.data);
    } else {
      console.log('something went wrong');
    }
  };
  const excerpt = (str) => {
    if (str.length > 50) {
      str = str.substring(0, 75) + '...';
    }
    return str;
  };
  return (
    <div className="w-full my-8">
      <h1 className="text-4xl md:5xl text-yellow-500 text-center uppercase font-bold font-serif">
        New arrived
      </h1>
      <div className="w-52 h-2 bg-gradient-to-br from-indigo-800 to-yellow-800 text-center mx-auto mt-2 rounded-full"></div>
      <div className="grid grid-cols-1 place-items-center md:grid-cols-2 lg:grid-cols-3 container mt-16 gap-8 mb-16">
        {foods &&
          foods.slice(0, 3).map((food) => {
            return (
              <Link
                key={food.id}
                href={`/food/${food.id}`}
                className="card h-52 max-w-md w-1/1 min-w-[289px]  rounded-md relative overflow-hidden hover:-translate-y-1 duration-300"
              >
                <Image
                  src={food.imageUrl}
                  width={500}
                  height={500}
                  alt="cart-imge"
                  className="object-cover w-full h-full block object-center"
                />
                <div className=" p-2 absolute top-0 left-0 bg-black/50 z-10 w-full h-full text-center flex flex-col justify-center items-center">
                  <h3 className="text-white uppercase"> {food.name} </h3>
                  <p className="text-white font-semibold">
                    {excerpt(food.description)}
                  </p>
                </div>
                <div className="absolute top-2 right-2 z-[100]">
                  <span className="rounded-full bg-rose-800 text-white py-1 px-2 uppercase">
                    more rated
                  </span>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default NewFoods;
