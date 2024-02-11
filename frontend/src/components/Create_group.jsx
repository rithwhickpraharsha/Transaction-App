import { useDeferredValue, useEffect, useState } from "react";
import Search from "./ui_components/Search";
import { useRecoilState, useRecoilValue } from "recoil";
import {Search_text, Users} from'./states/SidebarStates';
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import Search_group from "./ui_components/Search_group";
import { ToastContainer, toast } from "react-toastify";

export default function Create_group(){
   
    // users array ..use effect re renders when users changes based on input.
    const [users,setUsers] = useRecoilState(Users);
    const[load,setLoad] = useState(true);
    const search_text = useRecoilValue(Search_text);
    const [name,setName] = useState('');
    const user_data = JSON.parse(localStorage.getItem('paytm-app-basic'));
    const navigate = useNavigate();
    const [selected_users,setSelected_users] = useState([]);

    useEffect(()=>{
        async function load_users(){
          console.log(search_text);
          const response = await axios.get(`https://transactions-app-backend.onrender.com/api/v1/user/bulk?filter=${search_text}`,{headers:{Authorization:`Bearer ${user_data.token}`}});
          setUsers(response.data.users);
          setLoad(false);
        
        };

        load_users();
     
    },[search_text]);


   function Add_user(user){
   
    let match = selected_users.filter((x)=>{
        
        if((x.userId == user._id)&&(x.username == user.username)){
 
            return true;
        }
        else{
            return false;
        }
    });
    if(match.length == 0){
        setSelected_users([...selected_users,{userId:user._id,username:user.username}]);
        toast.success(`${user.username} Added`);
    }
    else{
        toast.error(`${user.username} Already Added`);
        return;
    }
   }

   async function FinalCreate(){

   if(name == '' || selected_users.length == 0){
    toast.error("Please enter group Name and select users to add");
    return;
   }
   try{
   const result = await axios.post('https://transactions-app-backend.onrender.com/api/v1/group/create',{name:name,users:selected_users},{headers:{Authorization: `Bearer ${JSON.parse(localStorage.getItem('paytm-app-basic')).token}`}});
  
   toast.success(result.data.msg);  
   setTimeout(()=>{navigate('/dashboard')},2000);
}
   catch(err){
    console.log(err);
   }


   }
   useEffect(()=>{
    const item = localStorage.getItem('paytm-app-basic');
    if(!item){
     navigate("/");
    }
    },[]);
   
    return(
        <div >
            <ToastContainer />
            <div className="text-3xl font-bold flex justify-center m-14">
                Group Creation
            </div>
            <div className="w-full flex justify-center">
             <input type = "text" required placeholder = "                  Enter Group Name         "  className="border border-black bg-gray-50 h-14 w-[50vw] rounded-md m-5" onChange={(e)=>{setName(e.target.value)}}/>
            </div>
    
        <div className="w-full flex justify-center">

        <Search_group/>
        </div>
        {(load)?<div className="h-full w-full flex justify-center items-center text-3xl m-6">Loading ...</div>:<div>
           <div className="h-64 overflow-auto">
            <ul>
                {
                  users.map((user)=>{
                    return <li><button className="h-auto w-full p-2 bg-green m-2 rounded-xl" onClick={()=>{Add_user(user)}}>{user.username}</button></li>
                  })
                }
            </ul>
            </div>
        </div>
    }
    <div className="flex justify-center" ><button className="h-auto w-32 p-3 m-3 bg-green rounded-lg" onClick={()=>{FinalCreate()}}>Create</button></div>
        </div>
    )
}