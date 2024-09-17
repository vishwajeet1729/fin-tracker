import { useUser } from "@clerk/clerk-react"
import { FinancialRecordForm } from "./financial-record-form";
import { FinancialRecordList } from "./financial-record-list";
import { useFinancialRecords } from "../../contexts/financial-record-context";

export const Dashboard=()=>{

    const {user}=useUser();
     const {records} =useFinancialRecords();
      let val=0;
      records.map((item)=>{
        val+=item.amount;
      })
    return   <div className="dashboard-container">
                   
                   <h1>Welcome {user?.firstName}! Here are your finance</h1>
         <FinancialRecordForm/>
         <div>Total Monthly:${val}</div>
         <FinancialRecordList/>
    </div>
}