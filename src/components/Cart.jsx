import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Cart.module.css";

function Cart({ cart, removeFromCart }) {
  const [removing, setRemoving] = useState(null);

  const total = cart.reduce((sum, item) => sum + item.price * (item.qty ?? 1), 0);
  const itemCount = cart.reduce((sum, item) => sum + (item.qty ?? 1), 0);
  const shipping = total >= 75 ? 0 : 9.95;
  const tax = total * 0.08;
  const grandTotal = total + shipping + tax;
  const remaining = 75 - total;

  const handleRemove = (index) => {
    setRemoving(index);
    setTimeout(() => {
      removeFromCart(index);
      setRemoving(null);
    }, 320);
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>

        {/* ── Left Column ── */}
        <div className={styles.left}>

          {/* Title */}
          <div className={styles.header}>
            <h1 className={styles.title}>Your Cart</h1>
            {itemCount > 0 && (
              <span className={styles.countPill}>
                {itemCount} {itemCount === 1 ? "item" : "items"}
              </span>
            )}
          </div>

          {/* Free shipping bar */}
          {total > 0 && total < 75 && (
            <div className={styles.shippingBar}>
              <span className={styles.shippingText}>
                Add <strong>${remaining.toFixed(2)}</strong> more for free shipping
              </span>
              <div className={styles.progressTrack}>
                <div
                  className={styles.progressFill}
                  style={{ width: `${(total / 75) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* Free shipping unlocked */}
          {total >= 75 && total > 0 && (
            <div className={styles.shippingUnlocked}>
              🎉 You've unlocked <strong>free shipping!</strong>
            </div>
          )}

          {/* Empty state */}
          {cart.length === 0 ? (
            <div className={styles.empty}>
              <div className={styles.emptyIcon}>🛍️</div>
              <h2 className={styles.emptyTitle}>Your cart is empty</h2>
              <p className={styles.emptyText}>
                Browse our collection and add something you love.
              </p>
              <Link to="/" className={styles.shopBtn}>
                Start Shopping →
              </Link>
            </div>
          ) : (
            <ul className={styles.list}>
              {cart.map((item, index) => (
                <li
                  key={index}
                  className={`${styles.item} ${removing === index ? styles.removing : ""}`}
                >

                  {/* Image */}
                  <div className={styles.itemImg}>
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className={styles.itemImgSrc}
                      />
                    ) : (
                      <span className={styles.itemEmoji}>
                        {item.emoji ?? "📦"}
                      </span>
                    )}
                  </div>

                  {/* Info */}
                  <div className={styles.itemInfo}>
                    {item.category && (
                      <span className={styles.itemCategory}>
                        {item.category}
                      </span>
                    )}
                    <p className={styles.itemName}>{item.name}</p>
                    <p className={styles.itemPrice}>
                      ${(item.price * (item.qty ?? 1)).toFixed(2)}
                    </p>
                    {item.qty > 1 && (
                      <p className={styles.itemQty}>
                        ${item.price.toFixed(2)} × {item.qty}
                      </p>
                    )}
                  </div>

                  {/* Remove button */}
                  <button
                    className={styles.removeBtn}
                    onClick={() => handleRemove(index)}
                  >
                    <span className={styles.removeBtnIcon}>✕</span>
                    <span className={styles.removeBtnLabel}>Remove</span>
                  </button>

                </li>
              ))}
            </ul>
          )}

          {/* Continue shopping */}
          {cart.length > 0 && (
            <Link to="/" className={styles.continueShopping}>
              ← Continue Shopping
            </Link>
          )}

        </div>

        {/* ── Right Column: Order Summary ── */}
        {cart.length > 0 && (
          <aside className={styles.summary}>
            <h2 className={styles.summaryTitle}>Order Summary</h2>

            <div className={styles.summaryLines}>
              <div className={styles.summaryLine}>
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className={styles.summaryLine}>
                <span>Shipping</span>
                <span className={shipping === 0 ? styles.free : ""}>
                  {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className={styles.summaryLine}>
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
            </div>

            <div className={styles.totalRow}>
              <span>Total</span>
              <span>${grandTotal.toFixed(2)}</span>
            </div>

            <Link to="/checkout" className={styles.checkoutBtn}>
              Proceed to Checkout →
            </Link>

            <div className={styles.trustRow}>
              <span className={styles.trustItem}>🔒 Secure checkout</span>
              <span className={styles.trustItem}>↩ Free returns</span>
            </div>

          </aside>
        )}

      </div>
    </div>
  );
}

export default Cart;