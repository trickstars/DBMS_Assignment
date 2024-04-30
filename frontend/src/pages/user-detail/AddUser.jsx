import { useState } from 'react';
import Header from "./components/header";
import LeftSideBar from './components/LeftSideBar';
import axios from 'axios';

const url = `https://bkhostel.hcmut.tech/admin/add-user`;
const tokenUrl = `https://bkhostel.hcmut.tech/auth/sign-in`;

const AddUser = () => {
    const [userInfo, setUserInfo] = useState({
        username: '',
        password: '',
        email: '',
        full_name: '',
        phone: ''
    });
    const [alert, setAlert] = useState("invisible");
    const addNewUser = () => {
        const axiosInstance = axios.create({
            baseURL: tokenUrl,
        });
        const bodyValue = {
            "username": "HoaiTrang_Nguyen53",
            "password": "123456"
        };
        let token; // initial state
        axiosInstance.interceptors.request.use(async config => {
            if (!token) {
                const { data } = await axios.post(tokenUrl, bodyValue);
                token = data.token;
            }
            config.headers.Authorization = `Bearer ${token}`;
            return config;
        });
        const addUser = async () => {
            try {
                const res = await axiosInstance.post(url, userInfo);
                setAlert("visible");
            } catch (error) {
                setAlert("invisible");
                console.log(error.response);
            }
        };
        addUser();
    }
    const handleChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        setUserInfo(prev => ({
            ...prev,
            [name]: value
        }));
    }
    return (
        <div className="grid grid-cols-10 gap-3">
            <LeftSideBar />
            <div className="h-screen col-start-3 col-span-8 pl-3 text-lg bg-[#b6d6f2]">
                <Header />
                <div class={`${alert} flex items-center bg-blue-500 text-white text-sm font-bold ml-16 px-4 py-3 w-fit`} role="alert">
                    <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" /></svg>
                    <p>Tạo Tài Khoản Thành Công</p>
                </div>
                <div className="my-8 ml-14 mt-8 hover:cursor-pointer text-3xl font-semibold text-black">
                    Add New User
                </div>
                <div className="mx-14 bg-white text-[#797C7B] p-6 rounded-2xl">
                    <form>
                        <div class="grid gap-6 mb-10 md:grid-cols-2">
                            <div>
                                <input onChange={handleChange} value={userInfo.username} name='username' type="text" id="username" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="UserName *" required />
                            </div>
                            <div>
                                <input onChange={handleChange} value={userInfo.full_name} name='full_name' type="text" id="fullname" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Full Name *" required />
                            </div>
                            <div>
                                <input onChange={handleChange} value={userInfo.email} name='email' type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email *" required />
                            </div>
                            <div>
                                <input onChange={handleChange} value={userInfo.phone} name='phone' type="tel" id="phone" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Phone Number *" required />
                            </div>
                            <div>
                                <input onChange={handleChange} value={userInfo.password} name='password' type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Password *" required />
                            </div>
                        </div>
                        <button type="button" onClick={addNewUser} class="w-full text-white bg-[#25BEB9] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                    </form>

                </div>
            </div>
        </div>
    );
}

export default AddUser;
