import {
  Action,
  ActionCreator,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { Food } from '../typing';
import Card from './../components/Card';
import CartItem from './../components/CartItem';

// declaring the types for our state

export type CartItems = {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  imageUrl: string;
  rate: number;
  cartQuantity: number;
};

export type CartState = {
  cartItems: CartItems[];
  cartState: Boolean;
  cartTotalAmount: Number;
  cartTotalQuantity?: number;
};

if (typeof window !== 'undefined') {
  // Perform localStorage action
  // const item = localStorage.getItem('key')
}
const initialState: CartState = {
  cartState: false,
  // cartItems: [],
  cartItems:
    typeof window !== 'undefined' && localStorage.getItem('cart')
      ? JSON.parse(localStorage.getItem('cart'))
      : [], // Let Suppose Database
  cartTotalAmount: 0,
  cartTotalQuantity: 0,
};

const CartSlice = createSlice({
  initialState,
  name: 'cart',
  reducers: {
    getTotal: (state) => {
      let total = state.cartItems.reduce(
        (acc, item) => acc + item.cartQuantity,
        0
      );
      state.cartTotalQuantity == total;
    },
    setOpenCart: (state, action: PayloadAction<any>) => {
      state.cartState = action.payload.cartState;
    },
    setCloseCart: (state, action) => {
      state.cartState = action.payload.cartState;
    },
    setAddItemToCart: (state, action) => {
      // const itemIndex = state.cartItems.findIndex(
      //   (item: CartItems) => item.id === action.payload.id
      // );

      // if (itemIndex >= 0) {
      //   state.cartItems[itemIndex].cartQuantity += 1;

      //   toast.success(`Item QTY Increased`);
      // } else {
      //   const temp = { ...action.payload, cartQuantity: 1 };
      //   state.cartItems.push(temp);

      //   toast.success(`${action.payload.name} added to Cart`);
      // }
      const newItem = action.payload;
      const existItem = state.cartItems.find((item) => item.id == newItem.id);
      const cartItem = existItem
        ? state.cartItems.map((item) =>
            item.name === existItem.name ? newItem : item
          )
        : [...state.cartItems, CartItem];
      toast.success(`${action.payload.name} added to Cart`);

      localStorage.setItem('cart', JSON.stringify(state.cartItems));
    },

    setRemoveItemFromCart: (state, action) => {
      const removeItem = state.cartItems.filter(
        (item: CartItems) => item.id !== action.payload.id
      );

      state.cartItems = removeItem;
      localStorage.setItem('cart', JSON.stringify(state.cartItems));

      toast.success(`${action.payload.title} Removed From Cart`);
    },

    setIncreaseItemQTY: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1;

        toast.success(
          `Item QTY increased ${state.cartItems[itemIndex].cartQuantity}`
        );
      }
      localStorage.setItem('cart', JSON.stringify(state.cartItems));
    },

    setDecreaseItemQTY: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;

        toast.success(
          `Item QTY Decreased ${state.cartItems[itemIndex].cartQuantity}`
        );
      }
      localStorage.setItem('cart', JSON.stringify(state.cartItems));
    },

    setClearCartItems: (state) => {
      state.cartItems = [];
      toast.success(`Cart Cleared`);
      localStorage.setItem('cart', JSON.stringify(state.cartItems));
    },

    setGetTotals: (state) => {
      let { totalAmount, totalQTY } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, cartQuantity } = cartItem;
          const totalPrice = price * cartQuantity;

          cartTotal.totalAmount += totalPrice;
          cartTotal.totalQTY += cartQuantity;

          return cartTotal;
        },
        {
          totalAmount: 0,
          totalQTY: 0,
        }
      );

      state.cartTotalAmount = totalAmount;
      state.cartTotalQuantity = totalQTY;
    },
  },
});
// Here we are just exporting the actions from this slice, so that we can call them anywhere in our app.
export const {
  getTotal,
  setOpenCart,
  setCloseCart,
  setAddItemToCart,
  setRemoveItemFromCart,
  setIncreaseItemQTY,
  setDecreaseItemQTY,
  setClearCartItems,
  setGetTotals,
} = CartSlice.actions;

export const selectCartState = (state) => state.cart.cartState;
export const selectCartItems = (state) => state.cart.cartItems;

export const selectTotalAmount = (state) => state.cart.cartTotalAmount;
export const selectTotalQTY = (state) => state.cart.cartTotalQuantity;

// calling the above actions would be useless if we could not access the data in the state. So, we use something called a selector which allows us to select a value from the state.
export const selectCount = (state) => state.cart;

// exporting the reducer here, as we need to add this to the store
export default CartSlice.reducer;
