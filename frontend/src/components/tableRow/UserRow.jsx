/* eslint-disable react/prop-types */
import { memo } from "react";
import { BsFillTrash3Fill } from "react-icons/bs";
import { BiSolidDetail } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/display-name, react/prop-types
const PricingRow = memo(({ rowItem, handleDeletedItem }) => {
  const handleDelete = (e,id)=>{
    e.stopPropagation();
    handleDeletedItem(id);
  }
  const navigate = useNavigate();
  return (
    <div
      className="grid grid-cols-16 py-2 hover:bg-blue-100 hover:rounded-lg cursor-pointer text-lg"
      onClick={()=>{navigate("../admin/user",{state:rowItem._id})}}
    >
      <div className="col-span-1">{rowItem.id}</div>
      <div className="col-span-4 text-left">{rowItem.full_name}</div>
      <div className="col-span-4 text-left">{rowItem.username}</div>
      <div className="col-span-3 truncate text-left">{rowItem.email}</div>
      <div className="col-span-1">{rowItem.role}</div>
      <div className="col-span-1 text-center">
        {" "}
        <span
          className={`${
            rowItem.status === "ACTIVE" ? "bg-[#05D34E]" : "bg-[#D60409]"
          } text-white text-sm md:px-2 lg:px-3 inline-block rounded-xl capitalize`}
        >
          {rowItem.status}
        </span>
      </div>
      <div className="col-span-2 flex justify-center">
        <BiSolidDetail
          className="mr-1 md:mr-2 lg:mr-4 w-6 h-6 cursor-pointer hover:scale-105 hover:text-[rgb(57,197,200)]"
          onClick={()=>{navigate("../admin/user",{state:rowItem._id})}}
        />
        <BsFillTrash3Fill
          onClick={(e) => {handleDelete(e,rowItem._id)}}
          className="w-6 h-6 cursor-pointer hover:scale-105 hover:text-[rgb(57,197,200)]"
        />
      </div>
    </div>
  );
});

export default PricingRow;
