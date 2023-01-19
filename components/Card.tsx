
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Food } from '../typing';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems } from '../features/cartSlice';
import { setAddItemToCart } from '../features/cartSlice';


interface Props {
  food: Food
}

const Card = ({ food }: Props) => {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const { id, name, price, category, description, imageUrl, rate, author, createAt } =
    food;
  const onAddToCart = () => {
    const item = { id, name, price, category, description, imageUrl, rate }
    dispatch(setAddItemToCart(item));
  };



  const date = new Date(food.createAt)
  return (
    <Link
      href={`/food/${id}`}
      className="card  max-w-md relative rounded-lg overflow-hidden cursor-pointer hover:-translate-y-1 duration-200 transition-all "
    >
      <Image
        src={imageUrl}
        alt={name}
        width={300}
        height={400}
        className=" w-64 sm:w-60 h-44 object-cover object-center "
      />
      <div className="p-2 flex justify-between ">
        <h3 className="text-lg font-semibold uppercase">{name}</h3>
        <p className="text-lg font-semibold text-indigo-800 uppercase">
          $ {food.price}
        </p>
      </div>
      <div className="absolute top-2 right-5 bg-indigo-600  p-1 rounded-full z-50">
        <p className="z-50 text-white uppercase  font-bold">{category}</p>
      </div>
      <div>
        <p className="p-2 text-md font-mono italic font-semibold" >
          {/* {date.toLocaleDateString()} */}
          {author?.name}
        </p>
        <p className="px-2 text-md font-mono italic font-semibold" >
          {/* {date.toLocaleDateString()} */}
          {moment(createAt).format('D/M/YYYY')}
        </p>

      </div>
      <button className='btn  w-full px-2' onClick={() => onAddToCart()}>add to cart</button>

    </Link>
  );
};

export default Card;
