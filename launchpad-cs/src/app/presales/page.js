"use client";

import HeaderNav from "@/components/HeaderNav";
import SearchInput from "@/components/Form/SearchInput";
import Select from "@/components/Form/RoundedSelect";
import PresalesCard from "@/components/Card/PresalesCard";
import FairCard from "@/components/Card/PresalesCard/fair";
import HeaderSection from "@/components/HeaderSection";
import NoDataIcon from "@/assets/icons/no-data.svg";
import { useEffect, useState } from "react";
import ExportedImage from "next-image-export-optimizer";
import { Farro } from "next/font/google";
import getAddress from "../wagmi/getAddress";
const PresalPage = () => {
  const [fair, setFair] = useState(0);

  const [chain, setChain] = useState(0);
  const [active, setActive] = useState(2);

  const [responseData, setResponseData] = useState([]);

  const address = getAddress();

  const getData = async (id = "0") => {
    try {
      const options = {
        method: "POST", // specify the HTTP method (GET, POST, etc.)
        headers: {
          "Content-Type": "application/json",
          //'X-API-Key': '01cf1ec3aa5f80b7708c7a427c7ad87ae002c946'
          "X-API-Key": "cfd7e02c8bf1156a5ad4ffbca315794895494a94",
        },
        body: JSON.stringify({
          address: address,
        }),
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/launchpads/${fair}/${chain}/${active}`,
        options
      );
      if (response.ok) {
        const result = await response.text();
        const parsed_data = JSON.parse(result);
        setResponseData(parsed_data.data);
      }
      else {
        setResponseData([])
      }
    } catch (error) { }
  };
  useEffect(() => {
    if (active == "6" && address == undefined) {
      console.log("Aa");
      setResponseData([]);
    } else {

      getData();
    }
  }, [chain, fair, active]);
  console.log(active, address, "aa");
  const handleChangeOption = (e) => {
    const { value } = e.target;
    console.log(value);
    setFair(value);
  };
  const handleChangeNetwork = (e) => {
    const { value } = e.target;
    setChain(value);
  };
  console.log(responseData.length, "responseData.length");
  return (
    <div style={{ height: "100vh" }}>
      <HeaderSection />
      <HeaderNav
        navActive={active}
        setNavActive={setActive}
        navType={"presale"}
      />
      <div className="mt-6 flex flex-row max-md:flex-col justify-between max-md:gap-5">
        <div className="w-[100%]">
          <SearchInput />
        </div>

        <div className="flex gap-3 max-sm:flex-wrap">
          <Select label="Networks" changeOption={handleChangeNetwork} />
          <Select
            label="Filter By"
            optons={[
              { text: "Launchpad", value: "0" },
              { text: "Fair Launch", value: "1" },
            ]}
            changeOption={handleChangeOption}
          />
          {/* <Select
            label="Sort By"
            optons={[
              { text: "No Filter", value: "nofilter" },
              { text: "Hard Cap", value: "hardcap" },
              { text: "Soft Cap", value: "softcap" },
              { text: "LP percent", value: "lp_percent" },
              { text: "Start time", value: "start_time" },
              { text: "End time", value: "end_time" },
            ]}
          /> */}
        </div>
      </div>
      {responseData.length == 0 ? (
        <div className="mt-[50px] flex justify-center items-center">
          <div className="h-[285px] flex flex-col justify-center items-center gap-3">
            <ExportedImage src={NoDataIcon} alt="no data" />
            <p className="text-lg text-[#2F2F2F]">No Data</p>
          </div>
        </div>
      ) : (
        <div className="mt-[50px] grid grid-cols-4 max-sm:grid-cols-1 gap-[30px] max-sm:pb-4">
          {fair == 0 &&
            responseData &&
            responseData.map((data, index) => (
              <PresalesCard key={index}
                title={`${data.tokenName} Token`}
                text="Launchpad"
                link={`/presales/test_presale/${data._id}`}
                allData={data}
              />
            ))}
          {fair == 1 &&
            responseData &&
            responseData.map((data, index) => (
              <FairCard key={index}
                title={`${data.tokenName} Token`}
                text="Fair Launch"
                link={`/presales/test_presale/${data._id}`}
                allData={data}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default PresalPage;
