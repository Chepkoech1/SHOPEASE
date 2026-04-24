import Cart from "../components/Cart";

function CartPage({ cart, removeFromCart }) {
  return <Cart cart={cart} removeFromCart={removeFromCart} />;
}

export default CartPage;