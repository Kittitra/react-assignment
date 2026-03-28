import api from "./axiosConfig";

// =======================
//  GET ALL RENTALS
// =======================
export const getRentals = async () => {
  try {
    const res = await api.get("/rental.php");

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
export const getRental = async (rentalId) => {
  try {
    const res = await api.get(`/rental.php/items/${rentalId}`);
    return res.data;
  } catch (err) {
    console.error("Get Rental Items Error:", err);
    throw err;
  }
};


// =======================
// CREATE RENTAL
// =======================
export const createRental = async (data) => {
  try {
    const res = await api.post("/rental.php", data);
    return res.data;
  } catch (err) {
    console.error("Create Rental Error:", err);
    throw err;
  }
};


// =======================
//  RETURN RENTAL
// =======================
export const returnRental = async (rentalId) => {
  try {
    const res = await api.put(`/rental.php/return/${rentalId}`);
    return res.data;
  } catch (err) {
    console.error("Return Rental Error:", err);
    throw err;
  }
};