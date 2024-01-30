
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect,useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
  

export default function Signup(){
     const navigate = useNavigate();
     const [username,setUsername] = useState('');
     const [firstName,setFirstName] = useState('');
     const [lastName,setLastName] = useState('');
     const [password,setPassword] = useState('');
     const [load,setLoad] = useState(false);
     function handleSucessSubmit(){
      console.log("Toast Sucess");
   return toast.success('Account Created Successfully');
    };

    function handleSubmitError(e){
      return toast.error(e);
    }


      async function Submit(){

         try{
          setLoad(true);
          const res = await axios.post("http://localhost:3000/api/v1/user/signup",{username:username,firstName:firstName,lastName:lastName,password:password});
          const token = res.data.userId;
          setLoad(false);
          handleSucessSubmit();
          localStorage.setItem('paytm-app-basic',JSON.stringify({"username":res.data.username,"token":token}));
          setTimeout(()=>{navigate("/dashboard")},2000);
         }catch(err){
          handleSubmitError(err.response.data.msg);
          console.log(err);
         }

      }

useEffect(()=>{
const item = localStorage.getItem('paytm-app-basic');
if(item){
  navigate("/dashboard");
}
},[])

        return (
          <div className="h-screen w-screen flex justify-center items-center bg-green">
            <ToastContainer/>
      <div className="h-[400px] w-[450px] md:h-[500px] lg:h-[600px] rounded-2xl shadow-sm bg-lightwhite overflow-auto">
      <div className="flex flex-col">
       <div className="text-2xl font-semibold w-auto flex justify-center m-6">
        Create Account
       </div>

       <input className="w-auto h-12  rounded-lg m-5 border-black"  placeholder="    Username " onChange={(e)=>{setUsername(e.target.value); setLoad(false)}}/>
       <input className="w-auto h-12  rounded-lg m-5 border-black"  placeholder="    First Name " onChange={(e)=>{setFirstName(e.target.value); setLoad(false)}}/>
       <input  className="w-auto h-12  rounded-lg m-5 border-black"  placeholder="    Last Name "onChange={(e)=>{setLastName(e.target.value); setLoad(false)}} />
       <input type = "password" className="w-auto h-12  rounded-lg m-5 border-black"  placeholder="    password " onChange={(e)=>{setPassword(e.target.value); setLoad(false)}}/>
       
      <div className="flex justify-center"> <button className="h-8 w-44 text-xl bg-green rounded-xl m-6" onClick={()=>{Submit()}}>{(load)?"Loading ..." : "Create Account"}</button></div>
      <div className="flex justify-center">
        Already has an account? Please  <Link to = "/signin" className="ml-1  text-black bg-green rounded-md px-2" >Login</Link>
      </div>
     
      </div>
      </div>
      </div>
  )


}