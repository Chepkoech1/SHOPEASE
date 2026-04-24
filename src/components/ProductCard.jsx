import { useState } from "react";
import styles from "../styles/ProductCard.module.css";

function ProductCard({ product, addToCart }) {
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <div className={styles.card}>

      <img
        src={product.image}
        alt={product.name}
        className={styles.image}
      />

      <div className={styles.body}>

        {product.category && (
          <span className={styles.category}>{product.category}</span>
        )}

        <h3 className={styles.name}>{product.name}</h3>

        {product.description && (
          <p className={styles.description}>{product.description}</p>
        )}

        <div className={styles.footer}>
          <span className={styles.price}>${product.price}</span>

          {product.rating && (
            <div>
              <span className={styles.rating}>
                {"★".repeat(Math.floor(product.rating))}
              </span>
              <span className={styles.reviews}>({product.reviews})</span>
            </div>
          )}
        </div>

        <button
          className={`${styles.button} ${added ? styles.added : ""}`}
          onClick={handleAdd}
          disabled={added}
        >
          {added ? "✓ Added!" : "Add to Cart"}
        </button>

      </div>
    </div>
  );
}

export default ProductCard;