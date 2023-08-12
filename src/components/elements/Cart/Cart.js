import { useCart, useCartDispatch } from "@/context/CartContext";
import styles from "./index.module.css";

export default function Cart() {
  const carts = useCart();
  const dispatch = useCartDispatch();
  // console.log(carts)

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

  return (
    <div className={styles.cart}>
      <h3 className="text-center text-xl font-semibold">Cart</h3>
      {carts.map((cart, index) => {
        return (
          <div key={index}>
            <p>{cart.title}</p>
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
  );
}
