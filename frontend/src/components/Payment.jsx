import { useState,useEffect } from "react";
import { useParams,useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

export default function Payment(){
    const[amount,setAmount] = useState();
const queryString = window.location.search;
const location = useLocation();
const urlParams = new URLSearchParams(location.search);

const id = urlParams.get('id');
const user = urlParams.get('user');
function handleSucessSubmit(){
    console.log("Toast Sucess");
 return toast.success('Payment Successful!');
  };

  function handleSubmitError(e){
    return toast.error(e);
  }

async function Make_Payment(){
    try{
        if(amount > 100000){
            handleSubmitError("Amount should be less than 1,00,000");
              return;
        }
    const response = await axios.post('https://transactions-app-backend.onrender.com/api/v1/account/transfer',{to:id,amount:amount},{headers:{Authorization:`Bearer ${JSON.parse(localStorage.getItem('paytm-app-basic')).token}`}});
    console.log(response);
    handleSucessSubmit();
    setTimeout(()=>{navigate('/dashboard')},2000);
    }
    catch(err){
        handleSubmitError(err.response.data.msg);
        console.log(err);
    }
}

const navigate = useNavigate();
useEffect(()=>{
    const item = localStorage.getItem('paytm-app-basic');
    if(!item){
     navigate("/");
    }
    },[]);

    return (
        <div className="bg-green h-screen p-4">
            <ToastContainer/>
        <div class="flex justify-center items-center overflow-auto m-4 md:m-8">
        <div className="h-[350px] w-[400px] md:h-[450px] md:w-[500px] bg-violet-900 shadow-lg overflow-auto flex flex-col justify-around items-center rounded-xl">
             <div className=" h-20 w-64 md:w-80 lg:w-96 m-2 border border-violet-950 bg-violet-950 text-white flex justify-center items-center text-2xl md:text-3xl lg:text-4xl rounded-xl">{user}</div>
             <input type="number" placeholder = "                   Enter Amount" className=" h-20 w-64 md:w-80 lg:w-96 m-2 border border-violet-950 bg-violet-950 text-white flex justify-center items-center rounded-xl " onChange={(e)=>{setAmount(e.target.value)}}></input>
             <button className="h-10 w-auto p-2 bg-green rounded-xl" onClick={(e)=>{Make_Payment()}}>Click to Pay</button>
        </div>
        </div>

        </div>
        
    )
}