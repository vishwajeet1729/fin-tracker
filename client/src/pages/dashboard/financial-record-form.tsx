import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useFinancialRecords } from "../../contexts/financial-record-context";
export const FinancialRecordForm = () => {
  const [description, setDescription] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [category, setcategory] = useState<string>("");
  const [paymentMethod, setPaymentmethod] = useState<string>("");
  const { addRecord} = useFinancialRecords();
  const { user } = useUser();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newRecord = {
      userId: user?.id ?? "",
      date: new Date(),
      description: description,
      amount: parseFloat(amount),
      category: category,
      paymentMethod: paymentMethod,
    };
   
    addRecord(newRecord);
    setDescription("");
    setAmount("");
    setPaymentmethod("");
    setcategory("");

    // console.log(event);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label>Description</label>
          <input
            type="text"
            required
            className="input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label htmlFor="">Amout:</label>
          <input
            type="number"
            name=""
            id=""
            required
            className="input"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label htmlFor="">Category:</label>
          <select
            name=""
            id=""
            required
            className="input"
            onChange={(e) => setcategory(e.target.value)}
          >
            <option value={category}>Select a Category</option>
            <option value="Food">Food</option>
            <option value="Rent">Rent</option>
            <option value="Salary">Salary</option>
            <option value="Utilities">Utilities</option>

            <option value="Entertainment">Entertainment</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="form-field">
          <label htmlFor="">Paymrnt Method:</label>
          <select
            name=""
            id=""
            required
            className="input"
            onChange={(e) => setPaymentmethod(e.target.value)}
          >
            <option value={paymentMethod}>Select a payment method</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Cash">Cash</option>
            <option value="Bank transfer"> Bank transfer</option>
          </select>
        </div>

        <button type="submit" className="button">
          Add Record
        </button>
      </form>
    </div>
  );
};
