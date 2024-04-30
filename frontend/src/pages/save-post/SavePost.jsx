import { memo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchLikedPost } from '../../services/post/fetchlikedPost'
import PostList from './components/PostList'
import RentalFilterList from './components/RentalFilterList'
import Loading from '../home/components/Loading'
import Pagination from './components/Pagination'

const SavePost = memo((props) => {
    const userToken = localStorage.getItem("token")
    const [ page, setPage ] = useState(1)
    const { isLoading, isFetching, error, data } = useQuery({
      queryKey: ["posts", "saved"],
      queryFn: () => fetchLikedPost({
        page: page,
        userToken: userToken
      }),
      refetchOnWindowFocus: false, // default: true
    })

    const TOTAL_PAGE = 5
    
    const gotoPage = (page) => {
      setPage(_ => {
        if(page <= 0) return 1;
        if(page > TOTAL_PAGE) return TOTAL_PAGE;
        return page;
      })
    }    

  
    return (
      <div className='grid grid-cols-[1.6fr_1fr] mx-auto w-full content-center max-w-[1200px] my-5'>
        {isFetching 
          ? <div className='min-h-screen text-center'><Loading /> </div>
          : <div className='flex flex-col items-center'>
              <PostList postsInfo={data?.result}/> 
              <Pagination 
                currentPage={page}
                totalPage={5}
                gotoPage={gotoPage}
              />
            </div>
          }
        {/* <RentalFilterList /> */}
      </div>
    );
});

export default SavePost
