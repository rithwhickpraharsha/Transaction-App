import { useNavigate } from "react-router-dom";
import Card from "./Card";

export default function Content(){
    const payments = 30;
    const balance = 20000;
    const user = JSON.parse(localStorage.getItem('paytm-app-basic'));
    const navigate = useNavigate();
    return(
    <div>
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 w-screen md:w-full border-b-2">
         <div className="col-span-1 sm:col-span-1 h-[150px]  sm: w-[150px] lg:w-[250px] sm:h-[150px]  lg:h-[250px] rounded-full sm:rounded-full shadow-sm bg-gray-300 overflow-auto m-8"></div>
         <h1 className="col-span-1 sm:col-span-2  text-xl md:text-2xl lg:text-3xl font-mono font-semibold flex justify-start md:justify-center items-center ml-2">{user.username}</h1>
         <div className="col-span-1 sm:col-span-1 flex justify-start md:justify-end items-start m-6 mr-9"><button className=" bg-red-700 text-black p-3 rounded-lg " onClick={(e)=>{localStorage.removeItem('paytm-app-basic');
        navigate("/signin");}}>Logout</button></div> 
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 mt-24">
      <div className="col-span-1 ml-10 mb-3 md:ml-15 lg:ml-20"><Card color={"blue"} prop1={balance} prop2 = {"Balance"}/></div>
      <div className="col-span-1 ml-10 mb-3 md:ml-15 lg:ml-20"><Card color={"green"} prop1={payments} prop2 = {"Payments"}/></div>


    </div>


    </div> 
    )

}

