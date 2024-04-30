import axios from 'axios';
import {useState, useEffect} from 'react';
const baseURL = import.meta.env.VITE_BACKEND_API + '/users';

const EditProfile = (props) => {
    // eslint-disable-next-line react/prop-types
    const action = props.action
    // eslint-disable-next-line react/prop-types
    const config = props.config

    const [profile, setProfile] = useState({
        "username": "",
        "password": "",
        "role": "USER",
        "status": "ACTIVE",
        "email": "",
        "full_name": "",
        "phone": "",
        "avatar": "",
    });

    const [phoneVisible, setPhoneVisible] = useState(true)
    const [avatar, setAvatar] = useState("")
    const [isSuccess, setIsSuccess] = useState(false)

    const handleFileRead = async (event) => {
        const file = event.target.files[0]
        const base64 = await convertBase64(file)
        console.log(base64)
        document.getElementById("avatar-img").src = URL.createObjectURL(file)
        document.getElementById("avatar-hidden").value = base64
        setAvatar(base64)
    }

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file)
        fileReader.onload = () => {
            resolve(fileReader.result);
        }
        fileReader.onerror = (error) => {
            reject(error);
        }
        })
    }
    const handleSubmit = (e) => {
        setIsSuccess(false);
        e.preventDefault()
        const userData = {
            username: e.target.username.value,
            full_name: e.target.full_name.value,
            phone: e.target.phone.value,
            email: e.target.email.value,
            avatar: avatar,
        }

        editUser(userData)
    }

    const getUser = async () => {
        console.log("get User")
        try {
            await axios.get(`${baseURL}/`, {headers: config}).then(res => setProfile(res.data));
        } catch (error) {
            const customError = new Error();
            customError.message = error.response.data.message;
            console.log(customError.message);
            throw customError;
        }

    };

    const editUser = async (userData) => {
        console.log(userData);
        try {
          await axios.post(`${baseURL}/edit`, userData, {headers: config}).then(res => setProfile(res.data.user))
          setIsSuccess(true);


        } catch (error) {
          const customError = new Error();
          customError.message = error.response.data.message;
          console.log(customError.message);
          throw customError;
        }
      };

    useEffect(() => {
        getUser();
    }, [])
    return (

            <div className="flex flex-col row-start-1 row-span-7 col-start-3 col-span-6 ml-5">
                <div className="py-4 mt-6 border-b border-gray rounded-md h-fit text-3xl font-bold">
                    Chỉnh sửa thông tin cá nhân
                </div>
                    <form id="form1" className="my-10 mr-10" onSubmit={handleSubmit}>
                            <div className="items-center flex justify-between mt-8">
                                <label className="inline-block [font-family:'Poppins-Medium',Helvetica] font-medium text-black text-lg tracking-[0] leading-[normal]" htmlFor="email">Email</label>
                                <input className="px-3 inline-block float-right w-3/4 h-10 outline-none rounded-[4px] border border-solid border-[#cccccc]" type="text" defaultValue={profile.email} id="email" name="email"/>
                            </div>

                            <div className="items-start flex justify-between mt-8">
                                <label className="inline-block [font-family:'Poppins-Medium',Helvetica] font-medium text-black text-lg tracking-[0] leading-[normal]" htmlFor="phone">Số điện thoại</label>
                                <input className={phoneVisible?"px-3 inline-block float-right w-3/4 h-10 outline-none bg-[#F3F4FF] rounded-[4px] border border-solid border-[#cccccc]":"px-3 inline-block float-right w-3/4 h-10 outline-none bg-[#ffff] rounded-[4px] border border-solid border-[#cccccc]"} type="text" disabled={phoneVisible} defaultValue={profile.phone} id="phone" name="phone"/>
                            </div>

                            <div className="items-start flex justify-between mt-4">
                                <div className="inline-block"></div>
                                <button type='button' onClick={() => setPhoneVisible(!phoneVisible)}  className="text-[#0000ff] float-right w-3/4 text-left">Đổi số điện thoại</button>
                            </div>

                            <div className="items-start flex justify-between mt-8">
                                <label className="inline-block [font-family:'Poppins-Medium',Helvetica] font-medium text-black text-lg tracking-[0] leading-[normal]" htmlFor="username">Tên hiển thị</label>
                                <input className="px-3 inline-block float-right w-3/4 h-10 outline-none rounded-[4px] border border-solid border-[#cccccc]" type="text" defaultValue={profile.username} id="username" name="username"/>
                            </div>

                            <div className="items-start flex justify-between mt-8">
                                <label className="inline-block [font-family:'Poppins-Medium',Helvetica] font-medium text-black text-lg tracking-[0] leading-[normal]" htmlFor="full_name">Họ và tên</label>
                                <input className="px-3 inline-block float-right w-3/4 h-10 outline-none rounded-[4px] border border-solid border-[#cccccc]" type="text" defaultValue={profile.full_name}  id="full_name" name="full_name"/>
                            </div>

                            <div className="items-start flex justify-between mt-8">
                                <label className="inline-block [font-family:'Poppins-Medium',Helvetica] font-medium text-black text-lg tracking-[0] leading-[normal]" htmlFor="password">Mật khẩu </label>
                                <input className="px-3 inline-block float-right w-3/4 h-10 outline-none bg-[#F3F4FF] rounded-[4px] border border-solid border-[#cccccc]" type="password" disabled defaultValue={profile.password} id="password" name="password"/>
                            </div>

                            <div className="items-start flex justify-between mt-4">
                                <div className="inline-block"></div>
                                <button type='button' onClick={() => action()} className="text-[#0000ff] float-right w-3/4 text-left">Đổi mật khẩu</button>
                            </div>

                            <div className="items-start flex justify-between mt-8">
                                <label className="inline-block [font-family:'Poppins-Medium',Helvetica] font-medium text-black text-lg tracking-[0] leading-[normal]" htmlFor="avatar">Ảnh đại diện</label>
                                <div className="inline-block float-right w-3/4 ">
                                    <img src={profile.avatar} alt="avatar" id="avatar-img" className="w-48"/>
                                </div>
                            </div>

                            <div className="items-start flex justify-between mt-4">
                                <div className="inline-block"></div>
                                <div className="float-right w-3/4 ">
                                    <input id="file" encType="multipart/form-data" type="file" name="file" onChange={e => handleFileRead(e)} />
                                    <input id="avatar-hidden" className='hidden' type="text" name="avatar" value={avatar}/>
                                    {/* <a href="#" className="text-[#000] px-8 mr-4 border-solid border border-[#cccccc] bg-[#f5f4f3]">Chọn file</a>
                                    <span>avatar.png</span> */}
                                </div>
                            </div>

                            <button type="submit" className='justify-center items-center w-full rounded-md px-3 py-3 mt-8 mb-16 bg-[#0000FF]'>
                                <p className='text-sm text-white font-semibold'>Cập nhật</p>
                            </button>


                            <div id="alert-3" className={isSuccess? " border-4 border-green-300 flex items-center p-4 mb-4 text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400": "hidden"} role="alert">
                                <div className="ms-3 text-sm font-medium">
                                    Tài khoản đã được cập nhật thành công
                                </div>
                                <button type="button" className="ms-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700" data-dismiss-target="#alert-3" aria-label="Close">
                                    <span className="sr-only">Close</span>
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                    </svg>
                                </button>
                            </div>
                        </form>
            </div>
    )

}
export default EditProfile;