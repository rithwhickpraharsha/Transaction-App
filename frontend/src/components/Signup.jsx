
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect,useState } from "react";

export default function Signup(){
     const navigate = useNavigate();
     const [username,setUsername] = useState('');
     const [firstName,setFirstName] = useState('');
     const [lastName,setLastName] = useState('');
     const [password,setPassword] = useState('');
     
      async function Submit(){

         try{
          const res = await axios.post("http://localhost:3000/api/v1/user/signup",{username:username,firstName:firstName,lastName:lastName,password:password});
          const token = res.data.userId;
          localStorage.setItem('paytm-app-basic',JSON.stringify({"username":res.data.username,"token":token}));
          navigate("/dashboard");
         }catch(err){
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
      <div className="h-[400px] w-[450px] md:h-[5000px] lg:h-[600px] rounded-2xl shadow-sm bg-lightwhite overflow-auto">
      <div className="flex flex-col">
       <div className="text-2xl font-semibold w-auto flex justify-center m-6">
        Create Account
       </div>

       <input className="w-auto h-12  rounded-lg m-5 border-black"  placeholder="    Username " onChange={(e)=>{setUsername(e.target.value)}}/>
       <input className="w-auto h-12  rounded-lg m-5 border-black"  placeholder="    First Name " onChange={(e)=>{setFirstName(e.target.value)}}/>
       <input  className="w-auto h-12  rounded-lg m-5 border-black"  placeholder="    Last Name "onChange={(e)=>{setLastName(e.target.value)}} />
       <input type = "password" className="w-auto h-12  rounded-lg m-5 border-black"  placeholder="    password " onChange={(e)=>{setPassword(e.target.value)}}/>
       
      <div className="flex justify-center"> <button className="h-8 w-44 text-xl bg-green rounded-xl m-6" onClick={()=>{Submit()}}>Create Account</button></div>
      <div className="flex justify-center">
        Already has an account? Please  <Link to = "/signin" className="ml-1  text-black bg-green rounded-md px-2" >Login</Link>
      </div>
     
      </div>
      </div>
      </div>
  )


}