import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import doneIcon from '../../assets/images/send-password/done.png';

const SendPassword = memo(() => {
  const navigate = useNavigate();
  const routeToHome = (
    // event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    navigate('/login');
  };
  return (
    <div className="h-screen">
      {/* Global container */}
      {/* Back Button */}

      <div className="flex justify-center items-center min-h-screen bg-cyan-50">
        <div className="relative flex flex-col m-6 px-14 py-20 md:p-24 justify-between items-center text-center bg-white space-y-4  shadow-2xl rounded-2xl">
          {/* <Link to="/login">
            <div className="absolute top-5 left-5 flex justify-center items-center rounded-full hover:cursor-pointer hover:-translate-y-0.5 duration-150">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-7 rotate-180"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#000000"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <line x1="5" y1="12" x2="19" y2="12" />
                <line x1="13" y1="18" x2="19" y2="12" />
                <line x1="13" y1="6" x2="19" y2="12" />
              </svg>
              <span className="text-sm">Quay lại</span>
            </div>
          </Link> */}
          <p className="text-4xl font-semibold text-cyan-600 pt-2">
            BKArtisan
          </p>
          <p className="text-2xl font-semibold text-center hidden md:block">
            Yêu cầu thành công
          </p>
          {/* <h6>Bạn vui lòng nhập email để lấy lại mật khẩu</h6> */}
          <div className="hidden md:block">
            <img src={doneIcon} alt="send password image" />
          </div>
          {/* <div className="flex flex-col justify-start text-start w-full">
            <label className="text-sm font-bold">Email</label>
            <div>
              <input
                type="text"
                className="w-full py-4 px-6 border border-gray-300 rounded-md placeholder:font-sans placeholder:text-sm placeholder:font-light hover:outline hover:outline-black hover:outline-1"
                placeholder="Nhập địa chỉ email của bạn"
              />
            </div>
          </div> */}

          <span className="text-justify w-[18rem]">
            Mật khẩu đã được gửi đến email{' '}
            <span className="font-bold">q*******@gmail.com</span>, bạn vui lòng
            kiểm tra hộp thư.
          </span>

          <button
            onClick={routeToHome}
            className="w-full flex mx-auto justify-center items-center py-4 space-x-2 font-sans font-bold text-white rounded-md bg-cyan-600 shadow-cyan-100 hover:bg-opacity-90 shadow-sm hover:shadow-lg border transition hover:-translate-y-0.5 duration-150"
          >
            Đăng nhập
          </button>

          {/* <span>
            Bạn đã nhớ mật khẩu?{' '}
            <span className="text-orange-600">
              <Link to="/login">Đăng nhập</Link>
            </span>
          </span> */}
        </div>
      </div>
    </div>
  );
});

export default SendPassword;
