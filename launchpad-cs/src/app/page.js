"use client";
import ColorCard from "@/components/Card/ColorCard";
import FlashCard from "@/components/Card/FlashCard";
import PartnerCard from "@/components/Card/PartnerCard";
import StatsCard from "@/components/Card/StatsCard";

import Binance from "@/assets/icons/binance-logo.svg";
import Certik from "@/assets/icons/certik-logo.svg";
import Synaps from "@/assets/icons/synaps-logo.svg";
import Dextools from "@/assets/icons/dextools-logo.svg";
import Floki from "@/assets/icons/floki-logo.svg";
import HeaderSection from "@/components/HeaderSection";
import { useState, useEffect } from "react";

export default function HomePage() {
  const flash_ecosystem = [
    {
      title: "Taiko Transfer",
      text: "Exchange your cash vs crypto or crypto vs cash.",
    },
    {
      title: "Taiko Dex",
      text: "Aggregator swap & bridge all in one.",
    },
    {
      title: "Taiko Wallet",
      text: "Non-custodial wallet with specific features.",
    },
    {
      title: "Taiko Staking",
      text: "Block tokens and earn rewards in crypto on Flash ecosystem.",
    },
    {
      title: "Taiko Elon",
      text: "The first meme token on PinkMoon.",
    },
    {
      title: "Taiko Pay",
      text: "Flash Pay, our escrow smart contract to secure your transactions.",
    },
    {
      title: "Taiko Audit",
      text: "Our audit bot to verify token functions.",
    },
    {
      title: "Taiko Launch",
      text: "Decentralized launchpad with new futures.",
    },
  ];

  const [responseData, setResponseData] = useState({});


  const getData = async (id = "0") => {
    try {
      const options = {
        method: "GET", // specify the HTTP method (GET, POST, etc.)
        headers: {
          "Content-Type": "application/json",
          //'X-API-Key': '01cf1ec3aa5f80b7708c7a427c7ad87ae002c946'
          "X-API-Key": "cfd7e02c8bf1156a5ad4ffbca315794895494a94",
        },

      };

      console.log(process.env.NEXT_PUBLIC_BACKEND_URL, "---0-0-00-");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/dashboard`,
        options
      );
      if (response.ok) {
        const result = await response.text();
        const parsed_data = JSON.parse(result);
        setResponseData(parsed_data);
      }
      else {
        setResponseData([])
      }
    } catch (error) { }
  };
  useEffect(() => {

    getData();

  }, []);
  return (
    <div>
      <HeaderSection />
      <div className="pt-[127px] max-sm:pt-0">
        <p className="text-white text-[42px] text-center font-bold max-sm:text-2xl">
          Stats
        </p>
        <div className="mt-[60px] grid grid-cols-3 max-2xl:grid-cols-1 gap-[24px] justify-center items-center">
          <StatsCard text="Total Projects"
            percent={`${responseData.ProjectCount}`}
            value={responseData.ProjectCount} />
          <StatsCard
            text="Total Generated Tokens"
            percent={`${responseData.tokenCount}`}
            value={responseData.tokenCount}
          />
          <StatsCard
            text="Project Raise Success Rate"
            percent={`${responseData.SaleCount}`}
            value={responseData.SaleCount}
          />
        </div>
        <div className="grid grid-cols-4 max-2xl:grid-cols-1 gap-[24px] justify-center gap-x-7 mt-[56px] items-center">
          <ColorCard />
          <ColorCard
            title="Taiko Wallet"
            text="Discover our non-custodial wallet, unique in the world"
            link="https://flash-wallet.com/"
            BgColor="linear-gradient(137deg, #C03F4A 20%, #FA8B83 100%)"
          />
          {/* <ColorCard
            title="Staking Pool"
            text="Explore the staking pools and enjoy passive rewards from multiple projects"
            link="/staking-pool"
            BgColor="linear-gradient(137deg, #784FFB 28.67%, #0096E9 100%)"
          /> */}
          <ColorCard
            title="Tokens"
            text="Create you own token with Audit included"
            link="/launch/create-token"
            BgColor="linear-gradient(137deg, #C03F4A 20%, #FA8B83 100%)"
          />
          <ColorCard
            title="Airdrop"
            text="Free tool for airdrops"
            link="/airdrop"
            BgColor="linear-gradient(137deg, #C03F4A 20%, #FA8B83 100%)"
          />
          <ColorCard
            title="Create Presale"
            text="Create presale for you own project and enjoy all the benefits TaikoPad offers"
            link="/launch/launchpad"
            BgColor="linear-gradient(137deg, #C03F4A 20%, #FA8B83 100%)"
          />
          <ColorCard
            title="Taiko Transfer"
            text="Create your own rewarding system"
            link="https://flash-transfer.com"
            BgColor="linear-gradient(137deg, #C03F4A 20%, #FA8B83 100%)"
          />
          <ColorCard
            title="Floki locker"
            text="Block your tokens or liquidity with Floki Lock directly on TaikoPad."
            link="/launch/create-lock"
            BgColor="linear-gradient(137deg, #C03F4A 20%, #FA8B83 100%)"
          />
          <ColorCard
            title="Taiko Club"
            text="Join Taiko Club by holding NFT"
            link="https://rarible.com/flashtechno/sale"
            BgColor="linear-gradient(137deg, #C03F4A 20%, #FA8B83 100%)"
          />
        </div>
        <div className="flex flex-col justify-center items-center mt-[182px] max-sm:mt-[50px]">
          <p className="text-white text-[42px] text-center font-bold max-sm:text-2xl">
            TaikoPad Ecosystem
          </p>
          <div className="grid grid-cols-4 max-2xl:grid-cols-3 max-xl:grid-cols-2 max-sm:grid-cols-1 gap-6 mt-[60px]">
            {flash_ecosystem.map((item, index) => (
              <FlashCard text={item.text} title={item.title} key={index} />
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center mt-[206px] pb-2 max-sm:mt-[50px]">
          <p className="text-white text-[42px] font-bold max-sm:text-2xl">
            Partners
          </p>
          <div className="grid grid-cols-5 max-2xl:grid-cols-3 max-xl:grid-cols-2 max-sm:grid-cols-1 gap-[30px] mt-[56px]">
            <PartnerCard icon={Binance} />
            <PartnerCard icon={Certik} />
            <PartnerCard icon={Synaps} />
            <PartnerCard icon={Dextools} />
            <PartnerCard icon={Floki} />
          </div>
        </div>
      </div>
    </div>
  );
}
