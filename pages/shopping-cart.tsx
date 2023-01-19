import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import CartItem from '../components/CartItem';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { BsTrashFill } from 'react-icons/bs';
import Router from 'next/router'
import {
    selectCartItems,
    selectCartState,
    selectTotalAmount,
    selectTotalQTY,
    setClearCartItems,
    setGetTotals,
} from '../features/cartSlice';

const Shopping = (props) => {
    const dispatch = useDispatch()
    const totalQTY = useSelector(selectTotalQTY);
    const items = useSelector(selectCartItems);
    const totalAmount = useSelector(selectTotalAmount);

    useEffect(() => {
        dispatch(setGetTotals());
    }, [items, dispatch]);

    const onClearCartItems = () => {
        dispatch(setClearCartItems());
    };


    return (
        <>
            <div className="bg-gray-200 w-full h-screen">
                <div className='max-w-5xl mx-auto w-full h-full border pt-8 md:pt-16 px-5 md:px-0'>

                    <div className="w-full flex justify-between item-center mb-10 ">
                        <div className=" text-lg font-bold p-2">
                            <span className="inline w-24 "> {totalQTY} items</span>
                        </div>
                        <button className="btn" onClick={onClearCartItems}>clear</button>
                    </div>
                    <div className="space-y-2">

                        {
                            items.map(f => {
                                return (
                                    <div>
                                        <CartItem key={f.id} item={f} totalAmount={totalAmount} />
                                    </div>

                                )
                            })
                        }

                    </div>
                    <div className=" border-t-1 text-black w-full px-5 py-2 grid items-center">
                        <div className="flex items-center justify-between">
                            <h1 className="text-base font-semibold uppercase">SubTotal</h1>
                            <h1 className="text-sm rounded bg-theme-cart text-slate-900 px-1 py-0.5">
                                ${Math.floor(totalAmount)}
                            </h1>
                        </div>
                        <div className="grid items-center gap-4">
                            <p className="text-sm font-medium text-center">
                                Taxes and Shipping Will Calculate At Shipping
                            </p>
                            <button
                                onClick={() => Router.push("/checkout")}
                                type="button"
                                className=" bg-yellow-500 text-black "
                            >
                                Check Out
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Shopping