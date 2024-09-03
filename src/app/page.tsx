import BalanceDisplay from "@/components/BalanceDisplay";
import FetchAssetsForm from "@/components/FetchAssetsForm";
import NetworkDropdown from "@/components/NetworkDropdown";
import NFTDisplay from "@/components/NFTDisplay";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-end mb-8">
        <NetworkDropdown />
      </div>

      <h1 className="text-3xl font-bold text-center mb-8">
        Fetch your crypto balance and digital assets
      </h1>

      <div className="max-w-2xl mx-auto mb-8">
        <FetchAssetsForm />
      </div>

      <div className="space-y-8">
        <BalanceDisplay />
        <NFTDisplay />
      </div>
    </div>
  );
}
