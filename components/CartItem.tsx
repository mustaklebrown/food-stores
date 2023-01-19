import React from 'react'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux';
import {
    setDecreaseItemQTY,
    setIncreaseItemQTY,
    setRemoveItemFromCart,
} from '../features/cartSlice';
import { BsTrashFill } from 'react-icons/bs';
import toast, { Toaster } from 'react-hot-toast';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

const CartItem = ({ item, totalAmount }) => {
    const dispatch = useDispatch();
    const { id, name, price, category, description, imageUrl, rate, cartQuantity } =
        item;
    const onRemoveItem = () => {
        dispatch(
            setRemoveItemFromCart({
                id,
                name,
                price,
                category,
                description,
                imageUrl,
                rate,
                cartQuantity,
            })
        );
    };
    const onIncreaseItemQTY = () => {
        const fd = {
            id,
            name,
            price,
            category,
            description,
            imageUrl,
            rate,
            cartQuantity
        }
        dispatch(
            setIncreaseItemQTY(fd)
        );
    };
    const onDecreaseItemQTY = () => {
        const fd = {
            id,
            name,
            price,
            category,
            description,
            imageUrl,
            rate,
            cartQuantity
        }
        dispatch(
            setDecreaseItemQTY(fd)
        );
    };
    return (
        <div className="bg-gray-50 p-2 flex items-center w-full justify-between">
            <div className='w-[100px] md:w-[120px] h-[80px] md:h-[100px] '>
                <Image src={imageUrl} alt={name} width={200} height={200} className="w-full h-full object-cover object-center " />
            </div>
            <div className="flex  space-x-1 md:space-x-4 items-center">
                <div onClick={onIncreaseItemQTY} className="bg-yellow-500 rounded-lg p-2 cursor-pointer" >
                    <AiOutlinePlus size={30} />
                </div>

                <p className="text-xl font-bold">
                    {cartQuantity}
                </p>
                <div onClick={onDecreaseItemQTY} className="bg-yellow-500 rounded-lg p-2 cursor-pointer">
                    <AiOutlineMinus size={30} />
                </div>

            </div>
            <div className="flex flex-col gap-2 items-center">
                <p className='text-yellow-500 text-2xl font-bold italic'>
                    ${price * cartQuantity}
                </p>

                <button onClick={onRemoveItem} className='inline-block px-4 sm:px-6 py-1 sm:py-2 truncate bg-rose-500 text-white font-medium text-sm  uppercase rounded shadow-md hover:bg-rose-700 hover:shadow-lg focus:bg-rose-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-rose-700 active:shadow-lg transition duration-150 ease-in-out'>
                    <BsTrashFill size={20} />
                </button>
            </div>
        </div>
    )
}

export default CartItem