import { RecoilRoot, useRecoilState, useRecoilValue } from "recoil";
import Sidebar from "./ui_components/Sidebar";
import { optionSelected } from "./states/SidebarStates";
import Content from "./Contents";
import { useEffect } from "react";
import Transactions from "./Transactions";
import Customers from "./Users";
import Welcome from "./Welcome";
import { useNavigate } from "react-router-dom";


export default function Dashboard(){
 const option = useRecoilValue(optionSelected);
 const navigate = useNavigate();
 useEffect(()=>{
    const item = localStorage.getItem('paytm-app-basic');
   
    if(!item){
     navigate("/");
    }
    },[]);
return(
   
    <div className="flex">
    <Sidebar />
    <div className="sm:ml-64 w-full">
     {
        (option == 0)?<Welcome/>:(option == 1)? <Content/> : ((option == 2)? <Customers/> : ((option == 5)?<Transactions /> : <Content />))
     }
    </div>
    </div>
   
   
)


    
}