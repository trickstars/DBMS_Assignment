import { createContext, useContext, useState } from "react";

const defaultFilterValue = {
    page: 1,
    set: false,
    type: null,
    price: {
        selectedText: "",
        minValue: null,
        maxValue: null
    },
    area: {
        selectedText: "",
        minValue: null,
        maxValue: null
    }
}

const PostFilterContext = createContext(null)

export const usePostFilterContext = () => useContext(PostFilterContext)

export const PostFilterContextProvider = ({children}) => {
    const [filterValue, setFilterValue] = useState(defaultFilterValue)
    const [activeTab, setActiveTab] = useState(3);
    const updateFilterValue = ({key, value}) => {
        if(key !== "page") {
            setFilterValue(filter => ( {...filter, ...{[key]: value, set: true}}))
        } else { // navigate page dont't set any filter option
            setFilterValue(filter => ( {...filter, ...{[key]: value}}))
        }
    }

    const resetFilter = () => {
        setFilterValue(_ => ({...defaultFilterValue}))
    }
    const updateActiveTab = (activeValue) => {
        setActiveTab((prev) => activeValue);
        console.log(`updated active tab = ${activeTab}`);
    }
    return (
        <PostFilterContext.Provider value={{filterValue, updateFilterValue, resetFilter,activeTab, updateActiveTab}}>
            {children}
        </PostFilterContext.Provider>
    )
}