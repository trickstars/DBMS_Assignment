import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const baseURL = import.meta.env.VITE_BACKEND_API + '/posts/user';

const PostHistory = () => {
    const navigate = useNavigate()
    const authToken = localStorage.getItem('token')
    const config = {'Authorization': authToken};

    const [posts, setPosts] = useState([])

    const getPosts = async () => {
        console.log("get Posts")
        await axios.get(`${baseURL}`, {headers: config}).then(res => setPosts(res.data));
    };

    useEffect(() => {
        getPosts();

    },[])

    return (
            <div className="col-start-3 col-span-8  gap-3 ">
                <div className="flex flex-col row-start-1 row-span-7 col-start-3 col-span-6 ml-5 mb-10">
                    <div className="px-3 py-4 mt-6 border-b border-gray rounded-md h-fit font-bold text-3xl">
                        Lịch sử tin đăng
                    </div>
                    <table className="mt-4 text-center mr-10 table-auto border-collapse border border-slate-300">
                        <thead className="grid grid-cols-16 font-bold text-lg rounded-[4px]">
                            <th className=" border border-slate-300 col-span-2 p-1">Tiêu đề</th>
                            <th className=" border border-slate-300 col-span-3 p-1">Ảnh đại diện</th>
                            <th className=" border border-slate-300 col-span-2 p-1">Diện tích</th>
                            <th className=" border border-slate-300 col-span-2 p-1">Giá</th>
                            <th className=" border border-slate-300 col-span-3 p-1">Địa chỉ</th>
                            <th className=" border border-slate-300 col-span-2 p-1">Ngày bắt đầu</th>
                            <th className=" border border-slate-300 col-span-2 p-1">Trạng thái</th>
                        </thead>
                        <tbody className="text-sm">
                        {
                            posts.totalPosts ? posts.result.map((post, idx) => {
                                return (
                                    <tr className="grid grid-cols-16 font-bold rounded-[4px]" key={idx}>
                                        <td className=" border border-slate-300 col-span-2 p-1">{post.title}</td>
                                        <td className=" border border-slate-300 col-span-3 p-1"><img src={post.assets[0]} alt="anh dai dien" className="w-24 m-auto"/></td>
                                        <td className=" border border-slate-300 col-span-2 p-1">{post.area}</td>
                                        <td className=" border border-slate-300 col-span-2 p-1">{post.price}</td>
                                        <td className=" border border-slate-300 col-span-3 p-1">{post.full_address.district + ", " + post.full_address.city}</td>
                                        <td className=" border border-slate-300 col-span-2 p-1">{post.createDateAgo}</td>
                                        <td className=" border border-slate-300 col-span-2 p-1">{post.status}</td>
                                    </tr>
                                )
                            })
                            : <div className="py-2">Bạn chưa có tin đăng nào. Bấm <button className="text-[#0000ff]" type="button" onClick={() => navigate("/user/post-new")}>vào đây</button> để bắt đầu đăng tin</div>
                        }
                        </tbody>


                    </table>
                </div>
            </div>

    );
}
export default PostHistory;