import { useState } from "react";
import API from "../api/axios.js";

export default function ProductForm({ refresh }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const submit = async () => {
    await API.post("/products", { name, price });
    setName("");
    setPrice("");
    refresh();
  };

  return (
    <div>
      <input
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <input
        placeholder="Price"
        value={price}
        onChange={e => setPrice(e.target.value)}
      />

      <button onClick={submit}>Add</button>
    </div>
  );
}
