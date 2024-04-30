import React from 'react';
import { BsHouse } from 'react-icons/bs';
import { IoSearch } from 'react-icons/io5';
import { ImCoinPound } from 'react-icons/im';
import { FaRegSquare } from 'react-icons/fa';
import { TiDeleteOutline } from 'react-icons/ti';
import { useQuery } from '@tanstack/react-query';
import { areaFilter, priceFilter, postTypeFilter } from './constant';
import FilterSelect from './FilterSelect';
import { usePostFilterContext } from '../../../contexts/PostFilterContext';

const FilterBar = () => {
  const { filterValue, resetFilter, updateFilterValue } = usePostFilterContext();
  const { refetch } = useQuery({
    queryKey: ['posts'],
    enabled: false,
  });

  const onRefresh = () => {
    resetFilter();
    setTimeout(() => refetch(), 100);
  };

  const applyMultiFilter = () => {
    updateFilterValue({
      key: "page",
      value: 1
    })
    setTimeout(() => refetch(), 100)
  }
  return (
    <ul className=" list-none w-full bg-[#0891B2] max-w-[1200px] my-2 py-2 px-2 border border-slate-300 rounded-md flex items-center gap-6">
      <li className="flex items-center gap-2 bg-white rounded-md px-2 py-1">
        <BsHouse />
        <p className="text-sm font-semibold">Tp.HCM</p>
      </li>
      <FilterSelect
        CategoryIcon={<BsHouse />}
        type={postTypeFilter.type}
        category={postTypeFilter.title}
        options={postTypeFilter.options}
      />
      <FilterSelect
        CategoryIcon={<FaRegSquare />}
        type={areaFilter.type}
        category={areaFilter.title}
        options={areaFilter.options}
      />
      <FilterSelect
        CategoryIcon={<ImCoinPound />}
        type={priceFilter.type}
        category={priceFilter.title}
        options={priceFilter.options}
      />

      <div className="ml-auto flex items-center gap-6">
        {filterValue?.set && (
          <button
            className="flex items-center gap-2 bg-white rounded-md px-2 py-1 cursor-pointer hover:text-red-500"
            onClick={onRefresh}
          >
            <TiDeleteOutline />
            <p className="text-sm font-semibold">Làm mới</p>
          </button>
        )}
        <button
          disabled={!filterValue?.set} // disable search if no filter applied
          className="flex items-center gap-2 bg-white rounded-md px-2 py-1 cursor-pointer"
          onClick={applyMultiFilter}
        >
          <IoSearch />
          <p className="text-sm font-semibold">Tìm kiếm</p>
        </button>
      </div>
    </ul>
  );
};

export default FilterBar;
