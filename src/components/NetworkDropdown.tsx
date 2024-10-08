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
  const { network, setNetwork, setBalance, setNfts, setAddress } =
    useCryptoContext();

  const handleChange = (value: Network) => {
    setNetwork(value as Network);
    setBalance("");
    setNfts([]);
    setAddress("");
  };
  return (
    <Select
      value={network}
      onValueChange={(value) => handleChange(value as Network)}
    >
      <SelectTrigger className="w-[180px] bg-gray-100">
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
