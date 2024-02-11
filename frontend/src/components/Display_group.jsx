import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify";





export default function Display_group(){
    const location = useLocation();
    const urlparams = new URLSearchParams(location.search);
    const group_id = urlparams.get('groupId');
    const [group,setGroup] = useState({name:"",Creator:{},participants:[]});
    const [amount,setAmount] = useState(0);
    const [description,setDescription] = useState('');
    const[load,setLoad] = useState(true);
    const navigate = useNavigate();
    async function delete_group(){
        try{
        const result = await axios.post('https://transactions-app-backend.onrender.com/api/v1/group/delete',{group_id:group_id},{headers:{Authorization: `Bearer ${JSON.parse(localStorage.getItem('paytm-app-basic')).token}`}});
        toast.success(result.data.msg);
        setTimeout(()=>{navigate("/dashboard");},2000);
        
    }
        catch(err){
          toast.error(err.response.data.msg);
        }

    }

    async function send_payment_req(){
        //amount,description,users for payment
     
        const result = await axios.post('https://transactions-app-backend.onrender.com/api/v1/request/create',{borrowers:group.participants,amount:amount,description:description},{headers:{Authorization:`Bearer ${JSON.parse(localStorage.getItem('paytm-app-basic')).token}`}});
        toast.success(result.data.msg);
        setDescription('');
        setAmount(0);
    }
    
    useEffect(()=>{
        async function get_group_info(){
            try{
                
           const result = await axios.post("https://transactions-app-backend.onrender.com/api/v1/group/find",{groupId:group_id},{headers:{Authorization : `Bearer ${JSON.parse(localStorage.getItem('paytm-app-basic')).token}`}});
         
           setGroup(result.data.group);
           setLoad(false);
          
            }
            catch(err){
                console.log("axios error get group  ")
                console.log(err)
            }
        }
        
        get_group_info();
       },[]);
       useEffect(()=>{
        const item = localStorage.getItem('paytm-app-basic');
        if(!item){
         navigate("/");
        }
        },[]);
    return(
        <div className="">
            <ToastContainer />
            <div className="flex justify-around items-center ">
                <div className="text-4xl font-bold w-[80vw] flex justify-center">
                    {group.name}
                </div>
                <button className="p-2 text-xl bg-red-500 rounded-lg m-3 hover:bg-red-800" onClick={()=>{delete_group()}}>Delete</button>

            </div>
            <div>
                <div className="text-3xl m-14 font-semibold">
                      Participants
                </div>
                <div className="h-64 overflow-auto">
                    {(load) ? <div className="text-3xl flex justify-center">Loading ....</div>:
                <ul>
                {
                  group.participants.map((user,i)=>{
                   // console.log(user);
                    return <li key={i}><button className="h-auto w-full p-2 bg-green m-2 rounded-xl" onClick={()=>{navigate(`/payManual?receiver=${user.userId}&username=${user.username}`)}}>{user.username}</button></li>
                  })
                  
                }
            </ul>
}
            
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    <div className="flex justify-center items-center">
                    <input type = "number" placeholder="       Enter the amount to split" className="border border-black bg-gray-50 h-10 w-72 hover:border hover:border-orange-600 m-3"  onChange={(e)=>{setAmount(e.target.value)}} />
                    </div>
                    <div className="flex justify-center items-center">
                    <input type = "text" placeholder="              Enter the description for bill" className="border border-black bg-gray-50 h-10 w-72 hover:border hover:border-orange-600 m-3"  onChange={(e)=>{setDescription(e.target.value)}} />
                    </div>
                    <div className="flex justify-center items-center m-3"><button className="p-2 h-auto w-auto  bg-green rounded-lg hover:bg-darkgreen" onClick={()=>{send_payment_req()}}>Split Wise</button></div>
                </div>
                <div className="text-xl  m-3 flex justify-center">
                    * to split amount manually among participants click on the participant above to send payment request.
                </div>
            </div>
            
        </div>
    )
}