import axios from "axios";

const API_URL = "/api/product.php";

// 🔹 ดึงสินค้าทั้งหมด
export async function getProducts() {
  try {
    const res = await axios.get(API_URL);

    // axios ใช้ data ตรง ๆ
    return res.data;

  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

// ดึงสินค้า 1 ชิ้น
export async function getProductById(id) {
  try {
    const res = await axios.get(`${API_URL}?id=${id}`);

    if (res.status !== 200) {
      throw new Error("Failed to fetch product");
    }

    return res.data;

  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}