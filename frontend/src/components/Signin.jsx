import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect,useState } from "react";
export default function Signin(){
    const navigate = useNavigate();
     const [username,setUsername] = useState('');
     const [password,setPassword] = useState('');
     async function Submit(){

        try{
         const res = await axios.post("http://localhost:3000/api/v1/user/signin",{username:username,password:password});
         const token = res.data.token;
         localStorage.setItem('paytm-app-basic',JSON.stringify({"username":res.data.username,"token":res.data.token}));
         navigate("/dashboard");
        }catch(err){
         console.log(err);
        }

     }

useEffect(()=>{
const item = localStorage.getItem('paytm-app-basic');
if(item){
    console.log(item);
 navigate("/dashboard");
}
},[])

        return (
          <div className="h-screen w-screen flex justify-center items-center bg-green">
      <div className="h-[300px] w-[450px] md:h-[350px] lg:h-[400px] rounded-2xl shadow-sm bg-lightwhite overflow-auto">
      <div className="flex flex-col">
       <div className="text-2xl font-semibold w-auto flex justify-center m-6">
        Login
       </div>

       <input className="w-auto h-12  rounded-lg m-5 border-black"  placeholder="    Username " onChange={(e)=>{setUsername(e.target.value)}}/>
       <input type = "password" className="w-auto h-12  rounded-lg m-5 border-black"  placeholder="    password " onChange={(e)=>{setPassword(e.target.value)}}/>
       
      <div className="flex justify-center"> <button className="h-8 w-44 text-xl bg-green rounded-xl m-6" onClick={()=>{Submit()}}>Login</button></div>
      <div className="flex justify-center">
        Already has an account? Please  <Link to = "/signup" className="ml-1  text-black bg-green rounded-md px-2   ">Signup</Link>
      </div>
     
      </div>
      </div>
      </div>
  )


}