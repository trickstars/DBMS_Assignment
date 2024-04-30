import GoogleMapReact from 'google-map-react';
import { CiLocationOn } from 'react-icons/ci';
import axios from 'axios';
import { useState, useEffect } from 'react';


const locationURL = import.meta.env.VITE_BACKEND_API + '/location';
const postsURL = import.meta.env.VITE_BACKEND_API + '/posts';
const servicesURL = import.meta.env.VITE_BACKEND_API + '/services';

const PostNew = () => {
    const authToken = localStorage.getItem('token')
    // const config = {'Authorization': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NmQ3YTQyODJiYmE2MzJjZDVjZjBlMCIsInRva2VuVmVyc2lvbiI6MCwiaWF0IjoxNzAxNjczNTcyfQ.ddG0VTMD-ZE0dJxGQL5SbHtAQyqO2MlZ_U121M5B8gY"};
    const config = { Authorization: authToken };

    const [district, setDistrict] = useState([''])
    const [ward , setWard] = useState([''])
    const [services , setServices] = useState([''])
    const [images , setImages] = useState({
        files: [],
        base64: []
    })
    const [isSubmit, setIsSubmit] = useState(false)

    const [location] = useState({
        lat: 10.734363531931315,
        lng: 106.72015766304695
    })
    const getServices = async () => {
        console.log("get Services")

        await axios.get(`${servicesURL}`).then(res => setServices(res.data));

    };
    const getDistricts = async () => {
        console.log("get District")
        await axios.get(`${locationURL}/districts`).then(res => setDistrict(res.data));


    };
    const getWards = async (id) => {
        console.log("get Wards " + id)
        await axios.get(`${locationURL}/districts/${id}/wards`).then(res => setWard(res.data));
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
    const handleFileRead = async (event) => {
        const converted = [];
        const files = [];
        for (var i = 0; i < event.target.files.length; i++) {
          converted[i] = await convertBase64(event.target.files[i]);
          files[i] = URL.createObjectURL(event.target.files[i]);
        }
        setImages({
          files: [...images.files, ...files],
          base64: [...images.base64, ...converted],
        });

        // const imagesContainer = document.getElementsByClassName("images-container")

        // imagesContainer.length ? imagesContainer.map((image, idx) => {
        //     return (
        //         <img src={image} key={idx} alt={"image" + idx} className="images w-48"/>
        //     )
        // }): "Chưa có ảnh được chọn"
      };
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmit(false);

        const postData = {
            service_type: e.target.service.value,
            title: e.target.title.value,
            desc: e.target.desc.value,
            price: e.target.price.value,
            type: e.target.type.value,
            customer_type: e.target.customer_type.value,
            area: e.target.area.value,
            // expDate: e.target.expDate.value,
            phone_num: e.target.phone_num.value,
            // contact: e.target.contact.value,
            images : images.base64,
            street: e.target.street.value,
            // ward: e.target.ward[e.target.ward.selectedIndex].innerText.trim(),
            ward: e.target.ward.value,
            // district: e.target.district[e.target.district.selectedIndex].innerText.trim(),
            district: e.target.district.value,
            city: e.target.city.value,
        }

        uploadNewPost(postData)
    }

    const uploadNewPost = async (postData) => {
        console.log(postData);
        const response = await axios.post(`${postsURL}/upload`, postData, {headers: config});
        console.log(response.data);
        setIsSubmit(true);

    };

    useEffect(() => {
        getServices();
        getDistricts();
        getWards(0);

    }, [])
    return (
            <div className="col-start-3 col-span-8 gap-3 max-w-[1536px] mx-auto">
                <div className="flex flex-col row-start-1 row-span-7 col-start-3 col-span-6 ml-5">
                    <div className="py-4 mt-6 border-b border-gray rounded-md h-fit text-3xl font-bold">
                        Đăng tin mới
                    </div>

                    <form onSubmit={handleSubmit} className="my-10 mr-10">
                        <div className="my-8">
                            <p className="[font-family:'Poppins-Medium',Helvetica] font-medium text-black text-2xl">Dịch vụ</p>
                            <div className="items-center mt-8">
                                <label className="mb-2 block w-full [font-family:'Poppins-Medium',Helvetica] font-medium text-black text-lg" htmlFor="service">Gói dịch vụ</label>
                                {/* <input className="px-3 block w-full h-10 outline-none rounded-[4px] border border-solid border-[#cccccc]" type="text" defaultValue="" id="service" name="service"/> */}
                                <select name="service" id="service" className='px-3 block w-full h-10 outline-none rounded-[4px] border border-solid border-[#cccccc]'>
                                    {services.length ? services.map((item, idx)=> {
                                            return (
                                                <option key={idx} value={item._id}>VIP {item.category}</option>
                                            )
                                        }):""}
                                </select>
                            </div>
                        </div>

                        <div className="my-8">
                            <p className="[font-family:'Poppins-Medium',Helvetica] font-medium text-black text-2xl">Địa chỉ cho thuê</p>
                            <div className="flex justify-between">
                                <div className="items-center mt-8 w-full mr-4">
                                    <label className="mb-2 block w-full [font-family:'Poppins-Medium',Helvetica] font-medium text-black text-lg" htmlFor="city">Tỉnh/ Thành phố</label>
                                    <input className="px-3 block w-full h-10 outline-none rounded-[4px] bg-[#dfdfdf] border border-solid border-[#cccccc]" type="text" defaultValue="Thành phố Hồ Chí Minh" disabled name="city" id="city"/>
                                </div>

                                <div className="items-center mt-8 w-full ml-4">
                                    <label className="mb-2 block w-full [font-family:'Poppins-Medium',Helvetica] font-medium text-black text-lg" htmlFor="district">Quận/ Huyện</label>
                                    {/* <input className="px-3 block w-full h-10 outline-none rounded-[4px] border border-solid border-[#cccccc]" type="text" defaultValue="" id="service" name="service"/> */}
                                    <select  onChange={e => getWards(e.target.value)} name="district" id="district" className='px-3 block w-full h-10 outline-none rounded-[4px] border border-solid border-[#cccccc]'>
                                        {district.length ? district.map((item, idx)=> {
                                            return (
                                                <option key={idx} value={idx}>{item}</option>
                                            )
                                        }):""}
                                    </select>
                                </div>
                            </div>

                            <div className="flex justify-between">
                                <div className="items-center mt-8 w-full mr-4">
                                    <label className="mb-2 block w-full [font-family:'Poppins-Medium',Helvetica] font-medium text-black text-lg" htmlFor="ward">Phường/ Xã</label>
                                    {/* <input className="px-3 block w-full h-10 outline-none rounded-[4px] border border-solid border-[#cccccc]" type="text" defaultValue="" id="service" name="service"/> */}
                                    <select name="ward" id="ward" className='px-3 block w-full h-10 outline-none rounded-[4px] border border-solid border-[#cccccc]'>
                                        {ward.length ? ward.map((item, idx)=> {
                                            return (
                                                <option key={idx} value={idx}>{item}</option>
                                            )
                                        }):""}
                                    </select>
                                </div>

                                <div className="items-center mt-8 w-full mx-4">
                                    <label className="mb-2 block w-full [font-family:'Poppins-Medium',Helvetica] font-medium text-black text-lg" htmlFor="street">Đường/ Phố</label>
                                    <input className="px-3 block w-full h-10 outline-none rounded-[4px] border border-solid border-[#cccccc]" type="text" defaultValue="" id="street" name="street"/>
                                </div>

                                <div className="items-center mt-8 w-full ml-4">
                                    <label className="mb-2 block w-full [font-family:'Poppins-Medium',Helvetica] font-medium text-black text-lg" htmlFor="number">Số nhà</label>
                                    <input className="px-3 block w-full h-10 outline-none rounded-[4px] border border-solid border-[#cccccc]" type="text" defaultValue="" id="number" name="number"/>
                                </div>
                            </div>

                            {/* <div className="flex justify-between">
                                <div className="items-center mt-8 w-full">
                                    <label className="mb-2 block w-full [font-family:'Poppins-Medium',Helvetica] font-medium text-black text-lg" htmlFor="full_address">Địa chỉ chính xác</label>
                                    <input className="px-3 block w-full h-10 outline-none rounded-[4px] border border-solid border-[#cccccc]" type="text" defaultValue="" disabled id="full_address" name="full_address"/>
                                </div>
                            </div> */}

                            <div className="flex justify-between mt-8">
                                {/* <div className="bg-[#000] w-full h-60 mr-4"></div> */}
                                <div className='w-full h-72 rounded-md overflow-hidden'>
                                        <GoogleMapReact
                                            bootstrapURLKeys={{ key: 'AIzaSyDWTx7bREpM5B6JKdbzOvMW-RRlhkukmVE' }}
                                            defaultCenter={location}
                                            defaultZoom={3}
                                        >
                                            <CiLocationOn lat={location.lat} lng={location.lng} text={"location"}/>
                                        </GoogleMapReact>
                                    </div>
                                <div className="bg-[#E9DDBF] w-full h-72 ml-4 p-6">
                                    <p className="text-lg mb-2">Lưu ý khi đăng tin</p>
                                    <p>
                                    * Nội dung phải viết bằng tiếng Việt có dấu.
                                    </p>
                                    <p>
                                    * Tiêu đề tin không dài quá 100 ký tự.
                                    </p>
                                    <p>
                                    * Các bạn nên điền đầy đủ thông tin vào các mục để tin đăng có hiệu quả hơn.
                                    </p>
                                    <p>
                                    * Để tăng độ tin cậy và tin rao được nhiều người quan tâm hơn, hãy sửa vị trí tin rao của bạn trên bản đồ bằng cách kéo icon tới đúng vị trí tin rao.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="my-8">
                            <p className="[font-family:'Poppins-Medium',Helvetica] font-medium text-black text-2xl">Thông tin mô tả</p>
                            <div className="flex justify-between">
                                <div className="items-center mt-8 w-full mr-4">
                                    <label className="mb-2 block w-full [font-family:'Poppins-Medium',Helvetica] font-medium text-black text-lg" htmlFor="type">Loại hình</label>
                                    {/* <input className="px-3 block w-full h-10 outline-none rounded-[4px] border border-solid border-[#cccccc]" type="text" defaultValue="" id="service" name="service"/> */}
                                    <select name="type" id="type" className='px-3 block w-full h-10 outline-none rounded-[4px] border border-solid border-[#cccccc]'>
                                        <option value="1">Cho thuê phòng trọ</option>
                                        <option value="2">Cho thuê nhà</option>
                                        <option value="3">Cho thuê căn hộ</option>
                                        <option value="4">Tìm người ở ghép</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex justify-between">
                                <div className="items-center mt-8 w-full mr-4">
                                    <label className="mb-2 block w-full [font-family:'Poppins-Medium',Helvetica] font-medium text-black text-lg" htmlFor="title">Tiêu đề</label>
                                    <input className="px-3 block w-full h-10 outline-none rounded-[4px] border border-solid border-[#cccccc]" type="text" defaultValue="" id="title" name="title"/>
                                </div>
                            </div>

                            <div className="flex justify-between">
                                <div className="items-center mt-8 w-full">
                                    <label className="mb-2 block w-full [font-family:'Poppins-Medium',Helvetica] font-medium text-black text-lg" htmlFor="desc">Nội dung mô tả</label>
                                    <textarea className="p-3 block w-full h-60 outline-none rounded-[4px] border border-solid border-[#cccccc]" type="text" defaultValue="" id="desc" name="desc"/>
                                </div>
                            </div>


                            <div className="flex justify-between">
                                <div className="items-center mt-8 w-full mr-4">
                                    <label className="mb-2 block w-full [font-family:'Poppins-Medium',Helvetica] font-medium text-black text-lg" htmlFor="customer_type">Đối tượng cho thuê</label>
                                    <input className="px-3 block w-full h-10 outline-none rounded-[4px] border border-solid border-[#cccccc]" type="text" defaultValue="" id="customer_type" name="customer_type"/>
                                </div>

                                <div className="items-center mt-8 w-full ml-4">
                                    <label className="mb-2 block w-full [font-family:'Poppins-Medium',Helvetica] font-medium text-black text-lg" htmlFor="price">Giá cho thuê</label>
                                    <input className="px-3 block w-full h-10 outline-none rounded-[4px] border border-solid border-[#cccccc]" type="text" defaultValue="" id="price" name="price"/>
                                </div>
                            </div>

                            <div className="flex justify-between">
                                <div className="items-center mt-8 w-full mr-4">
                                    <label className="mb-2 block w-full [font-family:'Poppins-Medium',Helvetica] font-medium text-black text-lg" htmlFor="phone_num">Điện thoại</label>
                                    <input className="px-3 block w-full h-10 outline-none rounded-[4px] border border-solid border-[#cccccc]" type="text" defaultValue="" id="phone_num" name="phone_num"/>
                                </div>

                                <div className="items-center mt-8 w-full ml-4">
                                    <label className="mb-2 block w-full [font-family:'Poppins-Medium',Helvetica] font-medium text-black text-lg" htmlFor="area">Diện tích</label>
                                    <input className="px-3 block w-full h-10 outline-none rounded-[4px] border border-solid border-[#cccccc]" type="text" defaultValue="" id="area" name="area"/>
                                </div>
                            </div>

                            <div className="flex justify-between">
                                {/* <div className="items-center mt-8 w-full mr-4">
                                    <label className="mb-2 block w-full [font-family:'Poppins-Medium',Helvetica] font-medium text-black text-lg" htmlFor="customer_type">Đối tượng cho thuê</label>
                                    <input className="px-3 block w-full h-10 outline-none rounded-[4px] border border-solid border-[#cccccc]" type="text" defaultValue="" id="customer_type" name="customer_type"/>
                                </div> */}

                                <div className="items-center mt-8 w-full ml-4">
                                </div>
                            </div>
                        </div>

                        <div className="my-8">
                            <p className="[font-family:'Poppins-Medium',Helvetica] font-medium text-black text-2xl">Hình ảnh</p>
                            <div className="flex justify-between">
                                <div className="items-center mt-8 w-full mr-4">
                                    <p className="mb-2 block w-full [font-family:'Poppins-Medium',Helvetica] font-medium text-black text-lg">Cập nhật hình ảnh cho nơi thuê</p>
                                    <div className="h-60 rounded-[4px] border border-dashed border-[#cccccc] justify-center items-center flex">
                                        <label href="" className="rounded-[4px] border border-solid border-[#cccccc] p-2 cursor-pointer" htmlFor="images">Thêm hình ảnh</label>
                                        <input className="rounded-[4px] border border-solid border-[#cccccc] p-2 hidden" id="images" encType="multipart/form-data" multiple  type="file" name="images" onChange={e => handleFileRead(e)} />

                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-between">
                                <div className="items-center mt-8 w-full mr-4">
                                    <p className="mb-2 block w-full [font-family:'Poppins-Medium',Helvetica] font-medium text-black text-lg">Ảnh đã chọn</p>
                                    <div className="images-container">
                                        {/* <img src="https://hcmut.edu.vn/img/nhanDienThuongHieu/01_logobachkhoatoi.png" alt="hinh anh" className="images w-48"/> */}
                                        {
                                            images.files.length ? images.files.map((image, idx) => {
                                                return (
                                                    <img src={image} key={idx} alt={"image" + idx} className="images w-48 inline-block pr-3 pt-3"/>
                                                )
                                            }): "Chưa có ảnh được chọn"
                                        }
                                    </div>

                                    <button id="clear"></button>
                                </div>
                            </div>
                        </div>

                        <button type='submit' className='w-full justify-center items-center rounded-md px-3 py-3 mt-8 mb-16 bg-[#008000]'>
                            <p className='text-sm text-white font-semibold'>Tạo mới</p>
                        </button>

                        <div id="alert-3" className={isSubmit? " border-4 border-green-300 flex items-center p-4 mb-4 text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400": "hidden"} role="alert">
                            <div className="ms-3 text-sm font-medium">
                                Bạn đã tạo tin đăng thành công!
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
            </div>
    );
};
export default PostNew;
