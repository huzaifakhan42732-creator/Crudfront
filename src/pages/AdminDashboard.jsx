import { useEffect, useState } from "react";
import API from "../api/axios";
import ProductForm from "../components/Productform.jsx";
import ProductCard from "../components/Productcard.jsx";

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const res = await API.get("/products");
    setProducts(res.data);
  };

  const deleteProduct = async id => {
    await API.delete(`/products/${id}`);
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>

      <ProductForm refresh={fetchProducts} />

      {products.map(p => (
        <ProductCard
          key={p._id}
          product={p}
          onDelete={deleteProduct}
        />
      ))}
    </div>
  );
}
