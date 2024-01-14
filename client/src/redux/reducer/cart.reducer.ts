import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CourseModel } from "../../models/course.model";

const initialState: CourseModel[] = [];

export const cartReducer = createSlice({
  name: "cart",
  initialState,
  
  reducers: {
    
    addItemToCart: (cart, action: PayloadAction<CourseModel[]>) => {
      
      cart.push(...action.payload);
      
      return cart;
    },
    deleteItemFromCart : (cart, action: PayloadAction<CourseModel>) => {
      const store=cart.filter(item => item.id !== action.payload.id);
      return store;
    }

  },
});

export const { addItemToCart, deleteItemFromCart } = cartReducer.actions;
export default cartReducer.reducer;