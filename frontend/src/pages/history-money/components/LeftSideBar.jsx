import { useNavigate } from "react-router-dom";
const LeftSideBar = () => {
    const navigate = useNavigate();
    const navigateToHistory = () => {
        navigate('/HistoryMoney/history');
    }
    return (
        <div className="font-semibold row-start-1 row-span-7 col-start-1 col-span-2 pl-3 text-lg bg-[#F5F4F3]">
            <div className="py-8 grid grid-cols-2">
                <div className="grid grid-cols-2">
                    <div className="w-20 h-20 rounded-full bg-white items-center">
                        <p></p>
                    </div>
                    <div className="pl-3 pt-3 items-center justify-center">
                        <div className="hover:cursor-pointer">user</div>
                        <div>12345678</div>
                    </div>
                </div>
            </div>
            <div className="my-8 hover:cursor-pointer">Đăng tin cho thuê</div>
            <div className="my-8 hover:cursor-pointer">Lịch sử cho thuê</div>
            <div className="my-8 hover:cursor-pointer">Thông tin cá nhân</div>
            <div className="my-8 hover:cursor-pointer">Nạp tiền</div>
            <div className="my-8 hover:cursor-pointer" onClick={navigateToHistory}>Lịch sử nạp tiền</div>
            <div className="my-8 hover:cursor-pointer">Thoát</div>
        </div>
    )
}
export default LeftSideBar;