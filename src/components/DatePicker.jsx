import { useState } from "react";

function DatePicker() {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  return (
    <div className="flex flex-row gap-3">
      <label>วันเริ่ม</label>
      <input type="date" onChange={(e) => setStart(e.target.value)} />

      <label>วันคืน</label>
      <input type="date" onChange={(e) => setEnd(e.target.value)} />
    </div>
  );
}

export default DatePicker;