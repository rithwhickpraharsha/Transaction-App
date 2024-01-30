


export default function Card_inner({color,prop1,prop2}){
    return(
        <div className="h-[200px] w-[350px] shadow-md bg-blue-900  rounded-3xl flex flex-col justify-center items-center">
   <div className="text-5xl text-white font-bold">{prop1}</div>
    <div className="text-2xl  text-white mt-6">{prop2}</div>
        
    </div>
    )
}