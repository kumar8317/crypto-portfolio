"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCryptoContext } from "@/contexts/cryptoContext";

const FetchAssetsForm = () => {
  const { address, setAddress, loading, fetchBalance, fetchNFTs } =
    useCryptoContext();

  const handleFetch = async () => {
    await fetchBalance();
    await fetchNFTs();
  };
  return (
    <div className="flex space-x-2">
      <Input
        placeholder="Enter wallet address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="flex-grow"
      />
      <Button onClick={handleFetch} disabled={loading}>
        {loading ? "Loading..." : "Go"}
      </Button>
    </div>
  );
};

export default FetchAssetsForm;
