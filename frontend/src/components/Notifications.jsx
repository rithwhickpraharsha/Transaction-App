import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";


export default function Notifications(){
    const[noti,setNoti] = useState([]);
    const [load,setLoad] = useState(true);
    const navigate = useNavigate();
    useEffect(()=>{
        async function get_requests(){
           const result = await axios.get('https://transactions-app-backend.onrender.com/api/v1/request/find',{headers:{Authorization: `Bearer ${JSON.parse(localStorage.getItem('paytm-app-basic')).token}`}});
           console.log(result.data.notifications)
           setNoti(result.data.notifications);
           setLoad(false)

        }
        get_requests();

    },[]);
    useEffect(()=>{
        const item = localStorage.getItem('paytm-app-basic');
        if(!item){
         navigate("/");
        }
        },[]);
    return(
        <div className="overflow-auto h-screen  bg-blue-900">
            <div className="text-5xl text-white font-serif flex justify-center">
                Payment requests
            </div>
            <div className="border  border-black border-x-2 shadow-lg"></div>
            <div className="flex justify-between m-3">
                <div className="text-2xl text-white w-[20vw]">
                    Sender
                </div>
                <div className="text-2xl text-white w-[50vw] ">
                    Description
                </div>
                <div className="text-2xl text-white w-[10vw]">
                    Pay
                </div>
            </div>
            {(load)? <div className="text-3xl text-white flex justify-center"> Loading ...</div>:
            <ul>
                {
                    noti.map((request,i)=>{
                        if(request != null){
                            return(
                                <li key={i} className="flex justify-between m-3 bg-green rounded-lg">
                                    <div className="text-xl lg:text-2xl w-[20vw] flex items-center overflow-auto    ">
                                        {request.creator.username}
                                    </div>
                                    <div className="text-xl w-[50vw] flex items-center overflow-auto">
                                        {request.description}
                                    </div>
                                    <div className="w-[20vw] flex items-center p-3 justify-center">
                                        <button className="h-auto w-auto p-3 bg-violet-900 rounded-lg hover:bg-darkgreen text-white" onClick={()=>{navigate(`/Requestpay?id=${request.creator.userId}&user=${request.creator.username}&amount=${request.amount}`)}}>Pay {request.amount}</button>
                                    </div>
                                </li>
                            )
                        }
                    })
                }
            </ul>
}
        </div>
    )
}