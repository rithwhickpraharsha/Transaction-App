import { useDeferredValue, useEffect, useState } from "react";
import Search from "./ui_components/Search";
import { useRecoilState, useRecoilValue } from "recoil";
import {Search_text, Users} from'./states/SidebarStates';
import axios from "axios";
import {useNavigate} from 'react-router-dom';

export default function Customers(){
   
    // users array ..use effect re renders when users changes based on input.
    const [users,setUsers] = useRecoilState(Users);
    const[load,setLoad] = useState(true);
    const search_text = useRecoilValue(Search_text);

    const user_data = JSON.parse(localStorage.getItem('paytm-app-basic'));
    const navigate = useNavigate();
    useEffect(()=>{
        async function load_users(){
          const response = await axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${search_text}`,{headers:{Authorization:`Bearer ${user_data.token}`}});
          setUsers(response.data.users);
          setLoad(false);
        
        };

        load_users();
     
    },[search_text]);



   
    return(
        <div>
        <div className="w-full">
        <Search />
        </div>
        {(load)?<div className="h-full w-full flex justify-center items-center text-3xl m-6">Loading ...</div>:<div>
            <ul>
                {
                  users.map((user)=>{
                    return <li><button className="h-auto w-full p-2 bg-green m-2 rounded-xl" onClick={()=>{console.log(user);navigate(`/payment?id=${user._id}&user=${user.username}`); }}>{user.username}</button></li>
                  })
                }
            </ul>
        </div>
    }
        </div>
    )
}