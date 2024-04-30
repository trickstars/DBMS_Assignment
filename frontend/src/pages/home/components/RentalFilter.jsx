import { IoIosArrowForward } from "react-icons/io";
import { useQuery } from "@tanstack/react-query";
import { usePostFilterContext } from "../../../contexts/PostFilterContext";

const RentalFilter = ({title, options, type, cols=1}) => {
  const { refetch } = useQuery({
    queryKey: ["posts"],
    enabled: false,
    refetchOnWindowFocus: false
  })
  


  const { filterValue, updateFilterValue } = usePostFilterContext()

  const onFilter = (type, option) => {
    // update filter option
    updateFilterValue({
      key: type, 
      value: {
        selectedText: option.text, 
        minValue: option.minValue, 
        maxValue: option.maxValue
      }
    })
    // refetch on page 1
    updateFilterValue({
      key: "page", 
      value: 1
    })
    setTimeout(() => refetch(), 100)
  }

  return (
    <div className="border border-gray-300 rounded-md  px-3 py-2">
        <h5 className='mb-2 text-base font-semibold'>
        {title}
        </h5>
        <ul className={`list-none grid grid-cols-${cols} gap-2`}>
            {options.map((option, i) => (
                <li 
                  className='flex items-center gap-1 hover:text-[#0891B2] hover: cursor-pointer' 
                  key={i}
                  onClick={() => onFilter(type, option)}
                >
                    <IoIosArrowForward />
                    <p className={option.text !== filterValue[type].selectedText ? "text-sm" : "text-sm text-[#0891B2]" }>
                      {option.text}
                    </p>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default RentalFilter
