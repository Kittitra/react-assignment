import React from 'react'

export const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div>
        <h3>Rental Shop</h3>
        <p>บริการให้เช่าสินค้าออนไลน์</p>
      </div>

      <div>
        <h4>เมนู</h4>
        <p>Home</p>
        <p>สินค้า</p>
        <p>ตะกร้า</p>
      </div>

      <div>
        <h4>ติดต่อ</h4>
        <p>Email: support@rental.com</p>
        <p>Tel: 012-345-6789</p>
      </div>
    </footer>
  )
}

const styles = {
  footer: {
    display: "flex",
    justifyContent: "space-around",
    padding: "20px",
    background: "#222",
    color: "#fff",
    marginTop: "40px",
  },
};

export default Footer;