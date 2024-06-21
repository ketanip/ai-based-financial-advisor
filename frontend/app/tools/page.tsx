import React from "react";
import CompoundInterestCalculator from "./calculators/CompoundInterestCalculator";
import SimpleInterestCalculator from "./calculators/SimpleInterestCalculator";
import LoanAmortizationCalculator from "./calculators/LoanAmortizationCalculator";
import Link from "next/link";
import { FiServer } from "react-icons/fi";

const ToolsPage = () => {
  return (
    <div className="py-8 max-w-5xl mx-auto">

      <div className="flex items-center">
      <h2 className="text-xl font-bold flex-1">Tools</h2>
      <div className="flex">
        <Link href="/chats" className="hover:underline cursor-pointer flex items-center gap-2">
        <FiServer />
          <span>All Chats</span>
        </Link>
      </div>
      </div>

      <div className="flex flex-col gap-4 mt-4">
       <SimpleInterestCalculator />
       <CompoundInterestCalculator />
       <LoanAmortizationCalculator />
       <small className="text-center">More new calculators coming soon...</small>
      </div>
    </div>
  );
};

export default ToolsPage;
