import { createSlice } from "@reduxjs/toolkit";
const initialState=({
    items:JSON.parse(localStorage.getItem("wishlist")) || [], // for storing products into this
})

// Store WishList Data Into LocalStorage So That We Got The Also After Refreshing Our Page.
const wishlistslice=createSlice({
     name:'wishlist',
     initialState,
     reducers:{
        addtowishlist:(state,action)=>{
                const item=action.payload;
                const existing=state.items.find(i=>i.id===item.id);
                if(!existing)
                {
                    state.items.push(item);
                    localStorage.setItem("wishlist",JSON.stringify(state.items));
                }
        },
removeFromwishlist: (state, action) => {
  const item = action.payload; // ✅ get the id from dispatched action
  state.items = state.items.filter((i) => i.id !== item.id);
  localStorage.setItem("wishlist", JSON.stringify(state.items)); // update storage
},

        clearwishlist:(state)=>{
            state.items=[];
            localStorage.setItem("wishlist", JSON.stringify([]));
        },
     },
});
export const {addtowishlist,removeFromwishlist,clearwishlist}=wishlistslice.actions;
export default wishlistslice.reducer;