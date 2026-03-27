import { useState } from "react";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Register:", form);
    alert("สมัครสมาชิกสำเร็จ");
  };

  return (
    <div>
      <h2>สมัครสมาชิก</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="ชื่อ"
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="อีเมล"
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="รหัสผ่าน"
          onChange={handleChange}
        />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;