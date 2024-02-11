import { RecoilRoot, useRecoilState, useRecoilValue } from "recoil";
import Sidebar from "./ui_components/Sidebar";
import { extendes, optionSelected } from "./states/SidebarStates";
import Content from "./Contents";
import { useEffect } from "react";
import Transactions from "./Transactions";
import Customers from "./Users";
import Welcome from "./Welcome";
import { useNavigate } from "react-router-dom";
import Groups from "./Groups";
import Notifications from "./Notifications";


export default function Dashboard(){
 const option = useRecoilValue(optionSelected);
 const navigate = useNavigate();
 const extended = useRecoilValue(extendes);
 useEffect(()=>{
    const item = localStorage.getItem('paytm-app-basic');
   
    if(!item){
     navigate("/");
    }
    },[]);
return(
   
    <div className="flex h-screen overflow-auto">
    <Sidebar />
    <div className={`${extended ? `sm:ml-[260px]` : 'ml-[100px]' } w-full`}>
     {
        (option == 0)?<Welcome/>:(option == 1)? <Content/> : ((option == 2)? <Customers/> : ((option == 5)?<Transactions /> :((option == 6)? <Groups /> : ((option == 7)?<Notifications/> :<Content />))))
     }
    </div>
    </div>
   
   
)


    
}