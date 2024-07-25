import React from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import Login from "./Login";
import { useForm } from "react-hook-form"
import axios from 'axios'
import toast from 'react-hot-toast';
function Signup() {

  const location = useLocation()
  const navigate = useNavigate()
  const from = location.state?.from?.pathname || '/'
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // const onSubmit = (data) => console.log(data);
  const onSubmit =async (data) => {
    const userInfo ={
      fullname:data.fullname,
      email:data.email,
      password:data.password
    }
    await axios.post('http://localhost:3000/user/signup',userInfo)
    .then((res)=>{
      console.log(res.data)
      if(res.data){
        toast.success('Signin Successfully !')
        navigate(from,{replace:true})
      }
     
      localStorage.setItem("USers",JSON.stringify(res.data));
    }).catch((err)=>{
      console.log(err.message);
      toast.error("This didn't work.")
    })
    
  }
  return (
    <>
      <div className="flex h-screen items-center justify-center  ">
        <div className="w-[600px]">
          <div className="modal-box border">
            <form onSubmit={handleSubmit(onSubmit)}  method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <Link
                to="/"
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              >
                ✕
              </Link>
        
            <h3 className="font-bold text-lg">Sign-Up !!! !</h3>
            <div className="mt-4 space-y-2">
              <span>Name</span>
              <br></br>
              <input
                {...register("fullname", { required: true })}
                type="text"
                placeholder="Enter Your name"
                className="w-80 px-5 py-3 rounded-md outline-none"
              />
              <br />
              {errors.fullname && (
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              )}
            </div>
            <div className="mt-4 space-y-2">
              <span>Email</span>
              <br></br>
              <input
                {...register("email", { required: true })}
                type="email"
                placeholder="Enter Your Email"
                className="w-80 px-5 py-3 rounded-md outline-none"
              />
              <br />
              {errors.email && (
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              )}
            </div>
            <div className="mt-4 space-y-2">
              <span>Password</span>
              <br></br>
              <input
                {...register("password", { required: true })}
                type="text"
                placeholder="Password here"
                className="w-80 px-5 py-3 rounded-md outline-none"
              />
              <br />
              {errors.password && (
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              )}
            </div>

            <div className="flex justify-around mt-4">
              <button className="bg-pink-500 text-white rounded-lg px-3 py-1 hover:bg-pink-700 ">
                Sign-Up
              </button>
              <p className="text-xl">
                Have Account ?{" "}
                <button
                  className="underline text-blue-500 cursor-pointer"
                  onClick={() =>
                    document.getElementById("my_modal_3").showModal()
                  }
                >
                  Login !
                </button>
              </p>
              <Login />
            </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
