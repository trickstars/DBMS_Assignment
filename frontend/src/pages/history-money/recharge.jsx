import axios from "axios";
import { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import { useLocation } from "react-router-dom";



const Recharge = () => {
    const baseURL = import.meta.env.VITE_BACKEND_API + '/users';
    const authToken = localStorage.getItem('token');
    const config = { Authorization: authToken };
    const url = `https://bkhostel.hcmut.tech/users/`;
    const submitLink = `https://bkhostel.hcmut.tech/recharge/create_payment_url`;
    // const { state } = useLocation();
    // console.log(state.profile);
    const [infoUser, setInfoUser] = useState({
      username: '',
      password: '',
      role: 'USER',
      status: 'ACTIVE',
      email: '',
      full_name: '',
      phone: '',
      avatar: '',
    });

    const [amount, setAmount] = useState({
        amount: 0,
        language: "vn"
    });

    const getUser = async () => {
      try {
        const res = await axios
          .get(url, {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          });
        console.log(res.data);
        getData(res.data._id);
        console.log(res.data._id);
      } catch (error) {
        console.log(error.response);
      }
    };

    const getData = async () => {
        try {
            const res = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            });
            setInfoUser(res.data);
            console.log(res.data);

        } catch (error) {
            console.log(error.response);
        }
    };
    const handleChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        setAmount(prev => ({
            ...prev,
            [name]: value
        }));
    };
    const handleSubmit = async () => {
        try {
            const res = await axios.post(submitLink, amount, {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            });
            window.location.replace(res.data.paymentURL);
            setAmount(amount);
            console.log(res.data);

        } catch (error) {
            console.log(error.response);
        }
    }
    useEffect(() => {
        getUser();
    }, []);
    return (
        <div className="flex flex-col col-start-3 col-end-8 ml-5">
            <div className="px-3 py-4 mt-6 border-b border-gray rounded-md h-fit text-5xl">
                NẠP TIỀN
            </div>
            <div className="px-3 py-4 mt-3 w-100 bg-gray-300 border-b border-gray rounded-md h-fit text-2xl">
                <div>Số dư ví</div>
                <div className="pt-10">{infoUser.balance}</div>
            </div>
            <div className="text-2xl py-3 mt-6">
                Phương thức nạp tiền
            </div>
            <div className="px-3 py-3 bg-gray-300 border-b border-gray rounded-md h-40 text-2xl">
                VNPAY
            </div>
            <div className="col-start-3 col-span-6 text-2xl py-3 mt-6">
                Số tiền nạp
            </div>
            <input onChange={handleChange} value={amount.amount} name="amount" className="px-3 py-3 border border-gray rounded-md h-14 text-2xl" />

            <button onClick={handleSubmit} className='justify-center items-center rounded-md px-3 py-3 mt-8 mb-16 bg-[#0000FF]'>
                <p className='text-white text-3xl font-semibold'>Nạp Tiền</p>
            </button>
        </div>
    )
}
export default Recharge;
