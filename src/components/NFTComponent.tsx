"use client";

import React from "react";
import Image from "next/image";

interface NFTProps {
  metadata: {
    name?: string;
    image?: string;
  };
}

const NFTComponent: React.FC<NFTProps> = ({ metadata }) => {
  const getImageSrc = (url: string | undefined) => {
    if (!url) return "/placeholder.jpg";
    // Convert IPFS URL starting with ipfs:// to a gateway URL
    if (url.startsWith("ipfs://")) {
      return url.replace("ipfs://", "https://ipfs.io/ipfs/");
    }
    return url; // Return as-is if it's already a proper URL
  };
  const imageSrc = getImageSrc(metadata.image);
  const name = metadata.name || "Unnamed NFT";

  return (
    <div className="bg-gray-100 rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48">
        <Image
          src={imageSrc}
          alt={name}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 ease-in-out transform hover:scale-110"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold truncate">{name}</h3>
      </div>
    </div>
  );
};

export default NFTComponent;
