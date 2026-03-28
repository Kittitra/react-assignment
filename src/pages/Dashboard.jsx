

function Dashboard() {
  // const { user, logout } = useContext(AuthContext);

  // if (!user) {
  //   return <h2>กรุณาเข้าสู่ระบบ</h2>;
  // }

  return (
    <div>
      <h2>Dashboard</h2>

{/* 
      <p>ยินดีต้อนรับ: {user.email}</p>

      <button onClick={logout}>Logout</button> */}

      <hr />

      <h3>รายการเช่าของคุณ</h3>

      {/* mock data */}
      <ul>
        <li>Camera - 3 วัน</li>
        <li>Tripod - 5 วัน</li>
      </ul>
    </div>
  );
}

export default Dashboard;