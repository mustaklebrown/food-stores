import React, { useState } from 'react';

import axios from 'axios';
import Router from 'next/router';

const initialState = {
  name: '',
  description: '',
  price: '',
  imageUrl: '',
  category: '',
};
const options = [
  'cake',
  'fastFood',
  'house meal',
  'doner',
  'sandwish',
  'pizza',
];

const AddEddit = (props) => {
  const [formvalue, setFormvalue] = useState(initialState);
  const { name, description, price, imageUrl, category } = formvalue;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name && !description && !price && !category && !imageUrl) {
      return;
    }
    if (name && description && price && category && imageUrl) {
      const updatedForm = {
        ...formvalue,
        price: Number(price),
        rate: 1,
        imageUrl: imageUrl,
      };
      const res = await axios.post(
        'http://localhost:3000/api/food',
        updatedForm
      );
      if (res.status === 200) {
        console.log('food create successfully');
        setFormvalue({
          name: '',
          description: '',
          category: '',
          price: '',
          imageUrl: '',
        });
      } else {
        console.log('somethings went wrong');
      }
    }
  };

  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormvalue({ ...formvalue, [name]: value });
  };
  const onCategoryChange = (e) => {
    setFormvalue({ ...formvalue, category: e.target.value });
  };
  const onUploadImage = (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'kmyv04ai');
    axios
      .post(`http://api.cloudinary.com/v1_1/${process.env.CLOUDNARY}/image/upload`, formData)
      .then((res) => {
        setFormvalue({ ...formvalue, imageUrl: res.data.url });
        console.log("image uploaded successfully");

      })
      .catch((err) => {
        console.log('error', err);
      });
  };

  return (
    <div className="max-w-lg mx-auto my-8">
      <h1 className="text-2xl font-serif font-bold uppercase text-center">
        create a food
      </h1>
      <form
        action=""
        className="mx-10 lg:mx-1 p-4 bg-gray-400 rounded-lg "
        onSubmit={handleSubmit}
      >
        <div className="mb-6">
          <label
            htmlFor="base-input"
            className="text-lg font-semibold uppercase block mb-2  font-serif text-gray-900 dark:text-white"
          >
            name
          </label>
          <input
            type="text"
            name="name"
            value={name || ''}
            onChange={onInputChange}
            id="base-input"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="base-input"
            className="text-lg font-semibold uppercase block mb-2  font-serif text-gray-900 dark:text-white"
          >
            price
          </label>
          <input
            onChange={onInputChange}
            name="price"
            type="number"
            value={price || 0}
            id="base-input"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="message"
            className="text-lg font-semibold uppercase block mb-2  font-serif text-gray-900 dark:text-white"
          >
            description
          </label>
          <textarea
            onChange={onInputChange}
            id="message"
            rows={4}
            name="description"
            value={description || ''}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Leave a comment..."
          ></textarea>
        </div>
        <div className="mb-6">
          <label
            className="block mb-2 font-semibold uppercase text-lg font-serif text-gray-900 dark:text-white"
            htmlFor="user_avatar"
          >
            Upload file
          </label>
          <input
            onChange={(e) => {
              onUploadImage(e.target.files[0]);
            }}
            className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            aria-describedby="user_avatar_help"
            id="user_avatar"
            type="file"
          ></input>
        </div>
        <div className="mb-6">
          <label
            htmlFor="countries"
            className="text-lg font-semibold uppercase block mb-2  font-serif text-gray-900 dark:text-white"
          >
            select a category
          </label>
          <select
            onChange={onCategoryChange}
            value={category}
            id="countries"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option>chose a category </option>
            {options.map((op, i) => {
              return (
                <option value={op || ''} key={i}>
                  {' '}
                  {op}{' '}
                </option>
              );
            })}
          </select>
        </div>
        <div className="text-center flex space-x-10 items-center justify-center">
          <button
            onClick={() => Router.push('/')}
            type="submit"
            className="uppercase font-bold text-gray-100 rounded-2xl py-2 px-4 bg-rose-500 hover:bg-rose-700 transition-all duration-300"
          >
            cancel
          </button>
          <button
            disabled={!imageUrl}
            type="submit"
            className="uppercase font-bold text-gray-100 rounded-2xl py-2 px-4 bg-indigo-500 hover:bg-indigo-700 transition-all duration-300"
          >
            create
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEddit;
