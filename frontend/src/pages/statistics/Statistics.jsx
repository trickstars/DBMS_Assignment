/* eslint-disable react/display-name */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line react/display-name
import React, { memo, useState, PureComponent } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import LeftSideBar from "../user-detail/components/LeftSideBar";

const Statistics = memo(() => {
  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
  return (
    <div className="grid grid-cols-12">
      <LeftSideBar/>
      <div className="w-auto col-start-3 col-span-10 bg-[#e8f1fd]">
        <div className="pt-8 ml-8">
          <h2 className="font-bold text-3xl">Số liệu thống kê</h2>
          <div className="pr-8 mt-4 md:flex md:gap-4">
            <div className="h-96 w-full md:w-2/3 md:h-[800px] bg-white px-4 pt-4 pb-20 rounded-3xl">
              <div className="flex justify-between mr-8 pl-4">
                <div className="font-bold text-xl">Lượng truy cập</div>
                <select name="" id="" className="rounded-xl bg-[#E8F1FD]">
                  <option value="">Hiển thị theo tháng</option>
                  <option value="">Hiển thị theo năm</option>
                </select>
              </div>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  width={500}
                  height={400}
                  data={data}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="uv"
                    stroke="#000"
                    fill="#f7f8f9"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full mt-4 md:mt-0 md:w-1/3">
              <div className="flex flex-wrap">
                <div className="w-full lg:w-1/2 p-2">
                  <div className="text-center bg-[#013C58] p-4 rounded-t-2xl text-white">
                    Lượng người dùng đăng ký
                  </div>
                  <div className="bg-white rounded-b-2xl text-center">
                    <div className="py-2 text-2xl font-bold">2468</div>
                    <p className="font-bold pb-2">Trong tuần trước</p>
                  </div>
                </div>
                <div className="w-full lg:w-1/2 p-2">
                  <div className="text-center bg-[#3c7363] p-4 rounded-t-2xl text-white">
                    Lượng người dùng đăng ký
                  </div>
                  <div className="bg-white rounded-b-2xl text-center">
                    <div className="py-2 text-2xl font-bold">2468</div>
                    <p className="font-bold pb-2">Trong tuần trước</p>
                  </div>
                </div>
                <div className="w-full lg:w-1/2 p-2">
                  <div className="text-center bg-[#f5a201] p-4 rounded-t-2xl text-white">
                    Lượng người dùng đăng ký
                  </div>
                  <div className="bg-white rounded-b-2xl text-center">
                    <div className="py-2 text-2xl font-bold">2468</div>
                    <p className="font-bold pb-2">Trong tuần trước</p>
                  </div>
                </div>
                <div className="w-full lg:w-1/2 p-2">
                  <div className="text-center bg-[#25BEB9] p-4 rounded-t-2xl text-white">
                    Lượng người dùng đăng ký
                  </div>
                  <div className="bg-white rounded-b-2xl text-center">
                    <div className="py-2 text-2xl font-bold">2468</div>
                    <p className="font-bold pb-2">Trong tuần trước</p>
                  </div>
                </div>
                <div className="w-full px-2">
                  <div className="relative bg-white py-4 rounded-xl hover:scale-105 shadow-md underline lg:no-underline decoration-red-300">
                    <div className="text-[#E8C4F2] mx-8 text-3xl absolute lg:inline hidden">
                      ➦
                    </div>
                    <div className="text-2xl font-bold text-center lg:px-0 md:px-1 hover:cursor-pointer">
                      Xuất file Excel
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="pr-8 mt-4 md:flex gap-4">
            <div className="md:w-2/3 px-4 pt-4 pb-20 rounded-3xl">
              <div className="md:flex flex-wrap">
                <div className="md:w-full lg:w-1/2 lg:pr-2">
                  <div className="p-4 bg-white rounded-2xl">
                    <div className="font-bold text-lg mb-4">
                      Những người dùng gần đây
                    </div>
                    <div className="flex items-center bg-[#FFD35B] rounded-xl p-2 mb-2">
                      <img
                        src="https://images.unsplash.com/photo-1512614521719-2806f69d406b?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGxpb258ZW58MHx8MHx8fDA%3D"
                        alt=""
                        className="w-10 h-10 rounded-full"
                      />
                      <span className="w-2/3 font-bold pl-8">Đức Phan</span>{" "}
                      <span className="flex-1">1m ago</span>
                    </div>
                    <div className="flex items-center bg-[#E8F1FD] rounded-xl p-2 mb-2">
                      <img
                        src="https://images.unsplash.com/photo-1512614521719-2806f69d406b?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGxpb258ZW58MHx8MHx8fDA%3D"
                        alt=""
                        className="w-10 h-10 rounded-full"
                      />
                      <span className="w-2/3 font-bold pl-8">Đức Phan</span>{" "}
                      <span className="flex-1">1m ago</span>
                    </div>
                    <div className="flex items-center bg-[#FFD35B] rounded-xl p-2 mb-2">
                      <img
                        src="https://images.unsplash.com/photo-1512614521719-2806f69d406b?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGxpb258ZW58MHx8MHx8fDA%3D"
                        alt=""
                        className="w-10 h-10 rounded-full"
                      />
                      <span className="w-2/3 font-bold pl-8">Đức Phan</span>{" "}
                      <span className="flex-1">1m ago</span>
                    </div>
                    <div className="flex items-center bg-[#E8F1FD] rounded-xl p-2 mb-2">
                      <img
                        src="https://images.unsplash.com/photo-1512614521719-2806f69d406b?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGxpb258ZW58MHx8MHx8fDA%3D"
                        alt=""
                        className="w-10 h-10 rounded-full"
                      />
                      <span className="w-2/3 font-bold pl-8">Đức Phan</span>{" "}
                      <span className="flex-1">1m ago</span>
                    </div>
                    <div className="flex items-center bg-[#FFD35B] rounded-xl p-2 mb-2">
                      <img
                        src="https://images.unsplash.com/photo-1512614521719-2806f69d406b?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGxpb258ZW58MHx8MHx8fDA%3D"
                        alt=""
                        className="w-10 h-10 rounded-full"
                      />
                      <span className="w-2/3 font-bold pl-8">Đức Phan</span>{" "}
                      <span className="flex-1">1m ago</span>
                    </div>
                  </div>
                </div>
                <div className="md:w-full lg:w-1/2 lg:pl-2 mt-4 lg:mt-0">
                  <div className="p-4 bg-white rounded-2xl">
                    <div className="font-bold text-lg mb-4">
                      Những người dùng gần đây
                    </div>
                    <div className="flex items-center bg-[#FFD35B] rounded-xl p-2 mb-2">
                      <img
                        src="https://images.unsplash.com/photo-1512614521719-2806f69d406b?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGxpb258ZW58MHx8MHx8fDA%3D"
                        alt=""
                        className="w-10 h-10 rounded-full"
                      />
                      <span className="w-2/3 font-bold pl-8">Đức Phan</span>{" "}
                      <span className="flex-1">1m ago</span>
                    </div>
                    <div className="flex items-center bg-[#E8F1FD] rounded-xl p-2 mb-2">
                      <img
                        src="https://images.unsplash.com/photo-1512614521719-2806f69d406b?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGxpb258ZW58MHx8MHx8fDA%3D"
                        alt=""
                        className="w-10 h-10 rounded-full"
                      />
                      <span className="w-2/3 font-bold pl-8">Đức Phan</span>{" "}
                      <span className="flex-1">1m ago</span>
                    </div>
                    <div className="flex items-center bg-[#FFD35B] rounded-xl p-2 mb-2">
                      <img
                        src="https://images.unsplash.com/photo-1512614521719-2806f69d406b?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGxpb258ZW58MHx8MHx8fDA%3D"
                        alt=""
                        className="w-10 h-10 rounded-full"
                      />
                      <span className="w-2/3 font-bold pl-8">Đức Phan</span>{" "}
                      <span className="flex-1">1m ago</span>
                    </div>
                    <div className="flex items-center bg-[#E8F1FD] rounded-xl p-2 mb-2">
                      <img
                        src="https://images.unsplash.com/photo-1512614521719-2806f69d406b?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGxpb258ZW58MHx8MHx8fDA%3D"
                        alt=""
                        className="w-10 h-10 rounded-full"
                      />
                      <span className="w-2/3 font-bold pl-8">Đức Phan</span>{" "}
                      <span className="flex-1">1m ago</span>
                    </div>
                    <div className="flex items-center bg-[#FFD35B] rounded-xl p-2 mb-2">
                      <img
                        src="https://images.unsplash.com/photo-1512614521719-2806f69d406b?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGxpb258ZW58MHx8MHx8fDA%3D"
                        alt=""
                        className="w-10 h-10 rounded-full"
                      />
                      <span className="w-2/3 font-bold pl-8">Đức Phan</span>{" "}
                      <span className="flex-1">1m ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Statistics;
