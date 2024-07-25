import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form"
import axios from 'axios'
import toast from 'react-hot-toast';

function Login() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm()
    
      const onSubmit =async (data) => {
        const userInfo ={
     
          email:data.email,
          password:data.password
        }
        await axios.post('http://localhost:3000/user/login',userInfo)
        .then((res)=>{
          console.log(res.data)
          if(res.data){
            toast.success('Login Successfully !')
            document.getElementById("my_modal_3").close();
            setTimeout(() => {
             
            window.location.reload();
            localStorage.setItem("USers",JSON.stringify(res.data.user));
            }, 1500);
            
          }
          
        }).catch((err)=>{
          console.log(err.message);
          toast.error("This didn't work.")
         
        })
        
      }
  return (
    <div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form onSubmit={handleSubmit(onSubmit)}  method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <Link to="/ " className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={()=>document.getElementById("my_modal_3").close()}
            >
              ///
            </Link>
          
          <h3 className="font-bold text-lg">LOGin !</h3>
          <div className="mt-4 space-y-2">
            <span>Email</span>
            <br></br>
            <input
              type="email"
              placeholder="Enter Your Email"
              className="w-80 px-5 py-3 rounded-md outline-none  " {...register("email", { required: true })}
            />
            <br/>
             {errors.email && <span className="text-sm text-red-500">This field is required</span>}
          </div>
          <div className="mt-4 space-y-2">
            <span>Password</span>
            <br></br>
            <input {...register("password", { required: true })}
              type="text"
              placeholder="Password here"
              className="w-80 px-5 py-3 rounded-md outline-none"
            />     <br/>
             {errors.password && <span className="text-sm text-red-500">This field is required</span>}
          </div>

          <div className="flex justify-around mt-4">
            <button className="bg-pink-500 text-white rounded-lg px-3 py-1 hover:bg-pink-700 ">Login</button> 
            <p>Not Registered ? <Link to="/signup" className="underline text-blue-500 cursor-pointer">SignUp !</Link></p>
          </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}

export default Login;
