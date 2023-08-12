import Image from "next/image";
import styles from "./index.module.css";
import { useCartDispatch } from "@/context/CartContext";

export default function ProductList({ product }) {
  // console.log(product);
  const dispatch = useCartDispatch();

  const handleAddToCart = (product) => {
    dispatch({
      type: "add",
      payload: product,
    });
  };

  return (
    <div className={styles["product-list"]}>
      {product.map((product, index) => {
        return (
          <div key={product.id} className={styles["product-list__card-product"]}>
            <div className={styles["product-list__card-product__image"]}>
              <Image src={product.images[0]} fill sizes="700px" style={{ objectFit: "contain" }} alt={product.title} />
            </div>
            <div className={styles["product-list__card-product__desc"]}>
              <h1 className="text-sm font-serif font-semibold">{product.title}</h1>
              <button onClick={() => handleAddToCart(product)}>+</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
