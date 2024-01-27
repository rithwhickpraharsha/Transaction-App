import { RecoilRoot, useRecoilState, useRecoilValue } from "recoil";
import Sidebar from "./ui_components/Sidebar";
import { optionSelected } from "./states/SidebarStates";
import Content from "./Contents";

import Payment from "./Payments";
import Customers from "./Users";


export default function Dashboard(){
 const option = useRecoilValue(optionSelected);
return(
   
    <div className="flex">
    <Sidebar />
    <div className="sm:ml-64 w-full">
     {
        (option == 1)? <Content/> : ((option == 2)? <Customers/> : ((option == 5)?<Payment /> : <Content />))
     }
    </div>
    </div>
   
   
)


    
}