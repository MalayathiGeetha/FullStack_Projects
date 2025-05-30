import {Button} from '@/components/ui/button'
import {CheckCircledIcon } from '@radix-ui/react-icons'
import { useDispatch } from 'react-redux'
import { createPayment } from '../../Redux/Payment/Action';
const SubscriptionCard=({data})=>{
    const dispatch=useDispatch();
    const handleUpgrade=()=>{
        dispatch(createPayment({planType:data.planType,jwt:localStorage.getItem("jwt")}))
    }
    return(
        <div className="rounded-xl bg-[#1b1b1b] bg-opacity-20 shadow-[#14173b] shadow-2xl card p-5 space-y-5 w-[18rem]">
            <p>{data.planName}</p>
            <p>
                <span classNam="text-xl font-semibold">&#8377;{data.price}/</span>
                <span>{data.planType}</span>
            </p>
            {data.planType=="ANNUALLY" && <p className="text-green-500">30% off</p>}

            <Button onClick={handleUpgrade} className="w-full">
                {data.buttonName}
            </Button>
            <div>
                {data.features.map((item)=>
                <div className="flex items-center gap-2">
                    <CheckCircledIcon/>
                    <p>{item}</p>
                </div>
                )}
                
            </div>
        </div>
    )
}

export default SubscriptionCard;