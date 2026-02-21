export default function ProductCard({ product, onDelete }) {
  return (
    <div>
      <h3>{product.name}</h3>
      <p>${product.price}</p>

      {onDelete && (
        <button onClick={() => onDelete(product._id)}>
          Delete
        </button>
      )}
    </div>
  );
}
