"use client";
import Image from "next/image";
import Layout from "@/components/layouts/Layout";
import ProductList from "@/components/elements/ProductList/ProductList";
import { useEffect, useState } from "react";
import Cart from "@/components/elements/Cart/Cart";

export default function Home() {
  const [product, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  }, []);

  return (
    <Layout>
      <h1 className="text-5xl font-bold text-center">E-Commerce Project</h1>
      <div className="flex flex-row">
        <ProductList product={product} />
        <Cart />
      </div>
    </Layout>
  );
}
