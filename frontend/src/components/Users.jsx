import { useEffect, useState } from "react";
import Search from "./ui_components/Search";
import { useRecoilState, useRecoilValue } from "recoil";
import {Search_text, Users} from'./states/SidebarStates';
import axios from "axios";

export default function Customers(){
   
    // users array ..use effect re renders when users changes based on input.
    const [users,setUsers] = useRecoilState(Users);
    const search_text = useRecoilValue(Search_text);
    const user_data = JSON.parse(localStorage.getItem('paytm-app-basic'));
    
    useEffect(()=>{
        async function load_users(){
          const response = await axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${search_text}`,{headers:{Authorization:`Bearer ${user_data.token}`}});
          setUsers(response.data.users);
        };

        load_users();
     
    },[search_text]);



   
    return(
        <div>
        <div className="w-full">
        <Search />
        </div>
        <div>
            <ul>
                {
                  users.map((user)=>{
                    return <li><button className="h-auto w-full p-2 bg-green m-2 rounded-xl">{user.username}</button></li>
                  })
                }
            </ul>
        </div>
        </div>
    )
}