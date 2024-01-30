import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Welcome(){

const navigate = useNavigate();
return(
    <div>
        <ToastContainer/>
    <div className="flex justify-end mt-2 mr-2"><button className=" bg-red-700 text-black p-3 rounded-lg " onClick={(e)=>{localStorage.removeItem('paytm-app-basic');
    setTimeout(()=>{navigate("/");},2000);
    toast.success('Logged out Successfully!')}}>Logout</button></div>
    <div className="h-screen w-full flex justify-center items-center text-3xl">
      Welcome!
    
      
    </div>

    </div>
)


}