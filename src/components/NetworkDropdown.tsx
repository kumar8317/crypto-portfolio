"use client";

import React from "react";
import { Network } from "@tatumio/tatum";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCryptoContext } from "@/contexts/cryptoContext";

const NetworkDropdown = () => {
  const { network, setNetwork } = useCryptoContext();

  return (
    <Select
      value={network}
      onValueChange={(value) => setNetwork(value as Network)}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Network" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={Network.ETHEREUM}>Ethereum</SelectItem>
        <SelectItem value={Network.BITCOIN}>Bitcoin</SelectItem>
        <SelectItem value={Network.POLYGON}>Polygon</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default NetworkDropdown;
