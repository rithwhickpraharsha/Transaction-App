import { useNavigate } from "react-router-dom";
import { Suspense, useEffect, useState,lazy} from "react";
import axios from "axios";
import Card from "./Card";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Content(){
  
    const [payments,setPayments] = useState(0);
    const [balance,setBalance] = useState(0);
    const[load1,setLoad1] = useState(true);
    const[load2,setLoad2] = useState(true);
    const token = JSON.parse(localStorage.getItem('paytm-app-basic')).token;
    useEffect(()=>{
      async function get_balance(){
       const response = await axios.get('http://localhost:3000/api/v1/account/balance',{headers:{Authorization:`Bearer ${token}`}});
       setBalance(response.data.balance);
       setLoad1(false);
      }
      async function get_payments(){
        const response = await axios.get('http://localhost:3000/api/v1/account/payments',{headers:{Authorization:`Bearer ${token}`}});
        setPayments(response.data.payments);
        setLoad2(false);
       }
      get_balance();
      get_payments();
    },[balance]);
    const user = JSON.parse(localStorage.getItem('paytm-app-basic'));
    const navigate = useNavigate();
    useEffect(()=>{
      const item = localStorage.getItem('paytm-app-basic');
      if(!item){
       navigate("/");
      }
      },[]);
    return(
    <div>
      <ToastContainer/>
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 w-screen md:w-full border-b-2">
         <div className="col-span-1 sm:col-span-1 h-[150px]  sm: w-[150px] lg:w-[250px] sm:h-[150px]  lg:h-[250px] rounded-full sm:rounded-full shadow-sm bg-gray-300 overflow-auto m-8"></div>
         <h1 className="col-span-1 sm:col-span-2  text-xl md:text-2xl lg:text-3xl font-mono font-semibold flex justify-start md:justify-center items-center ml-2">{user.username}</h1>
         <div className="col-span-1 sm:col-span-1 flex justify-start md:justify-end items-start m-6 mr-9"><button className=" bg-green text-black p-3 rounded-lg mr-2" onClick={(e)=>{
        navigate("/update");}}>Update</button><button className=" bg-red-700 text-black p-3 rounded-lg " onClick={(e)=>{localStorage.removeItem('paytm-app-basic');
        setTimeout(()=>{navigate("/");},2000);
        toast.success('Logged out Successfully!')}}>Logout</button></div> 
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 mt-24">
      <div className="col-span-1 ml-10 mb-3 md:ml-15 lg:ml-20">{(load1)?<div className="h-[200px] w-[350px] shadow-md bg-blue-900  rounded-3xl flex flex-col justify-center items-center text-2xl text-white">Loading ...</div>:<Card color={"blue"} prop1={balance} prop2 = {"Balance"} />}</div>
      <div className="col-span-1 ml-10 mb-3 md:ml-15 lg:ml-20">{(load2)?<div className="h-[200px] w-[350px] shadow-md bg-blue-900  rounded-3xl flex flex-col justify-center items-center text-2xl text-white">Loading ...</div>:<Card color={"green"} prop1={payments} prop2 = {"Payments"}/>}</div>


    </div>


    </div> 
    )

}

