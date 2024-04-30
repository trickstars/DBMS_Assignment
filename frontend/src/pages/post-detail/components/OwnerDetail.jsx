import { useState } from 'react'
import { FaRegUserCircle } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { useMutation } from '@tanstack/react-query';
import zaloSrc from "../../../assets/images/footer/zalo.png"
import { likePost } from '../../../services/post/likePost';
import { IoMdHeartEmpty } from "react-icons/io";
import { IoHeartSharp } from "react-icons/io5";
import { useParams } from 'react-router-dom';

const OwnerDetail = ({owner, isLiked, phoneNumber}) => {
    const [liked, setLiked] = useState(false)
    const { id: postId } = useParams()
    const userToken = localStorage.getItem("token")
    const isAuthenticated = (localStorage.getItem("token") != null)

    const likePostMutation = useMutation({
        mutationFn: () => likePost(userToken, postId),
        onSuccess: data => {
            setLiked(true)
        }
    })

    const onPostLike = () => {
        if(userToken != null) {
            likePostMutation.mutate()
        }
    }

    return (
        <div className='flex flex-col items-center gap-4 px-3 py-4 border border-gray-300 rounded-md h-fit bg-[#FEBB02] ml-10 '>
            <div className='flex flex-col items-center gap-1 mb-2'>
                <FaRegUserCircle className='w-[48px] h-[45px] text-white' />
                <p className='text-base font-semibold'>{owner.full_name}</p>
            </div>

            <button className='flex items-center gap-2 justify-center rounded-md px-2 py-2 bg-[#13BB7B] w-full max-w-[250px]'>
                <FaPhone className='text-white'/>
                <p className='text-sm  font-semibold'>{isAuthenticated && `0${phoneNumber}`}</p>
            </button>
            <button className='flex items-center gap-2 justify-center rounded-md px-2 py-2 bg-white w-full max-w-[250px]'>
                <img src={zaloSrc} alt='zalo' className='w-[20px] h-20px'/>
                <p className='text-sm  font-semibold'>Nhắn Zalo</p>
            </button>
            <button 
                onClick={onPostLike}
                className= {(isLiked || liked)
                    ? 'flex items-center gap-2 justify-center rounded-md px-2 py-2 bg-white w-full max-w-[250px] text-[#EE664C]'
                    : 'flex items-center gap-2 justify-center rounded-md px-2 py-2 bg-white w-full max-w-[250px] hover:text-[#EE664C]'

                }
            >
                {(isLiked || liked)
                ? <IoHeartSharp className='w-[20px] h-[20px]' />
                : <IoMdHeartEmpty className='w-[20px] h-[20px] '/>
                }
                <p className='text-sm font-semibold'>
                    Yêu thích tin
                </p>
            </button>
        </div>
    )
}

export default OwnerDetail
