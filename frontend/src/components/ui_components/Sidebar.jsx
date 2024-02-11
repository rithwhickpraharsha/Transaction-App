import { useNavigate } from "react-router-dom"
import { useRecoilState, useSetRecoilState } from "recoil";
import { optionSelected,extendes } from "../states/SidebarStates";
import { useState } from "react";
import { BsArrowBarLeft,BsArrowBarRight } from "react-icons/bs";



export default function Sidebar(){
    const navigate = useNavigate();
    const setOption = useSetRecoilState(optionSelected);
    const [extend,setExtend] = useRecoilState(extendes);
    return(
  
       <>
   <aside className="h-screen absolute z-10 bg-green shadow-lg">

<nav className="">
<div className="m-3 flex">
<svg id="logo-85" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{fill:"black"}}><path class="ccustom text-purple-500" fill-rule="evenodd" clip-rule="evenodd" d="M10 0C15.5228 0 20 4.47715 20 10V0H30C35.5228 0 40 4.47715 40 10C40 15.5228 35.5228 20 30 20C35.5228 20 40 24.4772 40 30C40 32.7423 38.8961 35.2268 37.1085 37.0334L37.0711 37.0711L37.0379 37.1041C35.2309 38.8943 32.7446 40 30 40C27.2741 40 24.8029 38.9093 22.999 37.1405C22.9756 37.1175 22.9522 37.0943 22.9289 37.0711C22.907 37.0492 22.8852 37.0272 22.8635 37.0051C21.0924 35.2009 20 32.728 20 30C20 35.5228 15.5228 40 10 40C4.47715 40 0 35.5228 0 30V20H10C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0ZM18 10C18 14.4183 14.4183 18 10 18V2C14.4183 2 18 5.58172 18 10ZM38 30C38 25.5817 34.4183 22 30 22C25.5817 22 22 25.5817 22 30H38ZM2 22V30C2 34.4183 5.58172 38 10 38C14.4183 38 18 34.4183 18 30V22H2ZM22 18V2L30 2C34.4183 2 38 5.58172 38 10C38 14.4183 34.4183 18 30 18H22Z" fill="#0b0c0d">
</path></svg>
<div className={`ml-3 text-2xl ${(extend)? 'w-32':'w-0'} overflow-hidden`}>PayKaro</div>
<button className="text-2xl  hover:bg-gray-600 hover:text-white rounded-md" onClick={()=>{setExtend(!extend)}}>
    {extend ? <BsArrowBarLeft/>:<BsArrowBarRight/>}
</button>
</div>

</nav>
<ul className="m-3 mt-5">
    <li className="m-3 flex mt-8 hover:bg-blue-700 rounded-md">
      <div onClick={()=>{setOption(1)}}>
    <svg class="w-5 h-5 mr-3 mb-5 mt-4  text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21" >
      <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
      <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
   </svg>
   </div>
        <button className={`font-serif text-xl ${!extend ? 'overflow-hidden w-0' :'w-auto'}`} onClick={()=>{setOption(1)}}>Dashboard</button>
    </li>
    <li className="m-3 flex mt-8 hover:bg-blue-700 rounded-md">
    <div onClick={()=>{setOption(2)}}>
    <svg class="flex-shrink-0 w-5 h-5 mb-5 mt-4 mr-3 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
      <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"/>
   </svg>
   </div>
   <button className={`font-serif text-xl ${!extend ? 'overflow-hidden w-0' :'w-auto'}`} onClick={()=>{setOption(2)}}>Pay</button>
   
    </li>
    <li className="m-3 flex mt-8 `hover:bg-blue-700 rounded-md">
    <div onClick={()=>{setOption(5)}} className="hover:bg-blue-700">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-3 mt-2">
   <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
   </svg>
    </div>
   <button className={`hover:bg-blue-700 font-serif text-xl ${!extend ? 'overflow-hidden w-0' :'w-auto'}`} onClick={()=>{setOption(5);}}>Transactions</button>
 
    </li>
    <li className="m-3 flex mt-8 `hover:bg-blue-700 rounded-md">
    <div onClick={()=>{setOption(6)}} className="hover:bg-blue-700">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-2 mt-1">
    <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
    </svg>

    </div>
   <button className={`hover:bg-blue-700 font-serif text-xl ${!extend ? 'overflow-hidden w-0' :'w-auto'}`} onClick={()=>{setOption(6);}}>Groups</button>
 
    </li>
    <li className="m-3 flex mt-8 `hover:bg-blue-700 rounded-md">
    <div onClick={()=>{setOption(7)}} className="hover:bg-blue-700">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-3 mt-1">
    <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5" />
    </svg>

    </div>
   <button className={`hover:bg-blue-700 font-serif text-xl ${!extend ? 'overflow-hidden w-0' :'w-auto'}`} onClick={()=>{setOption(7);}}>Requests</button>
 
    </li>
</ul>





</aside>
</>

    )
}