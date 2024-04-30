import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query';
import RentalDetail from './components/RentalDetail'
import OwnerDetail from './components/OwnerDetail'
import Loading from '../home/components/Loading';
import { fetchPostDetail } from '../../services/post/fetchPostDetail';

const PostDetail = () => {
    const { id } = useParams()
    const userToken = localStorage.getItem("token")
    const {data: rentalDetail, isFetching} = useQuery({
        queryKey: ["post", id],
        queryFn: async () => await fetchPostDetail(id, userToken),
        refetchOnWindowFocus: false
    })

    console.log(rentalDetail)

    if(isFetching) return <div className='min-h-screen'><Loading /></div>

    return (
        <div className='grid grid-cols-[1.6fr_1fr] mx-auto w-full content-center max-w-[1200px] my-5'>
            <RentalDetail {...rentalDetail} />
            <OwnerDetail owner={rentalDetail?.created_by} isLiked={rentalDetail?.is_favorite} phoneNumber={rentalDetail?.phone_num} />
        </div>
    )
}

export default PostDetail;