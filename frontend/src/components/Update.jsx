

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect,useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Update(){


    const navigate = useNavigate();
    const [username,setUsername] = useState('');
    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [password,setPassword] = useState('');
    const [load,setLoad] = useState(false);
    function handleSucessSubmit(){
        console.log("Toast Sucess");
     return toast.success('Log in Successful!');
      };
  
      function handleSubmitError(e){
        return toast.error(e);
      }
  
     async function Submit(){

        try{
            setLoad(true);
         const res = await axios.put("http://localhost:3000/api/v1/user/",{firstName:firstName,lastName:lastName,password:password},{headers:{Authorization:`Bearer ${JSON.parse(localStorage.getItem('paytm-app-basic')).token}`}});
         console.log(res.data);
         setLoad(false);
         handleSucessSubmit();
         setTimeout(()=>{navigate("/dashboard");},2000);
        }catch(err){
            handleSubmitError(err.response.data.msg);
         console.log(err);
        }

     }

useEffect(()=>{
const item = localStorage.getItem('paytm-app-basic');
if(!item){
 navigate("/");
}
},[]);

       return (
         <div className="h-screen w-screen flex justify-center items-center bg-green">
            <ToastContainer/>   
     <div className="h-[300px] w-[450px] md:h-[400px] lg:h-[500px] rounded-2xl shadow-sm bg-lightwhite overflow-auto">
     <div className="flex flex-col">
      <div className="text-2xl font-semibold w-auto flex justify-center m-6">
       Update Profile
      </div>
      <input className="w-auto h-12  rounded-lg m-5 border-black"  placeholder="    First Name " onChange={(e)=>{setFirstName(e.target.value); setLoad(false)}}/>
      <input  className="w-auto h-12  rounded-lg m-5 border-black"  placeholder="    Last Name "onChange={(e)=>{setLastName(e.target.value); setLoad(false)}} />
      <input type = "password" className="w-auto h-12  rounded-lg m-5 border-black"  placeholder="    password " onChange={(e)=>{setPassword(e.target.value); setLoad(false)}}/>
      
     <div className="flex justify-center"> <button className="h-8 w-44 text-xl bg-green rounded-xl m-6" onClick={()=>{Submit()}}>{(load)?"Loading...":"Update"}</button></div>
   
    
     </div>
     </div>
     </div>
 )

}