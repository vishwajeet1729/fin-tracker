import { useUser } from "@clerk/clerk-react";
import { createContext, useContext, useEffect, useState } from "react";

export interface FinancialRecord {
  _id?: string;
  userId: string;
  date: Date;
  description: string;
  amount: number;
  category: string;
  paymentMethod: string;
}

interface FinancialRecordsContextType {
  records: FinancialRecord[];
  addRecord: (record: FinancialRecord) => void;
  updateRecord: (id: string, record: FinancialRecord) => void;
  deleteRecord: (id: string) => void;
}
export const FinancialRecordsContext = createContext<
  FinancialRecordsContextType | undefined
>(undefined);

export const FinancialRecordsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [records, setRecords] = useState<FinancialRecord[]>([]);
  const { user } = useUser();
  const fetchRecords = async () => {
    if (!user) return;
    const response = await fetch(
      `http://localhost:3001/financial-records/getAllByUserID/${user?.id}`
    );

    if (response.ok) {
      const records = await response.json();
      setRecords(records);
      console.log(records);
    }
  };
  useEffect(() => {
    fetchRecords();
  }, [user]);

  const addRecord = async (record: FinancialRecord) => {
    const response = await fetch("http://localhost:3001/financial-records", {
      method: "POST",
      body: JSON.stringify(record),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const newRecord = await response.json();
      setRecords((prev) => [...prev, newRecord]);
    }
  };
  const updateRecord = async (id: string, newRecord: FinancialRecord) => {
    const response = await fetch(
      `http://localhost:3001/financial-records/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(newRecord),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // console.log("made a put request")
    if (response.ok) {
      const newRecord = await response.json();
      const ind = records.findIndex((record) => record._id == id);
      if (ind != -1) records[ind] = newRecord;
      setRecords(records);
    }
  };

  const deleteRecord = async (id: string) => {
    console.log("clicked on the delete")
    const response = await fetch(
      `http://localhost:3001/financial-records/${id}`,
      {
        method: "DELETE"
      }
    );
    // console.log("made a put request")
    const lol=await response.json();
    if (response.ok) {
       
      setRecords((prev)=> prev.filter(record => record._id !== lol._id));
    }
  };

  return (
    <FinancialRecordsContext.Provider
      value={{ records, addRecord, updateRecord, deleteRecord }}
    >
      {children}
    </FinancialRecordsContext.Provider>
  );
};

export const useFinancialRecords = () => {
  const context = useContext<FinancialRecordsContextType | undefined>(
    FinancialRecordsContext
  );
  if (!context) {
    throw new Error(
      "use financial records must be within the financial record provider vishwajeet"
    );
  }
  return context;
};
