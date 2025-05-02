import AuthForm from "@/components/AuthForms";
import mountains from "../../../public/register-img.jpg";
import Image from "next/image";
import logo from "../../../public/openverse_logo.png";
export default function SignUp() {
  return (
    <>
      <div className="logo-container flex justify-center items-center px-2 py-1 bg-[#F3F4F6]">
        <Image
          src={logo}
          alt="Openverse Logo"
          className="logo-image rounded-full shadow-lg"
        />
      </div>
      <div className="min-h-[screen] py-6 flex items-center justify-center bg-gray-100">
        <div className="flex flex-col sm:flex-row bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl w-full">
          {/* Left Section with Image */}
          <div className="hidden sm:flex sm:w-1/2 bg-gray-200">
            <Image
              src={mountains}
              alt="Signup Illustration"
              className="object-cover w-full h-full"
            />
          </div>

          {/* Right Section with Form */}
          <div className="w-full sm:w-1/2 p-8 flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              Openverse Signup
            </h1>
            <AuthForm />
            <p className="mt-4 text-sm text-gray-600">
              Already have an account?{" "}
              <a href="/login" className="text-blue-600 hover:underline">
                Login here
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
