import React from 'react'
import heartSrc from '../../../assets/images/heart/heart.png'

const EmptySection = () => {
  return (
    <div className='flex flex-col items-center mb-2 w-[600px]'>
        <div className='w-[150px] h-[150px]'>
            <img className='object-cover' src={heartSrc}/>
        </div>
        <p className='text-base text-[#0e0909]'>Danh sách rỗng</p>
    </div>
  )
}

export default EmptySection
