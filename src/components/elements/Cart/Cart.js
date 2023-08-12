import { useCart, useCartDispatch } from "@/context/CartContext";
import styles from "./index.module.css";
import { useState } from "react";

export default function Cart() {
  const [payAmount, setPayAmount] = useState();

  const carts = useCart();
  const dispatch = useCartDispatch();
  // console.log(carts);

  const handleAddToCart = (product) => {
    dispatch({
      type: "add",
      payload: product,
    });
  };
  const handleDecreaseToCart = (product) => {
    dispatch({
      type: "decrease",
      payload: product,
    });
  };
  const eraseList = () => {
    dispatch({ type: "clear" });
  };
  const getTotalPrice = () => {
    let totalPrice = 0;
    for (let i = 0; i < carts.length; i++) {
      totalPrice += carts[i].price * carts[i].quantity;
    }

    // console.log(totalPrice);
    return totalPrice;
  };

  const handleCheckout = async () => {
    const product = carts.map((item) => {
      return {
        id: item.id,
        quantity: item.quantity,
      };
    });

    try {
      const payload = {
        total_price: +getTotalPrice(),
        paid_amount: +payAmount, //'+' adalah cara cepat untuk mengubah menjadi number dibanding menggunakan number(payAmount)
        product,
      };
      console.log(payload);
      setPayAmount(0);
      dispatch({ type: "clear" });
    } catch {
      throw Error("error");
    }
  };

  const isDisableButton = () => {
    return !payAmount || +payAmount < getTotalPrice();
  };

  return (
    <div className={styles.cart}>
      <h3 className="text-center text-xl font-semibold">Cart</h3>
      <div className="mt-5 flex flex-col gap-3 max-h-[75%] h-[75%] overflow-auto">
        {carts.map((cart, index) => {
          return (
            <div key={index}>
              <p>{cart.title}</p>
              <p>${cart.price},00</p>

              <p>{cart.quantity}</p>
              <button className="w-5 h-5 bg-yellow-400 rounded-full" onClick={() => handleAddToCart(cart)}>
                +
              </button>
              <button className="w-5 h-5 bg-yellow-400 rounded-full" onClick={() => handleDecreaseToCart(cart)}>
                -
              </button>
            </div>
          );
        })}
      </div>
      <div className="mt-12 text-center">
        <div className="flex justify-between">
          <p>Total Harga</p>
          <p>${getTotalPrice()},00</p>
        </div>
        <div className="flex justify-between">
          <label>Bayar</label>
          <input type="number" placeholder="-" className="text-right w-[70%]" onChange={(e) => setPayAmount(e.target.value)} value={payAmount} />
        </div>
        <div className="flex justify-evenly mt-2">
          <button className="bg-green-500 text-white rounded-lg h-7 px-2 disabled:opacity-50" onClick={handleCheckout} disabled={isDisableButton()}>
            Checkout
          </button>
          <button className="bg-red-500 text-white rounded-lg h-7 px-2" onClick={() => eraseList()}>
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
}
