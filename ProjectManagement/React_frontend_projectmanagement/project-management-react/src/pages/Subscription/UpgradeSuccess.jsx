import { CheckCircledIcon } from "@radix-ui/react-icons"
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';


import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { upgradeSubscription, getUserSubscription } from "../../Redux/Subscription/Action";


const UpgradeSuccess=()=>{
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const {subscription}=useSelector(store=>store);
    const queryParams=new URLSearchParams(location.search);
    const paymentId=queryParams.get("payment_id")
    const planType=queryParams.get("planType")

    useEffect(()=>{
        dispatch(upgradeSubscription({planType}))
        dispatch(getUserSubscription())
    },[])
    return(
        <div className="flex justify-center">
            <Card className="mt-20 p-5 space-y-5 flex flex-col items-center">
                <div className="flex items-center gap-4">
                    <CheckCircledIcon className="h-9 w-9 text-green-500"/>
                    <p className="text-xl">Plan Upgraded Successfully</p>
                </div>
                <div className="space-y-3">
                    <p className="text-green-500"> start date:{subscription.userSubscription?.subscriptionStartDate} </p>
                    <p className="text-red-500"> end date: {subscription.userSubscription?.getSubscriptionEndDate}</p>
                    <p>plan type:{subscription.userSubscription?.planType} </p>
                </div>
                <Button onClick={()=>navigate("/")}>Go to home</Button>

            </Card>

        </div>
    )
}
export  default UpgradeSuccess