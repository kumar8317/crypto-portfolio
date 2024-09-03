"use client";

import React from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useCryptoContext } from "@/contexts/cryptoContext";

const BalanceDisplay = () => {
  const { balance, error } = useCryptoContext();

  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Balance</h3>
      {balance && <p className="text-xl font-bold">{balance}</p>}
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default BalanceDisplay;
