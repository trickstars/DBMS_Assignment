import { Link } from 'react-router-dom'
import { FaRegUser } from "react-icons/fa";

const RentalPost = ({_id, assets, title, createDateAgo, price, area, address, description, created_by, phone_num}) => {
    const isAuthenticated = (localStorage.getItem("token") != null)
  return (
    <Link to={`/post-detail/${_id}`}>
        <div className='flex items-center gap-5'>
            <div className='w-[250px] h-[250px] rounded-md overflow-hidden'>
                <img 
                    className='object-cover h-full w-full'
                    src={assets[0]} 
                    alt='house image' 
                />
            </div>
            <div className='w-[380px] flex flex-col gap-2'>
                <h5 className='font-semibold text-base'>{title}</h5>
                <p className='text-sm'>Đã đăng {createDateAgo}</p>
                <div className='flex items-center justify-between'>
                    <p className="font-semibold text-[#258635] text-sm">{Math.ceil(price/10000)/100} triệu/tháng</p>
                    <p className="text-sm">{area} <span className='font-semibold'>&#13217;</span>	</p>
                    <p className="text-sm">{address}</p>
                </div>
                <p className='break-words text-justify text-sm'>{description}</p>
                <div className='flex justify-between items-center'>
                    <div className="flex items-center gap-2 text-sm">
                        <FaRegUser />
                        <p>{created_by.full_name}</p>
                    </div>
                    {isAuthenticated &&
                        <div className="flex items-center gap-2">
                            <button className='bg-[#0891B2] text-white text-sm px-2 py-1 rounded-md'>Gọi {`0${phone_num}`} </button>
                            <button className='border-[#0891B2] border text-[#0891B2] text-sm px-2 py-1 rounded-md'>Nhắn Zalo </button>
                        </div>
                    }
                </div>
            </div>
        </div>
    </ Link>
  )
}

export default RentalPost
