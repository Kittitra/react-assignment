import { useContext, useMemo } from "react";
import { CartContext } from "../context/CartContext";

function CartItem({ item }) {
  const { removeFromCart } = useContext(CartContext);

  // คำนวณจำนวนวัน
  const rentalDays = useMemo(() => {
    const start = new Date(item.startDate);
    const end = new Date(item.endDate);

    const diff = end - start;
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

    return days > 0 ? days : 1;
  }, [item.startDate, item.endDate]);

  // คำนวณราคารวม
  const totalPrice = useMemo(() => {
    return rentalDays * item.price;
  }, [rentalDays, item.price]);

  return (
    <div style={styles.card}>
      <img src={item.image} alt="" style={styles.image} />

      <div style={styles.info}>
        <h3>{item.name}</h3>

        <p>ราคา: {item.price} บาท/วัน</p>

        <p>
          วันที่เช่า: {item.startDate} → {item.endDate}
        </p>

        <p>จำนวนวัน: {rentalDays} วัน</p>

        <h4>รวม: {totalPrice} บาท</h4>

        <button
          style={styles.btn}
          onClick={() => removeFromCart(item.id)}
        >
          ลบออก
        </button>
      </div>
    </div>
  );
}

const styles = {
  card: {
    display: "flex",
    gap: "20px",
    border: "1px solid #ccc",
    padding: "15px",
    marginBottom: "15px",
    borderRadius: "10px",
  },
  image: {
    width: "120px",
    height: "120px",
    objectFit: "cover",
  },
  info: {
    flex: 1,
  },
  btn: {
    marginTop: "10px",
    background: "red",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    cursor: "pointer",
  },
};

export default CartItem;