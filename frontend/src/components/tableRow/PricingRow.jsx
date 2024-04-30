/* eslint-disable react/prop-types */
import { memo } from "react";
import { BsFillTrash3Fill } from "react-icons/bs";
import { BiSolidDetail } from "react-icons/bi";

// eslint-disable-next-line react/display-name, react/prop-types
const PricingRow = memo(({ handleDelete, rowItem, handleModify }) => {
  return (
    <div className="grid grid-cols-16 py-2">
      <div className="col-span-1">{rowItem.stt}</div>
      <div className="col-span-3">{String.fromCharCode(rowItem.category+64)}</div>
      <div className="col-span-3">{rowItem.daily_price}</div>
      <div className="col-span-3">{rowItem.monthly_price}</div>
      <div className="col-span-3">{rowItem.weekly_price}</div>
      <div className="col-span-3 flex justify-center">
        <BiSolidDetail
          className="mr-1 md:mr-2 lg:mr-4 w-6 h-6 cursor-pointer hover:scale-105 hover:text-[rgb(57,197,200)]"
          onClick={() => handleModify(rowItem._id)}
        />
        <BsFillTrash3Fill
          onClick={() => handleDelete(rowItem._id)}
          className="w-6 h-6 cursor-pointer hover:scale-105 hover:text-[rgb(57,197,200)]"
        />
      </div>
    </div>
  );
});

export default PricingRow;
