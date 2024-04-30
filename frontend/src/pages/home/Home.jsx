import { memo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { PostFilterContextProvider } from '../../contexts/PostFilterContext';
import { usePostFilterContext } from '../../contexts/PostFilterContext';
import { fetchPost } from '../../services/post/fetchPost';
import PostList from './components/PostList';
import RentalFilterList from './components/RentalFilterList';
import Pagination from './components/Pagination';
import FilterBar from './components/FilterBar';
import Loading from './components/Loading';

const Home = memo(() => {
  const { filterValue } = usePostFilterContext()
  const userToken = localStorage.getItem("token")
  const { isLoading, isFetching, error, data } = useQuery({
    queryKey: ['posts'],
    queryFn: async () =>
      await fetchPost({
        page: filterValue?.page,
        priceMin: filterValue?.price.minValue,
        priceMax: filterValue?.price.maxValue,
        areaMin: filterValue?.area.minValue,
        areaMax: filterValue?.area.maxValue,
        type: filterValue.type,
        token: userToken
      }),
      refetchOnWindowFocus: false
    // async () => {
    //   const data = await fetch(`https://bkhostel.hcmut.tech/posts?page=${page}`)
    //   .then(res => res.json())
    //   .then(data => data)
    //   return data
    // }
  });


  
  const TOTAL_PAGE = 5
  const [ page, setPage ] = useState(1)
  
  const gotoPage = (page) => {
    setPage(_ => {
      if(page <= 0) return 1;
      if(page > TOTAL_PAGE) return TOTAL_PAGE;
      return page;
    })
  }



  return (
    <div className="w-full mt-8 flex flex-col items-center min-h-screen">
      <FilterBar />

        <div className='grid grid-cols-[1.6fr_1fr] mx-auto w-full  max-w-[1200px] content-center'>
          {isFetching 
          ? 
            <div className="flex flex-col gap-4 px-3 py-3 border border-gray-300 rounded-md h-[200px] ">
              <Loading /> 
            </div>

          : 
          <PostList 
            postsInfo={data?.result}
            totalPost={data?.totalPosts}
          /> 
          }
          <RentalFilterList />
          <Pagination 
            currentPage = {filterValue.page} 
            totalPage = {5}
            gotoPage = {gotoPage}
          />
        </div>
    </div>
  );
});

export default Home;
