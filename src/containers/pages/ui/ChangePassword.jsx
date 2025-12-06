import React, { useCallback, useState } from "react";
let timeout;
const ChangePassword = () => {
  const [email, setEmail] = useState("");
  const [goodPassword, setGoodPassword] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleEmailChange = useCallback((e) => {
    const value = e.target.value;
    setEmail(value);
    // Regex to check if email contains letters, numbers, uppercase
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{9,}$/;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      if (regex.test(value)) {
        setGoodPassword(true);
        setErrorMessage(""); // Clear the error if valid
      } else {
        setGoodPassword(false);
        setErrorMessage(
          "Email must contain at least one number, one uppercase, and one lowercase letter"
        );
      }
    }, 1000);
  }, []);
  const handleChangePassword = useCallback(() => {
    console.log(email);
  }, [email]);
  return (
    <div className="font-[sans-serif]">
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="grid md:grid-cols-2 items-center gap-4 max-md:gap-8 max-w-6xl max-md:max-w-lg w-full p-4 m-4 shadow-[0_0_10px_-3px_rgba(6,81,237,0.3)] rounded-md">
          <div className="md:max-w-md w-full px-4 py-4">
            <form>
              <div className="mb-12">
                <h3 className="text-gray-800 text-3xl font-extrabold">
                  Thay đổi mật khẩu{" "}
                </h3>
                <span>
                  Người dùng nên đặt mật khẩu bao gồm cả ký tự chữ và số và chữ
                  viết hoa
                </span>
              </div>
              <div>
                <label className="text-gray-800 text-[18px] block mb-2">
                  Điền mật khẩu mới
                </label>
                <div className="relative flex items-center">
                  <input
                    name="password"
                    type={isPasswordVisible ? "text" : "password"}
                    required
                    className="w-full text-gray-800 text-sm border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none"
                    placeholder="Enter password"
                    autoComplete="off"
                    onChange={handleEmailChange}
                    value={email}
                  />
                  <div
                    className="hidden_password absolute right-2 cursor-pointer"
                    onClick={() => {
                      setIsPasswordVisible((state) => !state);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#bbb"
                      stroke="#bbb"
                      className="w-[18px] h-[18px] "
                      viewBox="0 0 128 128"
                    >
                      <path
                        d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                        data-original="#000000"
                      ></path>
                    </svg>
                    {isPasswordVisible ? (
                      ""
                    ) : (
                      <span
                        className={`absolute w-[18px] h-[2px] bg-[#bbb] rotate-45 top-[8px]`}
                      ></span>
                    )}
                  </div>
                </div>
                {errorMessage && (
                  <div className="error text-sm font-medium text-red-400 mt-2">
                    {errorMessage}
                  </div>
                )}
                {goodPassword && (
                  <div className="error text-sm font-medium text-green-400 mt-2">
                    Mật khẩu tốt
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between mt-12 ">
                <button
                  className=" w-fit text-white submit_btn px-4 py-2 rounded-lg bg-blue-600"
                  type="button"
                  onClick={handleChangePassword}
                >
                  Xác nhận
                </button>
                <a
                  href="/login"
                  className="text-blue-600 font-semibold text-sm hover:underline cursor-pointer"
                >
                  Hủy
                </a>
              </div>
            </form>
          </div>
          <div className="">
            <div className="">
              <div className="logo_thumb w-[190px] h-[40px] overflow-hidden mx-auto ">
                <img src="" alt="" />
              </div>
            </div>
            <div className="shop_title">Vẻ đẹp đến từ sự chăm sóc</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
