import { memo } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import TextInput from '../../components/input/TextInput';
import { resetUserPassword } from '../../utils/users';
import { useMutation } from '@tanstack/react-query';
const EnterEmail = memo((props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: ``,
    },
  });
  const { mutate, isPending, isSuccess, isError, error, status } = useMutation({
    mutationFn: resetUserPassword,
  });
  console.log(`status = ${status}`);
  const submitHandler = (userEmail) => {
    mutate(userEmail);
  };
  return (
    <div className="h-screen">
      {/* Global container */}
      {/* Back Button */}

      <div className="flex justify-center items-center min-h-screen bg-cyan-50">
        <div className="relative flex flex-col m-6 p-28 justify-between items-center text-center bg-white space-y-4  shadow-2xl rounded-2xl">
          <Link to="/login">
            <div className="absolute top-5 left-5 flex justify-center items-center space-x-1 rounded-full hover:cursor-pointer hover:-translate-y-0.5 duration-150">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 rotate-180"
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
          </Link>
          <p className="text-4xl font-semibold text-cyan-600 pt-2">BKArtisan</p>
          <p className="text-2xl font-semibold text-center hidden md:block">
            Lấy lại mật khẩu
          </p>
          <h6>Bạn vui lòng nhập email để lấy lại mật khẩu</h6>

          <form
            onSubmit={handleSubmit(submitHandler)}
            className="flex flex-col justify-start space-y-4 text-start w-full"
          >
            <div>
              <label className="text-sm font-bold">Email</label>
              <div>
                <TextInput
                  type="email"
                  placeholder="Nhập địa chỉ email của bạn"
                  label="email"
                  register={register}
                  errors={errors}
                  validatedObject={{
                    required: `Vui lòng nhập địa chỉ email`,
                  }}
                />
              </div>
            </div>

            <button className="w-full flex justify-center items-center p-4 space-x-2 font-sans font-bold text-white rounded-md px-9 bg-cyan-600 shadow-cyan-100 hover:bg-opacity-90 shadow-sm hover:shadow-lg border transition hover:-translate-y-0.5 duration-150">
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
                  Đang gửi
                </>
              ) : (
                <span>Gửi</span>
              )}
            </button>
            {isError && (
              <p className="text-red-600 text-center">Có lỗi trong quá trình gửi, vui lòng thử lại!</p>
            )}
            {isSuccess && (
              <p className="text-green-600 text-center">Gửi thành công!</p>
            )}
          </form>

          <span>
            Bạn đã nhớ mật khẩu?{' '}
            <span className="text-cyan-600">
              <Link to="/login">Đăng nhập</Link>
            </span>
          </span>
        </div>
      </div>
    </div>
  );
});

export default EnterEmail;
