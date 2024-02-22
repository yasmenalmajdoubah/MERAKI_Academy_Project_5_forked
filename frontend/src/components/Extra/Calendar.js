import { useState } from "react";
import Calendar from "react-calendar";
// import 'react-calendar/dist/Calendar.css';
/* type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];
 */
export default function MyApp() {
  //   const [value, onChange] = useState<Value>(new Date());

  return (
    <div>
      <Calendar
        /*  onChange={onChange} value={value} */ className="bg-sky-500 text-white w-80 rounded-md shadow-2xl p-4"
      />
    </div>
  );
}
