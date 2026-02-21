import { useEffect, useState } from "react";
import API from "../api/axios.js";
import ProductCard from "../components/Productcard.jsx";

export default function Products() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const res = await API.get("/products");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Products</h1>

      {products.map(p => (
        <ProductCard key={p._id} product={p} />
      ))}
    </div>
  );
}
