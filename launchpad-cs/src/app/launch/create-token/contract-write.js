"use client";

import React, { useState, useEffect } from "react";
// Web3 Wagmi
import { writeContract } from "@wagmi/core";
import { parseEther } from "viem";
// Contract ABIs
import standardTokenAbi from "@/app/abis/standardTokenAbi";
import LiquidityGeneratorTokenFactoryAbi from "@/app/abis/LiquidityGeneratorTokenFactoryAbi";
import BabyTokenFactoryAbi from "@/app/abis/BabyTokenFactoryAbi";
import BuybackBabyTokenFactoryAbi from "@/app/abis/BuybackBabyTokenFactoryAbi";
import PresaleAbi from "@/app/abis/PresaleAbi";
import FairlaunchAbi from "@/app/abis/FairlaunchAbi";
import { useRouter } from "next/navigation";

// Wagmi Config
import { config } from "@/app/config";

const ContractWrite = async (
  address,
  args,
  messageApi,
  currentToken,
  content = "Token Created Successfuly",
  formData = {},
  router = "",
  callback = ""
) => {
  const key = "updatable";


  const abi =
    currentToken === "1"
      ? standardTokenAbi
      : currentToken === "2"
        ? LiquidityGeneratorTokenFactoryAbi
        : currentToken === "3"
          ? BabyTokenFactoryAbi
          : currentToken === "4"
            ? BuybackBabyTokenFactoryAbi
            : currentToken === "presale"
              ? PresaleAbi
              : FairlaunchAbi;

  messageApi.open({
    key,
    type: "loading",
    content: "Loading...",
  });

  console.log(args, "args");

  const result = await writeContract(config, {
    address: address,
    abi: abi,
    functionName: "create",
    args: args,
    value: parseEther("0.01"),
  });
  console.log(formData, "formData");
  console.log(result, "result");
  if (result && (currentToken === "presale" || currentToken == "fairlaunch")) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    formData.hash = result;
    const raw = JSON.stringify(formData);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/launchpad/add`, requestOptions)
      .then((response) => response.json())
      .then((result) => router.push("/launch/launchpad"))
      .catch((error) => console.error(error));
  }
  else if (result && (currentToken === "1" || currentToken === "2" || currentToken === "3" || currentToken === "4")) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    formData.hash = result;
    const raw = JSON.stringify(formData);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/token/add`, requestOptions)
      .then((response) => response.json())
      .then((result) => router.push("/launch/create-token"))
      .catch((error) => console.error(error));
  }
  // const getAddress = async () => {
  //     try { // Wait for the transaction to be mined
  //         const tokenData = await fetchData.fetchTransactionData(result);

  //         setTimeout(() => {
  //             messageApi.open({key, type: 'success', content: `Your token address is ${tokenData}`, duration: 4});
  //         }, 1000);
  //     } catch (error) {
  //         console.error("Error retrieving token address:", error);
  //         // Handle error accordingly
  //     }
  // }

  setTimeout(() => {
    messageApi.open({ key, type: "success", content: content, duration: 2 });
    callback(result);
  }, 1000);
  // setTimeout(getAddress, 20000);
};

export default ContractWrite;
