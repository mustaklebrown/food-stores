import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiSearch } from 'react-icons/fi';
import Card from './Card';
import { Food } from '../typing';

const options = [
  'cake',
  'fastFood',
  'house meal',
  'doner',
  'sandwish',
  'pizza',
];

const OurMenus = () => {
  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    allFoods();
  }, []);

  const allFoods = async () => {
    const res = await axios.get('http://localhost:3000/api/foods');
    if (res.status == 200) {
      setFoods(res.data);
    } else {
      console.log('something went wrong');
    }
  };
  const filtering = async (category) => {
    const res = await axios.get(
      `http://localhost:3000/api/foods/${category}`
    );
    setFoods(res.data);
  };
  const handleSearch = async (e) => {
    e.preventDefault();
    let text = search.toLowerCase().trim();
    try {
      const res = await axios.get(`http://localhost:3000/api/foods`);
      const fds = res.data.filter((f: Food) => f.name.trim().toLowerCase().includes(text) || f.description.trim().toLowerCase().includes(text) || f.category.trim().toLowerCase().includes(text))

      if (!fds) {
        return;
      }

      setFoods(fds);
      setSearch('');
    } catch (error) {
      console.log(error);
    }

  };

  const excerpt = (str) => {
    if (str.length > 50) {
      str = str.substring(0, 75) + '...';
    }
    return str;
  };

  if (!foods) {
    return <div>loading ......</div>;
  }

  return (
    <div className="mb-10">
      <h1 className="text-4xl md:5xl text-yellow-500 text-center uppercase font-bold font-serif">
        our beloved menus
      </h1>
      <div className="w-52 h-2 bg-gradient-to-br from-indigo-800 mb-8 to-yellow-800 text-center mx-auto mt-2 rounded-full"></div>
      <div className="md:flex justify-between items-center w-full">
        <div className="mb-4 flex justify-between items-center gap-2 flex-wrap">
          <button
            onClick={allFoods}
            className="hover:translate-y-1 rounded border-yellow-500 shadow-yellow-500 shadow-md hover:bg-yellow-700 transition-all duration-300 hover:text-white"
          >
            all
          </button>
          {options.map((op, i) => {
            return (
              <button
                key={i}
                onClick={() => filtering(op)}
                className="hover:translate-y-1 rounded border-yellow-500 shadow-yellow-500 shadow-md hover:bg-yellow-700 transition-all duration-300 hover:text-white"
              >
                {op}
              </button>
            );
          })}
        </div>
        <div className="max-w-96 bg-white p-2 rounded-xl relative">
          <div className="relative">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <FiSearch className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </div>
            <form onSubmit={handleSearch}>
              <input
                type="text"
                name="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                id="email-address-icon"
                className="bg-gray-50 border border-gray-800 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-3  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="seach a menu"
              />
            </form>
          </div>
        </div>
      </div>
      <div>
        {foods.length < 1 && (
          <div className='w-full min-h-[400px] flex flex-col items-center justify-center'>
            <p className="text-red-500 font-bold text-xl italic text-center max-w-md">
              sorry there is not such a menu please seach another
            </p>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 gap-8 place-items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 py-6">
        {
          foods.map((f) => {
            return f.category && <Card key={f.id} food={f} />;
          })


        }

      </div>
    </div>
  );
};

export default OurMenus;
