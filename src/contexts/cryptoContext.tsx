"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import {
  Bitcoin,
  Ethereum,
  ITatumSdkChain,
  Network,
  NftAddressBalance,
  Polygon,
  TatumSDK,
} from "@tatumio/tatum";

interface CryptoContextType {
  network: Network;
  setNetwork: (network: Network) => void;
  address: string;
  setAddress: (address: string) => void;
  balance: string;
  setBalance: (balance: string) => void;
  error: string;
  setError: (error: string) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  fetchBalance: () => Promise<void>;
  fetchNFTs: () => Promise<void>;
  nfts: NFT[];
  setNfts: (nfts: NFT[]) => void;
  nftError: string;
  setNftError: (error: string) => void;
  nftLoading: boolean;
  setNftLoading: (loading: boolean) => void;
}
interface NFT {
  metadata: {
    name?: string;
    image?: string;
  };
}
const CryptoContext = createContext<CryptoContextType | undefined>(undefined);

export const useCryptoContext = () => {
  const context = useContext(CryptoContext);
  if (!context) {
    throw new Error("useCryptoContext must be used within a CryptoProvider");
  }
  return context;
};

export const CryptoProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [network, setNetwork] = useState<Network>(Network.ETHEREUM);
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [nftError, setNftError] = useState("");
  const [nftLoading, setNftLoading] = useState(false);

  const fetchBalance = async () => {
    setLoading(true);
    setError("");
    setBalance("");

    const tatum = await getTatum();
    console.log(network, "network");
    try {
      const bal = await tatum.address.getBalance({
        addresses: [address],
        tokenTypes: ["native"],
      });

      if (!bal || !bal.data || !bal.data[0]) {
        const err =
          bal.error && bal.error.message ? bal.error.message : "Unknown error";
        const errMessage =
          bal.error && bal.error.message
            ? Array.isArray(bal.error.message)
              ? bal.error.message.join(", ")
              : bal.error.message
            : "Unknown error";
        setError("Unable to fetch balance");
      } else {
        setBalance(`${bal.data[0].balance} ${bal.data[0].asset}`);
      }
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : "An error occurred while fetching the balance."
      );
    }

    tatum.destroy();
    setLoading(false);
  };

  const fetchNFTs = async () => {
    setNftLoading(true);
    setNftError("");

    try {
      const tatum = await getTatum();
      //check here if tatuys i of type ethereum and poluygon and then only execute below code
      if (tatum instanceof Ethereum || tatum instanceof Polygon) {
        const nftBalance = await tatum.nft.getBalance({
          addresses: [address],
        });

        if (nftBalance.data) {
          // Transform the data to match our NFT interface
          const transformedNfts: NFT[] = nftBalance.data.map(
            (nft: NftAddressBalance) => ({
              metadata: {
                name: nft.metadata?.name || "Unnamed NFT",
                image: nft.metadata?.image || undefined,
              },
            })
          );
          setNfts(transformedNfts);
        } else {
          setNftError("No NFTs found");
        }
      } else {
        setNftError("NFTS are not supported on this chain");
      }

      tatum.destroy();
    } catch (e) {
      setNftError(
        e instanceof Error ? e.message : "An error occurred while fetching NFTs"
      );
    }

    setNftLoading(false);
  };

  const getTatum = async (): Promise<Ethereum | Bitcoin | Polygon> => {
    const tatum = await TatumSDK.init<Ethereum | Bitcoin | Polygon>({
      network: network,
      apiKey: process.env.NEXT_PUBLIC_TATUM_API_KEY || "",
    });

    return tatum;
  };
  return (
    <CryptoContext.Provider
      value={{
        network,
        setNetwork,
        address,
        setAddress,
        balance,
        setBalance,
        error,
        setError,
        loading,
        setLoading,
        fetchBalance,
        fetchNFTs,
        nfts,
        nftError,
        nftLoading,
        setNfts,
        setNftError,
        setNftLoading,
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
};
