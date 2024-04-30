import React from 'react'
import { CiLocationOn, CiClock1 } from "react-icons/ci";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { MdOutlineOtherHouses } from "react-icons/md";
import { BiCategoryAlt } from "react-icons/bi";
import MapLocation from './MapLocation';


const RentalDetail = ({
    assets, 
    title, 
    full_address : address,
    price,
    area, 
    type,
    postDate, 
    desc, 
    phone_num,
    created_by: owner, 
    location = {lat: 10.734363531931315, lng: 106.72015766304695}
}) => {
    const isAuthenticated = (localStorage.getItem("token") != null)
    return (
        <div className="flex flex-col gap-4 px-3 py-3 border border-gray-300 rounded-md h-fit">
            <div className='w-4/5 h-[350px] self-center overflow-hidden rounded-md my-2'>
                <img src={assets[0]} alt="house image" className='w-full h-full'/>
            </div>
            <p className='text-2xl text-[#E13427] font-semibold'>{title}</p>
            <div className='flex items-center gap-1'>
                <CiLocationOn />
                <p className='text-sm'>Địa chỉ: {`${address.district}, ${address.ward}, ${address.street_address}`}</p>
            </div>
            <div className='flex items-center gap-1'>
                <BiCategoryAlt />
                <p className='text-sm'>Loại tin: {type}</p>
            </div>
            <div className='flex items-center gap-4 mb-2'>
                <div className='flex items-center gap-1'>
                    <RiMoneyDollarCircleLine className='text-[#258635]'/>
                    <p className='text-sm text-[#258635] font-semibold'>
                        {Math.ceil(price/10000)/100} triệu/tháng
                    </p>
                </div>
                <div className='flex items-center gap-1'>
                    <MdOutlineOtherHouses />
                    <p className="text-sm">{area} <span className='font-semibold'>&#13217;</span>	</p>
                </div>
                <div className='flex items-center gap-1'>
                    <CiClock1 />
                    <p className="text-sm">{postDate}</p>
                </div>
            </div>
            
            <div className='mb-3'>
                <p className='text-lg font-semibold mb-2'>Thông tin mô tả</p>
                <p className='text-sm'>{desc}</p>
            </div>

            <div className='mb-3'>
                <p className='text-lg font-semibold mb-2'>Thông tin liên hệ</p>
                <div className='grid grid-cols-2  w-1/2 text-sm'>
                    <div>Liên hệ</div>
                    <div>{owner.full_name}</div>
                </div>
                <div className='bg-gray-300 w-4/5 h-[0.5px] my-2'/>
                <div className='grid grid-cols-2  w-1/2 text-sm'>
                    <div>Số điện thoại</div>
                    <div>{isAuthenticated && `0${phone_num}`}</div>
                </div>
                <div className='bg-gray-300 w-4/5 h-[0.5px] my-2'/>
                <div className='grid grid-cols-2  w-1/2 text-sm'>
                    <div>Zalo</div>
                    <div>{isAuthenticated && `0${phone_num}`}</div>
                </div>
            </div>

            <div className='mb-3'>
                <p className='text-lg font-semibold mb-2'>Bản đồ</p>
                <MapLocation location={location} address={address}/>
            </div>
        </div>
    )
}

export default RentalDetail
