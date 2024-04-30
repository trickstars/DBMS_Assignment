import { memo } from 'react';
import { Link } from 'react-router-dom';
import facebookIcon from '../../assets/images/login/facebook.png';
import googleIcon from '../../assets/images/login/google.png';
import sideImage from '../../assets/images/login/image.png';
import TextInput from '../../components/input/TextInput';
import { loginUser } from '../../utils/users';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const Login = memo((props) => {
  // localStorage.clear();
  const navigate = useNavigate();
  const user = {
    minUserNameLen: 6,
    minPasswordLen: 6,
  };

  const { mutate, isPending, isSuccess, isError, error, status } = useMutation({
    mutationFn: async (userData) => {
      const response = await loginUser(userData);
      console.log("response = ", response);
      localStorage.setItem('token', response.token);
      console.log(`role = ${response.result['user-info'].role}`);
      localStorage.setItem('role', response.result['user-info'].role);
    },
    onSuccess: () => {
      // Go back to home page
      const role = localStorage.getItem('role');
      if (role === 'ADMIN') {
         return navigate('/admin/statistics');
      }
      navigate('/');
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: ``,
      password: ``,
    },
  });
  const submitHandler = async (data) => {
    console.log(data);
    // Preprocess data here
    mutate(data);
  };
  console.log(`status = ${status}`);

  return (
    <div className="h-screen">
      {/* <!-- Global Container --> */}
      <div className="flex items-center justify-center min-h-screen bg-cyan-50">
        {/* <!-- Card Container --> */}
        <div className="relative flex flex-col m-6 space-y-10 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0 md:m-0">
          {/* <!-- Left Side --> */}
          <div className="p-20">
            {/* <!-- Top Content --> */}
            <h2 className="font-mono mb-5 text-4xl font-bold">Đăng nhập</h2>
            {/* <p className="max-w-sm mb-12 font-sans font-light text-gray-600">
            Log in to your account to upload or download pictures, videos or
            music.
          </p> */}
            <form onSubmit={handleSubmit(submitHandler)}>
              <div className="my-6">
                <TextInput
                  type="text"
                  placeholder="Nhập tài khoản"
                  label="username"
                  register={register}
                  errors={errors}
                  validatedObject={{
                    required: `Vui lòng nhập tên tài khoản`,
                    minLength: {
                      value: user.minUserNameLen,
                      message: `Tên tài khoản phải có ít nhất ${user.minUserNameLen} ký tự`,
                    },
                  }}
                />
              </div>
              <div className="my-6">
                <TextInput
                  type="password"
                  placeholder="Nhập lại mật khẩu"
                  label="password"
                  register={register}
                  errors={errors}
                  validatedObject={{
                    required: `Vui lòng nhập lại mật khẩu`,
                    minLength: {
                      message: `Mật khẩu phải có ít nhất ${user.minPasswordLen} kí tự`,
                      value: user.minPasswordLen,
                    },
                  }}
                />
              </div>
              {/* <!-- Middle Content --> */}
              <div className="flex flex-col items-center justify-between mt-6 space-y-6  md:flex-row md:space-y-0 md:space-x-6">
                <button
                  type="submit"
                  className="w-full md:w-auto flex justify-center items-center p-4 space-x-2 font-sans font-bold text-white rounded-md px-9 bg-cyan-600 shadow-cyan-100 hover:bg-opacity-90 shadow-sm hover:shadow-lg border transition hover:-translate-y-0.5 duration-150"
                >
                  {isPending ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Đang xử lý...
                    </>
                  ) : (
                    <>
                      <span>Đăng nhập</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="#ffffff"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <line x1="13" y1="18" x2="19" y2="12" />
                        <line x1="13" y1="6" x2="19" y2="12" />
                      </svg>
                    </>
                  )}
                </button>
                <Link to="/register">
                  <button
                    type="button"
                    className="w-full md:w-auto flex justify-center items-center p-4 space-x-2 font-sans font-bold text-cyan-600 outline outline-cyan-600 bg-white rounded-md px-9 shadow-cyan-100 hover:bg-opacity-90 shadow-sm hover:shadow-lg border transition hover:-translate-y-0.5 duration-150"
                  >
                    Đăng ký
                  </button>
                </Link>
              </div>
            </form>

            <div className="font-regular text-cyan-600 hover:cursor-pointer text-center my-4">
              <Link to="/enter-email" className="text-center mx-auto">
                Quên mật khẩu?
              </Link>
            </div>
            {isError && (
              <div className="font-regular text-red-600 text-center my-4">
                {error.message}
              </div>
            )}
            {/* <!-- Border --> */}
            <div className="mt-12 border-b border-b-gray-300"></div>
            {/* <!-- Bottom Content --> */}
            <p className="py-6 text-sm font-regular text-center text-gray-400">
              Hoặc đăng nhập với
            </p>
            {/* <!-- Bottom Buttons Container --> */}
            {/* src\assets\images\login\facebook.png 
            src\pages\login\Login.tsx */}
            <div className="flex flex-col space-x-0 space-y-6 md:flex-row md:space-x-4 md:space-y-0">
              <button className="flex items-center justify-center py-2 space-x-3 border border-gray-300 rounded shadow-sm hover:bg-opacity-30 hover:shadow-lg hover:-translate-y-0.5 transition duration-150 md:w-1/2">
                <img src={facebookIcon} alt="" className="w-9" />
                <span className="font-thin">Facebook</span>
              </button>
              <button className="flex items-center justify-center py-2 space-x-3 border border-gray-300 rounded shadow-sm hover:bg-opacity-30 hover:shadow-lg hover:-translate-y-0.5 transition duration-150 md:w-1/2">
                <img src={googleIcon} alt="" className="w-9" />
                <span className="font-thin">Google</span>
              </button>
            </div>
          </div>

          {/* <!-- Right Side --> */}
          <div className="rounded-r-2xl hidden w-[430px] md:block bg-[url('/src/assets/images/login/image.png')]">
            <img
              src={sideImage}
              alt=""
              className="w-[430px] h-[629.6px] hidden"
            />
          </div>

          {/* <!-- Close Button --> */}
          <Link to="/">
            <div className="group absolute hidden -top-5 right-4 md:flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full md:bg-white md:top-4 hover:cursor-pointer hover:-translate-y-0.5 transition duration-150">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-black group-hover:text-gray-600"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
});

export default Login;
