import React, { useEffect, useState } from 'react';
import Router from "next/router";
import axios from 'axios';
import { GetServerSideProps, GetStaticPaths, InferGetServerSidePropsType } from 'next';
import Image from 'next/image';
import { Food } from '../../typing';
import moment from 'moment';
import { getSession, useSession } from 'next-auth/react';
import UpdateFood from './../../components/UpdateFood';
import Card from '../../components/Card';
import prisma from '../../lib/prisma';
import { selectCartItems } from '../../features/cartSlice';
import { useDispatch, useSelector } from 'react-redux';

import { setAddItemToCart } from '../../features/cartSlice';


export const getServerSideProps: GetServerSideProps = async (context) => {
    const id = context.params.id.toString()


    const res = await axios.get(`http://localhost:3000/api/food/${id}`)

    return {
        props: {
            food: res.data,
            session: await getSession(context),
        },
    };
};
// export const getStaticPaths: GetStaticPaths = async () => {
//     const res = await axios.get('http://localhost:3000/api/foods')
//     const foods = res.data


//     const paths = foods.map((food: Food) => ({
//         params: { id: food.id.toString() },
//     }))
//     return { paths, fallback: false }

// }

interface Props {
    food: Food
}


const FoodDetail = ({ food, session }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const [foods, setFoods] = useState([]);
    const [open, setOpen] = useState<boolean>(false)
    const dispatch = useDispatch();
    const items = useSelector(selectCartItems);
    const { id, name, price, category, description, imageUrl, rate, author, createAt } =
        food;
    const onAddToCart = () => {
        const item = { id, name, price, category, description, imageUrl, rate }
        dispatch(setAddItemToCart(item));
    };


    const filtering = async (category) => {
        const res = await axios.get(
            `http://localhost:3000/api/foods/${category}`
        );
        setFoods(res.data);
    };


    const deleteFood = async (id: number) => {
        const res = await axios.delete(`http://localhost:3000/api/food/${id}`).then(() => {
            Router.push("/")
            console.log(`food ${id} deleted successfully`);

        })
    }
    return (
        <div className="relative h-full pb-10 ">
            <div className='w-full px-3 sm:px-10   max-w-7xl md:mx-auto'>
                <div className="lg:flex gap-10 py-10 w-full">
                    <div className="flex-2 mb-5 lg:w-1/2 lg:mb-0">
                        <Image
                            src={imageUrl}
                            className="w-full  h-[340px] md:h-[450px] object-center rounded-2xl  object-cover "
                            alt="food image"
                            width={600}
                            height={600}
                        />
                    </div>
                    <div className="flex-1 flex flex-col space-y-3">
                        <h2 className="text-2xl uppercase  bg-clip-text bg-gradient-to-r text-transparent font-serif from-indigo-700 via-green-500 to-yellow-600 font-semibold tracking-widest ">
                            {name}
                        </h2>
                        <div className="flex justify-between items-center max-w-lg">
                            <p className=" block sm :flex text-xl uppercase  bg-clip-text bg-gradient-to-r text-transparent font-serif from-indigo-700 via-green-500 to-yellow-600 font-semibold tracking-widest">
                                <span className="text-xl font-bold text-gray-900 uppercase italic font-serif">
                                    category
                                </span>{' '}
                                : <span>{category}</span>
                            </p>

                            <p className="py-1 px-3 sm:py-2 sm:px-5 bg-indigo-900 text-yellow-400">
                                {price}$
                            </p>
                        </div>

                        <p>
                            <span className="text-xl  bg-clip-text bg-gradient-to-r text-transparent font-serif from-indigo-700 via-green-500 to-yellow-600 font-semibold tracking-wider ">
                                About our menu
                            </span>
                            <br />
                            {description}
                        </p>

                        <p className="text-lg font-bold text-gray-900 uppercase italic font-serif">
                            {' '}
                            published at :{' '}
                            <span className="text-lg  bg-clip-text bg-gradient-to-r text-transparent font-serif from-indigo-700 via-green-500 to-yellow-600 font-semibold tracking-wider">
                                {moment(createAt).format('D/M/YYYY')}
                            </span>
                        </p>
                        <p className="text-lg font-bold text-gray-900 uppercase italic font-serif">
                            {' '}
                            published by :{' '}
                            <span className="text-lg  bg-clip-text bg-gradient-to-r text-transparent font-serif from-indigo-700 via-green-500 to-yellow-600 font-semibold tracking-wider">
                                {author.name}
                            </span>
                        </p>
                        <button className='btn  w-full px-5 max-w-sm mx-auto' onClick={() => onAddToCart()}>add to cart</button>
                    </div>

                </div>
                <div className='flex gap-4 items-center'>
                    <button
                        onClick={() => {
                            Router.push("/")
                        }}
                        className="btn bg-yellow-500 hover:bg-yellow-700"
                    >
                        go back
                    </button>
                    {session && food?.author && (
                        <button
                            onClick={() =>
                                deleteFood(id)
                            }
                            className=" inline-block px-4 sm:px-6 py-1 sm:py-2 truncate bg-rose-500 text-white font-medium text-sm  uppercase rounded shadow-md hover:bg-rose-700 hover:shadow-lg focus:bg-rose-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-rose-700 active:shadow-lg transition duration-150 ease-in-out"
                        >
                            delete
                        </button>
                    )}
                    {session && food?.author && (
                        <button
                            onClick={() =>
                                setOpen(true)
                            }
                            className=" inline-block px-4 sm:px-6 py-1 sm:py-2 truncate bg-green-500 text-white font-medium text-sm  uppercase rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out"
                        >
                            update food
                        </button>
                    )}
                    <button
                        onClick={() => {
                            filtering(category)
                        }}
                        className="inline-block px-4 sm:px-6 py-1 sm:py-2 truncate bg-blue-500 text-white font-medium text-sm  uppercase rounded shadow-md hover:bg-gblue-700 hover:shadow-lg focus:bg-blue-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-700 active:shadow-lg transition duration-150 ease-in-out"
                    >
                        explore more
                    </button>

                </div>
            </div>

            {open && setOpen && (
                <div className='absolute top-0 left-0 w-full h-full'>

                    <UpdateFood food={food} setOpen={setOpen} />
                </div>
            )}
            <div className='max-w-7xl mx-auto grid grid-cols-1 gap-8 place-items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 py-6'>
                {
                    foods.map(food => {
                        return (
                            <Card key={food.id} food={food} />
                        )
                    })
                }
            </div>

        </div>
    );
};

export default FoodDetail;
