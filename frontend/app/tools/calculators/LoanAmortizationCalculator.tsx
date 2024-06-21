"use client";
import { humanizeNumber } from "@/utils";
import React, { useState } from "react";

const LoanAmortizationCalculator = () => {
  const [principleAmount, setPrincipleAmount] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [totalLoanTermMonths, setTotalLoanTermMonths] = useState(0);
  const [finalValue, setFinalValue] = useState("");

  const calculate = () => {
    const monthlyInterestRate = interestRate / 100 / 12; // Convert annual interest rate to monthly rate
    const numerator = principleAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalLoanTermMonths);
    const denominator = Math.pow(1 + monthlyInterestRate, totalLoanTermMonths) - 1;
    const monthlyPayment = numerator/ denominator;
    setFinalValue(humanizeNumber(monthlyPayment));
  };  

  return (
    <>
      <div className="">
        <h2 className="font-semibold my-4">3. Loan Repayment Calculator</h2>
        <div className="flex gap-4">
          <div className="flex flex-col gap-2">
            <span>Principle Amount</span>
            <input
              type="number"
              name="principle_amount"
              id="principle_amount"
              placeholder="10000"
              className="input input-bordered w-full"
              onChange={e => setPrincipleAmount(Number(e.target.value))}
            />
          </div>
          <div className="flex flex-col gap-2">
            <span>Yearly interest rate</span>
            <input
              type="number"
              name="rate_of_interest"
              id="rate_of_interest"
              placeholder="9.00"
              className="input input-bordered w-full"
              onChange={e => setInterestRate(Number(e.target.value))}
            />
          </div>

          <div className="flex flex-col gap-2">
            <span>Loan Term in Months</span>
            <input
              type="number"
              name="principle_amount"
              id="principle_amount"
              placeholder="4"
              min={1}
              className="input input-bordered w-full"
              onChange={e => setTotalLoanTermMonths(Number(e.target.value))}
            />
          </div>

          <div className="flex flex-col gap-2">
            <span>Total Monthly Payment</span>
            <input
              type="text"
              name="total_monthly_payment"
              id="total_monthly_payment"
              placeholder="0"
              disabled
              value={finalValue}
              
              className="input input-bordered w-full disabled"
            />
          </div>
        </div>
      </div>
      <button className="btn btn-ghost" onClick={e => calculate()}>Calculate</button>
      <hr />
    </>
  );
};

export default LoanAmortizationCalculator;
