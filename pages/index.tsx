import React, { useEffect, useState } from "react";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Layout from "../components/Layout";
import prisma from '../lib/prisma'
import Hero from './../components/Hero';
import NewFoods from './../components/NewFoods';
import AboutUs from './../components/AboutUs';
import OurMenus from './../components/OurMenus';
import { Food } from "../typing";
import axios from "axios";

// export const getServerSideProps: GetServerSideProps = async () => {
//   const foods = await prisma.food.findMany({
//     where: {
//       published: true,
//     },
//     include: {
//       author: {
//         select: {
//           name: true,
//         },
//       },
//     },
//   });

//   return {
//     props: { foods },
//   };
// };

type Props = {
  foods: Food[]
  fds: Food[]
};

const Home: React.FC<Props> = (props) => {
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



  return (

    <div className="max-w-7xl mx-auto">
      <Hero />
      <NewFoods />
      <AboutUs />
      <OurMenus />
    </div>

  );
};

export default Home;
