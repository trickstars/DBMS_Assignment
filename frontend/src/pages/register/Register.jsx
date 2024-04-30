import { memo } from 'react';
import sideImage from '../../assets/images/register/image.png';
import Input from '../../components/input/TextInput';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { registerUser } from '../../utils/users';

const Register = memo(() => {
  const user = {
    minUserNameLen: 6,
    minPasswordLen: 6,
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: ``,
      email: ``,
      phone: ``,
      password: ``,
      password_confirm: ``,
    },
  });

  const { mutate, isPending, isError, isSuccess, error, status } = useMutation({
    mutationFn: registerUser,
  });
  const submitHandler = (data) => {
    mutate(data);
  };
  console.log(`status = ${status}`)
  console.log(error);;
  return (
    <div className="h-screen">
      {/* <!-- Global Container --> */}
      <div className="flex items-center justify-center min-h-screen bg-cyan-50">
        {/* <!-- Card Container --> */}
        <div className="relative flex flex-col m-6 space-y-10 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0 md:m-0">
          {/* <!-- Left Side --> */}
          <div className="p-6 md:p-12">
            {/* <!-- Top Content --> */}
            <h2 className="font-mono mb-2 text-4xl font-bold text-center">
              Đăng ký
            </h2>
            {/* <p className="max-w-sm mb-12 font-sans font-light text-gray-600">
            Log in to your account to upload or download pictures, videos or
            music.
          </p> */}
            <form onSubmit={handleSubmit(submitHandler)}>
              <div className="my-6">
                <Input
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
                <Input
                  type="phone"
                  placeholder="Nhập số điện thoại"
                  label="phone"
                  register={register}
                  errors={errors}
                  validatedObject={{
                    required: `Vui lòng nhập số điện thoại`,
                    pattern: {
                      value: /[0-9]{10}/,
                      message: `Số điện thoại phải có 10 chữ số`,
                    },
                  }}
                />
              </div>
              <div className="my-6">
                <Input
                  type="email"
                  placeholder="Nhập địa chỉ email"
                  label="email"
                  register={register}
                  errors={errors}
                  validatedObject={{
                    required: `Vui lòng nhập địa chỉ email`,
                  }}
                />
              </div>
              <div className="my-6">
                <Input
                  type="password"
                  placeholder="Nhập mật khẩu"
                  label="password"
                  register={register}
                  errors={errors}
                  validatedObject={{
                    required: `Vui lòng nhập mật khẩu`,
                    minLength: {
                      message: `Mật khẩu phải có ít nhất ${user.minPasswordLen} kí tự`,
                      value: user.minPasswordLen,
                    },
                  }}
                />
                {/* <input
                  type="password"
                  className="w-full py-4 px-6 border border-gray-300 rounded-md placeholder:font-sans placeholder:font-light hover:outline hover:outline-black hover:outline-1"
                  placeholder="Nhập mật khẩu"
                /> */}
              </div>
              <div className="my-6">
                <Input
                  type="password"
                  placeholder="Nhập lại mật khẩu"
                  label="password_confirm"
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
                {/* <input
                  type="password"
                  className="w-full py-4 px-6 border border-gray-300 rounded-md placeholder:font-sans placeholder:font-light hover:outline hover:outline-black hover:outline-1"
                  placeholder="Nhập lại mật khẩu"
                /> */}
              </div>
              {/* <!-- Middle Content --> */}
              <div className="flex flex-col items-center justify-between mt-6 space-y-6  md:flex-row md:space-y-0 md:space-x-6">
                <div className="font-regular text-cyan-600 hover:cursor-pointer">
                  <Link to="/login">Đã có tài khoản?</Link>
                </div>

                <button
                  type="submit"
                  className={`${
                    isPending && 'disable'
                  } w-full md:w-auto flex justify-center items-center p-4 space-x-2 font-sans font-bold text-white rounded-md px-9 bg-cyan-600 shadow-cyan-100 hover:bg-opacity-90 shadow-sm hover:shadow-lg border transition hover:-translate-y-0.5 duration-150`}
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
                      <span>Đăng ký</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-7"
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
              </div>
            </form>
            {isSuccess && (
              <p className="text-center mt-2 text-green-600">
                Đăng ký thành công!
              </p>
            )}
            {isError && (
              <p className="text-center mt-2 text-red-600">
                {error.message}
              </p>
            )}
            {/* <!-- Border --> */}
            {/* <div className="mt-12 border-b border-b-gray-300"></div> */}
            {/* <!-- Bottom Content --> */}
            {/* <p className="py-6 text-sm font-regular text-center text-gray-400">
              Hoặc đăng nhập với
            </p> */}
            {/* <!-- Bottom Buttons Container --> */}
            {/* src\assets\images\login\facebook.png 
            src\pages\login\Login.tsx */}
            {/* <div className="flex flex-col space-x-0 space-y-6 md:flex-row md:space-x-4 md:space-y-0">
              <button className="flex items-center justify-center py-2 space-x-3 border border-gray-300 rounded shadow-sm hover:bg-opacity-30 hover:shadow-lg hover:-translate-y-0.5 transition duration-150 md:w-1/2">
                <img src={facebookIcon} alt="" className="w-9" />
                <span className="font-thin">Facebook</span>
              </button>
              <button className="flex items-center justify-center py-2 space-x-3 border border-gray-300 rounded shadow-sm hover:bg-opacity-30 hover:shadow-lg hover:-translate-y-0.5 transition duration-150 md:w-1/2">
                <img src={googleIcon} alt="" className="w-9" />
                <span className="font-thin">Google</span>
              </button>
            </div> */}
          </div>

          {/* <!-- Right Side --> */}
          <div className="rounded-r-2xl hidden w-[430px] md:block bg-[url('/src/assets/images/register/image.png')]">
            <img
              src={sideImage}
              alt=""
              className="w-[430px] h-[629.6px] hidden"
            />
          </div>

          {/* <!-- Close Button --> */}
          <Link to="/">
            <div className="group absolute -top-5 right-4 flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full md:bg-white md:top-4 hover:cursor-pointer hover:-translate-y-0.5 transition duration-150">
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

export default Register;
