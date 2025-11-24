import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import wishlistsliceReducer  from './whishlist.jsx';
// We are importing the function so the wishlistReducer is the only name we can write any name in place of it. 
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistsliceReducer,
      // the name should anything instead of whiishlistReducer.
  },
});
