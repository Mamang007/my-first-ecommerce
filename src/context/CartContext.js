"use client";
import { createContext, useContext, useReducer } from "react";

const CartContext = createContext(null);
const CartDispatchContext = createContext(null);

const cartsReducer = (carts, action) => {
  // Jadi isi dari cartsReducer adalah function-function untuk mengelola Cart
  // Seperti controller pada node, tetapi menggunakan 'switch' atau 'if else'
  switch (action.type) {
    case "add": {
      const index = carts.findIndex((obj) => obj.id === action.payload.id);

      if (index === -1) {
        return [...carts, { ...action.payload, quantity: 1 }];
      } else {
        return carts.map((cart) => {
          if (cart.id === action.payload.id) {
            return { ...cart, quantity: cart.quantity + 1 };
          } else {
            return cart;
          }
        });
      }
      break;
    }

    case "decrease": {
      const index = carts.findIndex((obj) => obj.id === action.payload.id);
      if (index !== -1) {
        if (carts[index].quantity === 1) {
          return carts.filter((obj) => obj.id !== action.payload.id);
        } else {
          return carts.map((cart) => {
            if (cart.id === action.payload.id) {
              return { ...cart, quantity: cart.quantity - 1 };
            } else {
              return cart;
            }
          });
        }
      }
      break;
    }

    case "clear": {
      return [];
      break;
    }

    default:
      {
        throw Error("Error");
      }
      break;
  }
};

const initialState = [];

// Membuat Provider/Penyedia Context yang akan dikirim ke children
const CartProvider = ({ children }) => {
  // Reducer = Tempat untuk menyimpan banyak state, jadi untuk mengubah state cukup menggunakan satu handler
  // dispatch adalah sebuah fungsi fitur milik Reducer untuk update beberapa state sekaligus
  const [carts, dispatch] = useReducer(cartsReducer, initialState);

  return (
    <CartContext.Provider value={carts}>
      <CartDispatchContext.Provider value={dispatch}>{children}</CartDispatchContext.Provider>
    </CartContext.Provider>
  );
};

//Kirim untuk nge-wrap layout di folder app
export default CartProvider;

export const useCart = () => {
  return useContext(CartContext);
};
export const useCartDispatch = () => {
  return useContext(CartDispatchContext);
};
