import {Button} from '@/components/ui/button'
import { useDispatch, useSelector } from "react-redux";
import {acceptInvitation} from "@/Redux/Project/Action"
import { useNavigate,useLocation } from 'react-router-dom';

const AcceptInvitation=()=>{
    const dispatch=useDispatch();
    const location=useLocation();
    const urlParams=new URLSearchParams(location.search);
    const token=urlParams.get('token');
    const navigate=useNavigate();

    const handleAcceptInvitation=()=>{
        dispatch(acceptInvitation({token,navigate}))
    }
    return(
        <div className="h-[85vh] flex flex-col justify-center items-center">
            <h1 className="py-5 font-semibold  text-xl">You are invited to join the project</h1>
            <Button onClick={handleAcceptInvitation}>Accept Invitation</Button>
        </div>
    )
}
export default AcceptInvitation