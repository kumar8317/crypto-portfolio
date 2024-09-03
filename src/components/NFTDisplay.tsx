"use client";

import React from "react";
import { useCryptoContext } from "@/contexts/cryptoContext";
import NFTComponent from "./NFTComponent";

interface NFT {
  metadata: {
    name?: string;
    image?: string;
  };
}

const NFTDisplay = () => {
  const {
    nfts,
    setNfts,
    nftLoading: loading,
    setNftLoading,
    nftError: error,
    setNftError,
  } = useCryptoContext();

  if (loading) {
    return <div>Loading NFTs...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Your NFTs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {nfts.map((nft, index) => (
          <NFTComponent key={index} metadata={nft.metadata} />
        ))}
      </div>
    </div>
  );
};

export default NFTDisplay;
