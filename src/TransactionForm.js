import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TransactionForm = () => {
  const [CurrentAmount, setCurrentAmount] = useState("5000");
  const [WithdrawAmount, setWithdrawAmount] = useState("");
  const [response, setResponse] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let AfterWithdrawAmt = CurrentAmount - WithdrawAmount;
      const res = await axios.post(
        "https://1grucphulb.execute-api.us-east-1.amazonaws.com/dev/predict",
        {
          data: CurrentAmount + "," + AfterWithdrawAmt,
        }
      );
      setResponse(res.data);

      if (res.status === 200) {
        if (res.data.body === "1") {
          toast.warning("This is a SCAM!");
        } else if (res.data.body === "0") {
          toast.success("This is probably not a scam.");
        }
      } else {
        toast.error("Unexpected response from server.");
      }
    } catch (error) {
      console.error("Error making transaction:", error);
      toast.error("Failed to make transaction.");
    }
  };

  return (
    <div>
      <h1>Bank Transaction</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Current Amount in your bank account:</label>
          <input
            type="number"
            value={CurrentAmount}
            onChange={(e) => setCurrentAmount(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Withdraw from your bank account:</label>
          <input
            type="number"
            value={WithdrawAmount}
            onChange={(e) => setWithdrawAmount(e.target.value)}
            required
          />
        </div>
        <button type="submit">Make Transaction</button>
      </form>
      <ToastContainer />
      {response && (
        <div>
          <h2>Response from API:</h2>
          <pre>{JSON.stringify(response, null)}</pre>
        </div>
      )}
    </div>
  );
};

export default TransactionForm;
