import "./page.css"
import {useContext, useState} from "react"
import axios from "axios"
import spinner from "../assets/Spinner-0.5s-164px.svg";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ToastContext from "./context/ToastContext"
const API = "https://short-yrld.onrender.com"

const Body = () =>{
    const {toast} = useContext(ToastContext)
    const [shortLink , setShortLink] = useState('')
    const [loading , setLoading] = useState(false)
    const [longLink , setLongLink] = useState('')

    const handleApi = () =>{
        setLoading(true)

        axios.post(`${API}/api/V8/urlshortner`,{longURL : longLink})
        .then((res)=>{
            toast.success("Link Shorted SuccessFully")
            setLoading(false)
            setShortLink(res.data.url.shortURL)
        })
        .catch((e)=>{
            setLoading(false)
            toast.error(e.response.data.message)
        })

    }

    const handleCopy =() =>{
        toast.success("Link Copied")
    }
    return(
        <>
            {loading?<div className="spinner"><img src={spinner} alt="spinner"/></div>:''}
       <div className="main">
        <input placeholder="Enter Url" value={longLink} onChange={(e)=>setLongLink(e.target.value)}/>
        <button onClick={handleApi} title="Short Url">Short</button>
       </div>
       <div className="result main" style={{marginTop:"5%"}}>
{shortLink?(
<>
<h2 style={{color:"white" , backgroundColor:"rgba(0,0,0,0.7)" , padding:"1%" , borderRadius:"10px"}}>SHORT URL</h2>
<input value={shortLink}/>
<CopyToClipboard text={shortLink} onCopy={handleCopy}>
<button style={{width:"5vw"}} title="Copy"><i className="search-icon fa fa-copy"></i></button>
</CopyToClipboard></>):''}
       </div>
        </>
    )
}

export default Body;