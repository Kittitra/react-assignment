import api from "./axiosConfig";
// =======================
//  GET ALL RENTALS
// =======================
export const getRentalItems = async () => {
  try {
    const res = await api.get("/rental_item.php");

    if (res.status !== 200) {
      throw new Error("Failed to fetch rentals");
    }

    return res.data;

  } catch (err) {
    console.error("Get Rentals Error:", err.message);
    throw err;
  }
};


// =======================
//  GET ITEMS IN RENTAL
// =======================
export const getRentalItem = async (rentalId) => {
  try {
    const res = await api.get(`/rental_item.php/${rentalId}`);
    return res.data;
  } catch (err) {
    console.error("Get Rental Items Error:", err);
    throw err;
  }
};
