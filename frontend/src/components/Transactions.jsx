import { useEffect, useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Transactions(){
    const [transactions,setTransactions] = useState([]);
    const[load1,setLoad1] = useState(true);

    useEffect(()=>{
      
    async function get_transactions(){
        try{
       const response = await axios.post('http://localhost:3000/api/v1/account/transactions',{},{headers:{Authorization: `Bearer ${JSON.parse(localStorage.getItem('paytm-app-basic')).token}`}});
        setLoad1(false);
        setTransactions(response.data.transactions);
       
        
        }
        catch(e){
      console.log("Axios error getting transactions frontend");
      console.log(e);
        }

    }

        get_transactions();
    },[]);
    const navigate = useNavigate();
    useEffect(()=>{
const item = localStorage.getItem('paytm-app-basic');
if(!item){
 navigate("/");
}
},[]);
    return(
        <div className="bg-blue-900 h-screen flex flex-col overflow-auto">
            <h1 className="font-bold font-serif text-5xl flex justify-center text-white">Transactions</h1>
            <div className="h-[1px] w-full border border-black ">
            
            </div>
            <div className="flex justify-around text-white text-xl md:text-2xl">
                <h1 className="w-[200px] mx-2">Sender</h1>
                <h1 className="w-[200px] mx-2">Receiver</h1>
                <h1 className="w-[200px] mx-2" >Amount</h1>
                <h1 className="w-[200px] mx-2">Status</h1>
                <h1 className="w-[200px] mx-2">Date</h1>
                <h1 className="w-[200px] mx-2">Time</h1>

            </div>
            {(load1)? <div className="h-full w-full text-3xl text-white flex justify-center items-center">Loading ...</div>:<ul className="list-none p-0 m-0 ">
                    {transactions.map((transaction, index) => (
                    <li key={index} className="flex justify-around items-center text-black md:text-xl h-auto w-auto bg-green m-2 rounded-xl">
                        <div className="w-[200px] mx-2">{transaction._doc.Sender_username}</div>
                        <div className="w-[200px] mx-2">{transaction._doc.Receiver_username}</div>
                        <div className="w-[200px] mx-2">{transaction._doc.Amount}</div>
                        <div className="w-[200px] mx-2">{(transaction._doc.Status) == 'Successful' ? <div className="h-auto bg-darkgreen rounded-lg p-2">Success</div> : <div className="h-auto bg-red-700 rounded-lg p-2">Failed</div>}</div>
                        <div className="w-[200px] mx-2">{transaction.Date}</div>
                        <div className="w-[200px] mx-2">{transaction.Time}</div>
                    </li>
                    ))}
            </ul>
}
        </div>
    )
}