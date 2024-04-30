import 'flowbite';
import LeftSideBar from './components/LeftSideBar';
import Header from "./components/header";
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const url = `https://bkhostel.hcmut.tech/admin/change-password`;

const ChangePassWord = () => {
    const { state } = useLocation();
    const [userInfo, setUserInfo] = useState({
        // id: '656ed077456cd9380f56795c',
        id: state.profile._id,
        newPassword: '',
        confirmPassword: '',
    });
    const [alert, setAlert] = useState("invisible");
    // const axiosInstance = axios.create({
    //     baseURL: tokenUrl,
    // });
    // const bodyValue = {
    //     "username": "HoaiTrang_Nguyen53",
    //     "password": "123456"
    // };
    // let token; // initial state
    // axiosInstance.interceptors.request.use(async config => {
    //     if (!token) {
    //         const { data } = await axios.post(tokenUrl, bodyValue);
    //         token = data.token;
    //     }
    //     config.headers.Authorization = `Bearer ${token}`;
    //     return config;
    // });
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(url, userInfo, {
                headers: {
                    'Authorization': `Bearer ${state.token}`
                }
            })
                .then(res => console.log(res.data.message));
            setAlert('visible');
        } catch (error) {
            console.log(error.response);
        }
    };
    const handleChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        setUserInfo(prev => ({
            ...prev,
            [name]: value
        }));
    };
    return (
        <div className="grid grid-cols-10 gap-3">
            <LeftSideBar />
            <div className="h-screen col-start-3 col-span-8 pl-3 text-lg bg-[#b6d6f2]">
                <Header />
                <div className="my-8 ml-14 mt-8 hover:cursor-pointer text-2xl font-semibold text-black">
                    UsersList/{state.profile.full_name}/Change Password
                </div>
                <div className="mx-14 bg-white text-[#797C7B] p-6 h-2/3 rounded-2xl">
                    <div class={`${alert} flex items-center bg-blue-500 text-white text-sm font-bold ml-2 px-4 py-3 `} role="alert">
                        <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" /></svg>
                        <p>Đổi mật khẩu thành công</p>
                    </div>
                    <form className="w-1/2 mx-auto mt-16 mb-16">
                        <div class="grid gap-6 mb-10 md:grid-cols-1">
                            <div>
                                <input value={userInfo.id} type="text" id="Id" class="bg-gray-50 border border-[#B6D6F2] text-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-6 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Id" disabled />
                            </div>
                            <div>
                                <input onChange={handleChange} name='newPassword' type="password" id="new_pass" class="bg-gray-50 border border-[#B6D6F2] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-6 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="New Password" required />
                            </div>
                            <div>
                                <input onChange={handleChange} name='confirmPassword' type="password" id="confirm-pass" class="bg-gray-50 border border-[#B6D6F2] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-6 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Confirm Password" required />
                            </div>
                        </div>
                        <button onClick={handleSubmit} class="w-full text-white bg-[#25BEB9] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xl px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default ChangePassWord;
