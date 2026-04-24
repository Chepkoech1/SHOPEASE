import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Checkout.module.css";

function Checkout({ cart }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "", email: "",
    address: "", city: "", zip: "",
    card: "", expiry: "", cvv: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * (item.qty ?? 1), 0);
  const shipping = total >= 75 ? 0 : 9.95;
  const tax = total * 0.08;
  const grandTotal = total + shipping + tax;

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  /* ── Success screen ── */
  if (submitted) {
    return (
      <div className={styles.page}>
        <div className={styles.success}>
          <div className={styles.successIcon}>🎉</div>
          <h1 className={styles.successTitle}>Order Confirmed!</h1>
          <p className={styles.successText}>
            Thank you for your purchase. Your order is being prepared
            and will be shipped within 1–2 business days.
          </p>
          <button
            className={styles.backBtn}
            onClick={() => navigate("/")}
          >
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Checkout</h1>

      <div className={styles.container}>

        {/* ── Left: Form ── */}
        <div>

          {/* Contact */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Contact Information</h2>
            <div className={styles.row}>
              <div className={styles.group}>
                <label className={styles.label}>Full Name</label>
                <input
                  className={styles.input}
                  name="name"
                  placeholder="Jane Smith"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.group}>
                <label className={styles.label}>Email</label>
                <input
                  className={styles.input}
                  name="email"
                  placeholder="jane@example.com"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Shipping */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Shipping Address</h2>
            <div className={styles.group}>
              <label className={styles.label}>Street Address</label>
              <input
                className={styles.input}
                name="address"
                placeholder="123 Maple Street"
                value={form.address}
                onChange={handleChange}
              />
            </div>
            <div className={styles.row}>
              <div className={styles.group}>
                <label className={styles.label}>City</label>
                <input
                  className={styles.input}
                  name="city"
                  placeholder="New York"
                  value={form.city}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.group}>
                <label className={styles.label}>ZIP Code</label>
                <input
                  className={styles.input}
                  name="zip"
                  placeholder="10001"
                  value={form.zip}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Payment Details</h2>
            <div className={styles.group}>
              <label className={styles.label}>Card Number</label>
              <input
                className={styles.input}
                name="card"
                placeholder="•••• •••• •••• ••••"
                value={form.card}
                onChange={handleChange}
              />
            </div>
            <div className={styles.row}>
              <div className={styles.group}>
                <label className={styles.label}>Expiry</label>
                <input
                  className={styles.input}
                  name="expiry"
                  placeholder="MM / YY"
                  value={form.expiry}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.group}>
                <label className={styles.label}>CVV</label>
                <input
                  className={styles.input}
                  name="cvv"
                  placeholder="•••"
                  value={form.cvv}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

        </div>

        {/* ── Right: Order Summary ── */}
        <aside className={styles.summary}>
          <h2 className={styles.summaryTitle}>Order Summary</h2>

          {/* List of items */}
          {cart.map((item, i) => (
            <div key={i} className={styles.summaryItem}>
              <span className={styles.summaryItemName}>
                {item.name} × {item.qty ?? 1}
              </span>
              <span>${(item.price * (item.qty ?? 1)).toFixed(2)}</span>
            </div>
          ))}

          <hr className={styles.divider} />

          {/* Subtotal, shipping, tax */}
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

          <hr className={styles.divider} />

          {/* Total */}
          <div className={styles.totalRow}>
            <span>Total</span>
            <span>${grandTotal.toFixed(2)}</span>
          </div>

          {/* Place order button */}
          <button className={styles.submitBtn} onClick={handleSubmit}>
            Place Order →
          </button>

          {/* Trust badges */}
          <div className={styles.trustRow}>
            <span className={styles.trustItem}>🔒 Secure</span>
            <span className={styles.trustItem}>↩ Free returns</span>
            <span className={styles.trustItem}>📦 Fast shipping</span>
          </div>

        </aside>
      </div>
    </div>
  );
}

export default Checkout;


