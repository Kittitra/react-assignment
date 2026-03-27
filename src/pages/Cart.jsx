import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Cart() {
  const { cart, removeFromCart } = useContext(CartContext);

  return (
    <div>
      <h2>ตะกร้า</h2>

      {cart.map((item) => (
        <div key={item.id}>
          <p>{item.name}</p>
          <button onClick={() => removeFromCart(item.id)}>
            ลบ
          </button>
        </div>
      ))}
    </div>
  );
}

export default Cart;