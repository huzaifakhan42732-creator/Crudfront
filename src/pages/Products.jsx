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
    <>
      <div className="products-page">
        <h1 className="products-title">Our Products</h1>
        <div className="products-grid">
          {products.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      </div>

      <style>{`
        body {
          margin: 0;
          background-color: #f5f5f7; /* consistent soft background */
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .products-page {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 20px;
          animation: fadeIn 0.5s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .products-title {
          font-size: 2.2rem;
          font-weight: 600;
          color: #1a1a1a;
          text-align: center;
          margin-bottom: 2rem;
          letter-spacing: -0.01em;
          position: relative;
        }

        .products-title::after {
          content: '';
          display: block;
          width: 60px;
          height: 4px;
          background: linear-gradient(90deg, #007aff, #0051d5);
          border-radius: 2px;
          margin: 0.5rem auto 0;
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 2rem;
          justify-content: center;
        }

        /* Optional: if your ProductCard doesn't already have base styles,
           you can uncomment and adjust the following to match the theme */
        /*
        .product-card {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.02), 0 2px 6px rgba(0, 0, 0, 0.03);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .product-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 30px rgba(0, 0, 0, 0.05), 0 8px 12px rgba(0, 0, 0, 0.1);
        }

        .product-card img {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }

        .product-card-content {
          padding: 1.2rem;
        }

        .product-card h3 {
          margin: 0 0 0.5rem 0;
          font-size: 1.3rem;
          color: #1a1a1a;
        }

        .product-card p {
          margin: 0;
          color: #666;
          line-height: 1.5;
        }

        .product-price {
          font-size: 1.4rem;
          font-weight: 600;
          color: #007aff;
          margin-top: 0.8rem;
        }
        */
      `}</style>
    </>
  );
}