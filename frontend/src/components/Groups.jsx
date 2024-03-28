import axios from "axios";
import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom"

export default function Groups(){
    const [groups,setGroups] = useState([]);
    const [load,setLoad] = useState(true);
    const navigate = useNavigate();
    
    function Create(){
        navigate("/group/create");
    }
    useEffect(()=>{
        async function get_groups(){
            const result = await axios.get('https://transactions-app-backend.onrender.com/api/v1/group/crews',{headers:{Authorization: `Bearer ${JSON.parse(localStorage.getItem('paytm-app-basic')).token}`}})
            console.log(result.data);
            setGroups(result.data.groups);
            setLoad(false);
        }
        get_groups();
    },[]);
    useEffect(()=>{
        const item = localStorage.getItem('paytm-app-basic');
        if(!item){
         navigate("/");
        }
        },[]);
    return (
       <div className="overflow-auto">
        <button className="h-auto w-auto p-2 text-xl bg-green text-black rounded-lg m-2" onClick={()=>{Create()}}>Create Group</button>
        <h1 className="text-3xl font-bold m-4">Groups</h1>
        {(load)? <div className="text-3xl flex justify-center">Loading ...</div>:
        <div className="flex flex-wrap overflow-auto">
            {
                groups.map((group)=>{
                    return (
                        <button className="h-48 w-52 rounded-lg m-3 bg-green flex justify-center items-center text-2xl hover:bg-blue-700" onClick={()=>{navigate(`/group/show?groupId=${group.group_id}`)}}>
                            {group?.name}
                        
                        </button>
                    )
                })
            }

        </div>
}
       </div>
    )
}