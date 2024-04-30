import { RxAvatar } from "react-icons/rx";
import { LiaFlagUsaSolid } from "react-icons/lia";
const Header = () => {
    return (
        <div className="flex ml-80 align-right items-center h-24">
            {/* <div class="relative w-80 ml-14">
                <input type="search" id="search-dropdown" class="block p-2.5 w-full text-sm text-black-900 bg-gray-50 rounded-lg rounded-s-gray-100 rounded-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Search" required />
                <button type="submit" class="absolute top-0 end-0 p-2.5 h-full text-sm font-medium text-white bg-[#E8C4F2] rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"><svg class="w-6 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg></button>
            </div> */}
            <div className="ml-96 pl-96 flex flex-row align-center items-right">
                <LiaFlagUsaSolid style={{ cursor: "pointer", fontSize: "35px", color: 'blue' }} />
                <RxAvatar style={{ cursor: "pointer", fontSize: "35px", marginLeft: "20px" }} />
            </div>
        </div>
    )
}
export default Header;