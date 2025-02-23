import './Loading.css'

export default function Loading(){
    return (<div className="loader fixed inset-0 flex flex-row items-center justify-center bg-[#222222b9]  z-50 text-center text-white">
        <span className="element"></span>
        <span className="element "></span>
        <span className="element"></span>
      
      </div>)
}