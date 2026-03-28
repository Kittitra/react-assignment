import React from 'react'

export const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div>
        <h3>Rental Shop</h3>
        <p>บริการให้เช่าสินค้าออนไลน์</p>
      </div>
    </footer>
  )
}

const styles = {
  footer: {
    display: "flex",
    justifyContent: "start",
    padding: "20px",
    background: "#222",
    color: "#fff",
    marginTop: "40px",
  },
};

export default Footer;