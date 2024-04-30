import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { usePostFilterContext } from "../../../contexts/PostFilterContext";


const FilterSelect = ({CategoryIcon, type, category, options=[]}) => {
    const { filterValue, updateFilterValue } = usePostFilterContext()
    const [displayedFilter, setDisplayedFilter] = useState(type)
    const [expanded, setExpanded] = useState(false)

    
    const toggleExpanded = () => {setExpanded(prev => !prev)}
    
    const onSelect = (value, displayedFilter) => {
        setExpanded(false)
        setDisplayedFilter(displayedFilter)
        updateFilterValue({key: type, value: value})
    }

    return (
        <div className="relative min-w-[200px]"
        >
            <li 
                className="flex items-center justify-center gap-2 bg-white rounded-md px-2 py-1 cursor-pointer"
                onClick={toggleExpanded}
            >
                {CategoryIcon}
                <p className="text-sm font-semibold">
                    {filterValue[type]?.selectedText !== ""
                     ? filterValue[type]?.selectedText
                     : category}
                </p>
                {expanded ? <IoIosArrowDown /> : <IoIosArrowForward />}
            </li>
            {expanded && 
                <ul className="absolute top-[40px] bg-[#0891B2] w-full rounded-md border border-slate-300">
                {options.map((op, i) => 
                    <li 
                        className="py-1 text-center text-sm font-semibold cursor-pointer hover:text-white"
                        key={i}
                        onClick={() => {
                            onSelect({minValue: op.minValue, maxValue: op.maxValue, selectedText: op.text}, op.text)}
                        }
                    >
                        {op.text}
                    </li>
                )}
                </ul>
            }
        </div>
    )
}

export default FilterSelect
