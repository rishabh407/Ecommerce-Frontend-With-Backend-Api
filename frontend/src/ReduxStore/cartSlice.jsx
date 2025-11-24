// npm install @reduxjs/toolkit react-redux
import { createSlice } from "@reduxjs/toolkit";
const initialState={
    items:JSON.parse(localStorage.getItem("cartitems")) || [],  //{id,title,price,quantity}
    total:JSON.parse(localStorage.getItem("total")) || 0,
};
const cartSlice=createSlice({
    name:'cart',
    initialState,
    reducers:{
        addToCart:(state,action)=>{
            const item=action.payload;
            const existing = state.items.find(i=>i.id===item.id);
            if(existing)
            {
                existing.quantity+=1;
            }else{
                state.items.push({...item,quantity:1});
            }
            state.total=state.items.reduce((acc,curr)=>acc+curr.price*curr.quantity,0);
            localStorage.setItem("cartitems",JSON.stringify(state.items));
            localStorage.setItem("total", JSON.stringify(state.total));
        },
        removeFromCart: (state,action) => {
  const item = action.payload;
  const existing = state.items.find(i => i.id === item.id);
  if (existing) {
    if (existing.quantity > 1) {
      existing.quantity -= 1;
    } else {
      state.items = state.items.filter(i => i.id !== item.id);
    }
  }

  state.total = state.items.reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    0
  );
  localStorage.setItem("cartitems", JSON.stringify(state.items)); 
  localStorage.setItem("total", JSON.stringify(state.total));
},

        clearCart:(state)=>{
            state.items=[];
            state.total=0;
            localStorage.setItem("cartitems", JSON.stringify([]));
            localStorage.setItem("total", JSON.stringify(0));
        },
    },
});
export const {addToCart,removeFromCart,clearCart}=cartSlice.actions;
export default cartSlice.reducer;