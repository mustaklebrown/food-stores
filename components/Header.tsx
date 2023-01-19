import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FiAlignRight } from 'react-icons/fi';
import { signOut, useSession } from "next-auth/react";
import { selectTotalQTY, setGetTotals } from "../features/cartSlice";
import { useDispatch, useSelector } from 'react-redux';

const Header: React.FC = () => {
  const router = useRouter();
  const active = router.pathname
  const dispatch = useDispatch()
  const totalQTY = useSelector(selectTotalQTY);

  const { data: session, status } = useSession();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(setGetTotals)
  }, [])


  const opennav = () => {
    setOpen((prev) => !prev);
  };
  return (
    <header className="sticky top-0 left-0 bg-indigo-900 z-[1000]  w-full mx-auto  text-gray-100">
      <div className="flex justify-between px-10 py-4 ">
        <div>
          <h1 className="text-2xl lg:text-3xl uppercase font-bold font-mono ">
            food<span className="text-yellow-400">Stores</span>
          </h1>
        </div>
        <ul className="hidden md:flex items-center space-x-4 lg:space-x-6 ">
          <Link
            href="/"
            className={active == "/" ? "active " : "navlink"}
          >
            Home
          </Link>
          <Link
            href="/about"
            className={active == "/about" ? "active " : "navlink"}
          >
            about
          </Link>
          <Link
            href="/shopping-cart"
            className={active == "/shopping-cart" ? "active " : "navlink"}
          >
            shopping <span className="bg-yellow-600 text-lg text-white p-1 w-10 h-10 rounded-full">
              {totalQTY}
            </span>
          </Link>
          {session && <Link
            href="/addEddit"
            className={active == "/addEddit" ? "active " : "navlink"}
          >
            create
          </Link>}
          {!session ? (<Link href="/api/auth/signin" legacyBehavior>
            <a className="btn" >Log in</a>
          </Link>) : (<button className="btn" onClick={() => signOut()}>
            <a>Log out</a>
          </button>)}



        </ul>
        <button
          onClick={() => opennav()}
          type="button"
          className="text-3xl hover:text-yellow-400 duration-300 hover:-translate-y-1 cursor-pointer hover:underline md:hidden"
        >
          <FiAlignRight width={10} height={20} />
        </button>
      </div>
      <div
        className={`${open
          ? ' duration-300 transition-all'
          : 'hidden duration-300 transition-all'
          } `}
      >
        <ul className="md:hidden border-b flex-col flex space-y-4 w-full text-center py-8 duration-300 ease-in-out transition-all ">
          <Link
            href="/"
            onClick={() => opennav()}
            className="moblink "
          >
            home
          </Link>
          <Link
            href="/about"
            onClick={() => opennav()}
            className="moblink "
          >
            about
          </Link>
          <Link
            href="/shopping-cart"
            onClick={() => opennav()}
            className="moblink "
          >
            shopping
          </Link>
          {session && <Link
            href="/addEddit"
            onClick={() => opennav()}
            className="moblink "
          >
            create
          </Link>}
          {!session ? (<Link href="/api/auth/signin" legacyBehavior>
            <a className="linklog" >Log in</a>
          </Link>) : (<button className="linklog" onClick={() => signOut()}>
            <a>Log out</a>
          </button>)}

        </ul>
      </div>
    </header>
  );



};

export default Header;
