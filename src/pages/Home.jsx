import { useState } from "react";
import ProductCard from "../components/ProductCard";
import PRODUCTS from "../data/products.js";
import styles from "../styles/Home.module.css";

const CATEGORIES = ["All", ...new Set(PRODUCTS.map((p) => p.category))];

function Home({ addToCart }) {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("featured");

  const visible = PRODUCTS
    .filter((p) =>
      (category === "All" || p.category === category) &&
      p.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "rating") return b.rating - a.rating;
      return 0;
    });

    return (
    <div className={styles.page}>

      {/* Search + Sort row */}
      <div className={styles.toolbar}>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.search}
        />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className={styles.sort}
        >
          <option value="featured">Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
        </select>
      </div>

      {/* Category filter buttons */}
      <div className={styles.categories}>
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`${styles.catBtn} ${category === c ? styles.active : ""}`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Product grid */}
      <div className={styles.grid}>
        {visible.map((product) => (
          <ProductCard key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>

    </div>
  );
}
export default Home;