"use client";
import { humanizeNumber } from "@/utils";
import React, { useState } from "react";

const CompoundInterestCalculator = () => {
  const [principleAmount, setPrincipleAmount] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [numberOfYears, setNumberOfYears] = useState(0);
  const [finalValue, setFinalValue] = useState("");

  const calculate = () => {
    const futureValue = principleAmount * Math.pow(1 + interestRate / 100, numberOfYears);
    setFinalValue(humanizeNumber(futureValue)); // Adjusted to round to 2 decimal places
  };  

  return (
    <>
      <div className="">
        <h2 className="font-semibold my-4">2. Compound Interest Calculator</h2>
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
            <span>Annual interest rate</span>
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
            <span>Number of years</span>
            <input
              type="number"
              name="principle_amount"
              id="principle_amount"
              placeholder="4"
              className="input input-bordered w-full"
              onChange={e => setNumberOfYears(Number(e.target.value))}
            />
          </div>

          <div className="flex flex-col gap-2">
            <span>Future Value </span>
            <input
              type="text"
              name="future_value"
              id="future_value"
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

export default CompoundInterestCalculator;
