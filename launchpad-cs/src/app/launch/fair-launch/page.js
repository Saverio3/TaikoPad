"use client";

import React, {useState, useEffect} from "react";

import Image from "next/image";

// ! import components
import Input from "@/components/Form/Input";
import Warning from "@/components/Alert/Warning";
import {InputNumber, Radio, Space, message} from 'antd';
import DefaultSelect from "@/components/Form/DefaultSelect";

// ! import Icons
import LogoURLIcon from "@/assets/icons/logoURL-input.svg";
import WebsiteIcon from "@/assets/icons/website-input.svg";
import TwitterIcon from "@/assets/icons/twitter-input.svg";
import FacebookIcon from "@/assets/icons/facebook-input.svg";
import GithubIcon from "@/assets/icons/github-input.svg";
import TelegramIcon from "@/assets/icons/telegram-input.svg";
import InstagramIcon from "@/assets/icons/instagram-input.svg";
import DiscordIcon from "@/assets/icons/discord-input.svg";
import RedditIcon from "@/assets/icons/reddit-input.svg";
import YoutubeIcon from "@/assets/icons/youtube-input.svg";
import WarningIcon from "@/assets/icons/warning.svg";
import RefreshIcon from "@/assets/icons/refresh-yello.svg";

import DatePickerIcon from "@/assets/icons/datepicker.svg";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ExportedImage from "next-image-export-optimizer";
import {useRouter} from "next/navigation";

import fetchData from "@/app/restAPI";
import getAddress from '@/app/wagmi/getAddress';
import ContractWrite from '@/app/launch/create-token/contract-write'

const FairLaunch = () => {
    const walletAddress = getAddress();
    const initialState = {
        tokenType: '',
        tokenName: '',
        tokenSymbol: '',
        tokenDecimals: 0,
        totalSupply: 0,
        tokenAddress: '',
        currency: 'BNB',
        feeOptions: '0',
        listingOptions: 'Auto Listing',
        affiliateProgram: 'Disable Affiliate',
        percent: 0,
        sellAmount: 0,
        whitelist: 'Disable',
        softCap: 0,
        hardCap: 0,
        maxCon: false,
        maxConVal: 0,
        enableBuyback: false,
        enableBuybackVal: 0,
        liquidity: 0,
        minimumBuy: 0,
        maximumBuy: 0,
        refundType: '',
        router: '0xD99D1c33F9fC3444f8101754aBC46c52416550D1',
        uniswapLiquidity: 0,
        uniswapListingRate: '',
        startDate: new Date(),
        endDate: new Date(),
        liquidityLockDays: 0,
        logoUrl: '',
        websiteUrl: '',
        facebookUrl: '',
        twitterUrl: '',
        githubUrl: '',
        telegramUrl: '',
        instagramUrl: '',
        discordUrl: '',
        redditUrl: '',
        yutubeUrl: '',
        description: '',
        addressError: '',
        needTokenCnt: 0,
        service:'create fairlaunch',
        owner_address:walletAddress,
        chain:""
    };

    const [step, setStep] = useState(1);
    const [messageApi, contextHolder] = message.useMessage();

    const [tokenAddressError, setTokenAddressError] = useState("");
    const [formData, setFormData] = useState(initialState);
    const [tokenBalance, setTokenBalance] = useState(0);
    
    const handleTokenAddressChange = async (e) => {
      const value = e.target.value;
      if(value.length === 42) { 
          const tokenDetail = await fetchData.fetchTokenDetailByAddress(value, messageApi);
          if (tokenDetail.error !== '') {
              setFormData({
                  ...formData,
                  'tokenAddress': value
              });
              setTokenAddressError(tokenDetail.error);
          } else {
              setFormData({
                  ...formData,
                  tokenAddress: value,
                  tokenName: tokenDetail.tokenName,
                  tokenType: tokenDetail.tokenType,
                  tokenSymbol: tokenDetail.tokenSymbol,
                  totalSupply: tokenDetail.totalSupply,
                  chain:tokenDetail.tokenType == "BEP-20"?0:tokenDetail.tokenType == "ERC-20"?1:2
              });
              
              setTokenAddressError('');
          }
      } else {
          setFormData({
              ...formData,
              tokenAddress: value,
          });
      }
  };

  const handleCalculateAmount = (e) => {
    let tokenCnt = 0;
    const name = e.target.name;
    const value = Number(e.target.value);

    if(name == 'sellAmount') {
          tokenCnt = value + value * Number(formData.liquidity) / 100;
      } else if( name == 'liquidity' ) { 
          tokenCnt = formData.sellAmount + formData.sellAmount * Number(value) / 100;
      }
      console.log(tokenCnt);
      console.log(Math.floor(tokenCnt));

      setFormData({
          ...formData,
          [e.target.name]: value,
          'needTokenCnt': Math.floor(tokenCnt)
      })
  }

    const changeOption = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const changeCheckbox = (e) => {
        console.log(e.target.checked);
        setFormData({
            ...formData,
            [e.target.name]: e.target.checked
        });
    }

    const handleChangePercentage = (e) => {
        setFormData({
            ...formData,
            percent: e.target.value
        });
    }

    const setStartDate = (value) => {
        console.log(value);
        const originalDate = new Date(value);

        const year = originalDate.getFullYear();
        // JavaScript months are zero-indexed, so we add 1 to get the correct month
        const month = (originalDate.getMonth() + 1).toString().padStart(2, '0');
        const day = originalDate.getDate().toString().padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        console.log(formattedDate);
        setFormData({
            ...formData,
            startDate: formattedDate
        });
    }

    const setEndDate = (value) => {
        console.log(value);
        const originalDate = new Date(value);

        const year = originalDate.getFullYear();
        // JavaScript months are zero-indexed, so we add 1 to get the correct month
        const month = (originalDate.getMonth() + 1).toString().padStart(2, '0');
        const day = originalDate.getDate().toString().padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        console.log(formattedDate);
        setFormData({
            ...formData,
            endDate: formattedDate
        });
    }

    const getWalletBalance = async () => {
      const balance = await fetchData.fetchWalletTokenBalances(formData.tokenAddress);
      setTokenBalance(balance);
      
  }

    const router = useRouter();
    
    const handleNextButtonClick = () => {
        if (tokenAddressError) {
            return;
        } else if ((formData.percent > 0 || formData.affiliateProgram === 'Disable Affiliate') && step === 1) {
            getWalletBalance();
            setStep(2);
            console.log(formData);
            console.log(step);
        } else if (formData.sellAmount > 0 && Number(formData.softCap) > 0 && step == 2) { // check case
          console.log(tokenBalance);
          if(tokenBalance < formData.needTokenCnt){
            messageApi.open({key, type: 'warning', content: 'Your token balance is not engough', duration: 2});
          } else
            setStep(3);
        } else if (formData.logoUrl !== '' && formData.websiteUrl !== '' && formData.facebookUrl !== '' && formData.twitterUrl !== '' && formData.githubUrl !== '' && formData.telegramUrl !== '' && formData.instagramUrl !== '' && formData.discordUrl !== '' && formData.redditUrl !== '' && formData.yutubeUrl !== '' && step === 3) {
            console.log(formData);
            setStep(4);
        } else if(step == 4) {
            const address = '0xb1E698F61e5cAD77915FD103eAbf087EDBB2Dfc5';
            const param = [ formData.tokenAddress, '0xb8c77482e45f1f44de1745f52c74426c631bdd52', false, 1, false, formData.sellAmount, Number(formData.softCap), formData.liquidity,
               new Date(formData.startDate).getTime(), new Date(formData.endDate).getTime() ];
            const type = 'fairlaunch';
            const success = 'Successful';
            ContractWrite(address, param, messageApi, type, success,formData,router, function(msg) {
                router.push("/launch/fair-launch");
            });
        }
    };

    return (
        <div className="min-h-[1500px]">{contextHolder}
            <div className="bg-[#1B1B1B] rounded-2xl p-8 flex flex-row max-sm:hidden mt-8 lg:mt-0">
                <div className="sm:flex grid flex-col w-[24%] relative pr-2">
                    <p className="text-sm text-[#C03F4A]">Step 1</p>
                    <p className="text-lg text-white font-semibold mt-5">Verify Token</p>
                    <p className="text-sm text-[#86888C] mt-4">
                        Enter the token address
                        <br/>
                        and Verify
                    </p>
                    {
                    step === 1 && (
                        <hr className="h-0.5 border-0 bg-[#C03F4A] w-[100%] absolute -top-8 left-0"></hr>
                    )
                } </div>

                <div className="flex flex-col sm:w-[24%] relative px-2">
                    <p className="text-sm text-[#C03F4A]">Step 2</p>
                    <p className="text-lg text-white font-semibold mt-5">
                        Launchpad Information
                    </p>
                    <p className="text-sm text-[#86888C] mt-4">
                        Enter the Fair Launch information, in
                        <br/>
                        case of trouble check
                                    our
                        <span className="text-[#C03F4A]">Docs</span>
                    </p>

                    {
                    step === 2 && (
                        <hr className="h-0.5 border-0 bg-[#C03F4A] w-[100%] absolute -top-8 left-0"></hr>
                    )
                } </div>

                <div className="flex flex-col sm:w-[24%] relative px-2">
                    <p className="text-sm text-[#C03F4A]">Step 3</p>
                    <p className="text-lg text-white font-semibold mt-5">
                        Add Additional Info
                    </p>
                    <p className="text-sm text-[#86888C] mt-4">
                        Let People Know Who You
                        <br/>
                        Are
                    </p>

                    {
                    step === 3 && (
                        <hr className="h-0.5 border-0 bg-[#C03F4A] w-[100%] absolute -top-8 left-0"></hr>
                    )
                } </div>

                <div className="flex flex-col w-[24%] relative pl-2">
                    <p className="text-sm text-[#C03F4A]">Step 4</p>
                    <p className="text-lg text-white font-semibold mt-5">Finish</p>
                    <p className="text-sm text-[#86888C] mt-4">Review your information</p>

                    {
                    step === 4 && (
                        <hr className="h-0.5 border-0 bg-[#C03F4A] w-[100%] absolute -top-8 left-0"></hr>
                    )
                } </div>
            </div>

            <div className="bg-[#1B1B1B] rounded-2xl p-5 flex-col gap-[50px] max-sm:flex hidden mt-8 lg:mt-0">
                <div className="sm:flex grid flex-row gap-4">
                    <div className={
                        `w-[42px] h-[42px] rounded-full flex flex-row items-center justify-center text-base text-[black] font-extrabold ${
                            step > 1 || step === 1 ? "bg-[#C03F4A] text-[black]" : "bg-[#86888C] text-[black]"
                        }`
                    }>
                        1
                    </div>
                    <div className="flex flex-col pl-2">
                        <p className="text-xs text-[#C03F4A] font-medium">Step 1</p>
                        <p className="text-sm text-[white]/[0.85] font-semibold mt-3">
                            Approve Token
                        </p>
                        <p className="text-xs text-[white]/[0.45] font-normal mt-[6px]">
                            Enter the token address and approve
                        </p>
                    </div>
                </div>

                <div className="sm:flex grid flex-row gap-4">
                    <div className={
                        `w-[42px] h-[42px] rounded-full flex flex-row items-center justify-center text-base font-extrabold ${
                            step > 2 || step === 2 ? "bg-[#C03F4A] text-[black]" : "bg-[#86888C] text-[black]"
                        }`
                    }>
                        2
                    </div>
                    <div className="flex flex-col pl-2">
                        <p className="text-xs text-[#C03F4A] font-medium">Step 2</p>
                        <p className="text-sm text-[white]/[0.85] font-semibold mt-3">
                            Launchpad Information
                        </p>
                        <p className="text-xs text-[white]/[0.45] font-normal mt-[6px]">
                            Enter the Fair Launch information, in case of trouble check our
                            <span className="text-[#C03F4A]">
                                Docs</span>
                        </p>
                    </div>
                </div>

                <div className="sm:flex grid flex-row gap-4">
                    <div className={
                        `w-[42px] h-[42px] rounded-full flex flex-row items-center justify-center text-base font-extrabold ${
                            step > 3 || step === 3 ? "bg-[#C03F4A] text-[black]" : "bg-[#86888C] text-[black]"
                        }`
                    }>
                        3
                    </div>
                    <div className="flex flex-col pl-2">
                        <p className="text-xs text-[#C03F4A] font-medium">Step 3</p>
                        <p className="text-sm text-[white]/[0.85] font-semibold mt-3">
                            Project Information
                        </p>
                        <p className="text-xs text-[white]/[0.45] font-normal mt-[6px]">
                            Add project links, description and select tier
                        </p>
                    </div>
                </div>

                <div className="sm:flex grid flex-row gap-4">
                    <div className={
                        `w-[42px] h-[42px] rounded-full flex flex-row items-center justify-center text-base  font-extrabold ${
                            step > 4 || step === 4 ? "bg-[#C03F4A] text-[black]" : "bg-[#86888C] text-[black]"
                        }`
                    }>
                        4
                    </div>
                    <div className="flex flex-col pl-2">
                        <p className="text-xs text-[#C03F4A] font-medium">Step 4</p>
                        <p className="text-sm text-[white]/[0.85] font-semibold mt-3">
                            Submit
                        </p>
                        <p className="text-xs text-[white]/[0.45] font-normal mt-[6px]">
                            Submit your presale
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-[#1B1B1B] rounded-2xl p-8 mt-6 max-sm:p-5">
                {
                step === 1 && (
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-row justify-between max-sm:flex-col-reverse max-sm:gap-8">
                            <p className="text-xs text-[#FA8B84]">(*) is required field.</p>
                            <button className="py-[10px] px-[61px] bg-[#FA8B84] rounded-[10px] text-sm text-[#151103] font-semibold"
                                onClick={
                                    () => {
                                        router.push("/launch/create-token");
                                    }
                            }>
                                Create Token
                            </button>
                        </div>

                        <Input label="Token Address"
                            required={true}
                            value={
                                formData.tokenAddress
                            }
                            placeholder="Token Address"
                            onChange={handleTokenAddressChange}
                            error={tokenAddressError}/>

                        <div className="flex flex-col gap-5">
                            <p className="text-sm text-[#FA8B84]">Pool Creation fee: 1 BNB</p>
                            <div className="flex flex-col gap-3">
                                <p className="text-sm text-white">Currency</p>
                                <div className="flex flex-col gap-2">
                                    <Radio.Group name="currency"
                                        defaultValue={
                                            formData.currency
                                        }
                                        onChange={changeOption}>
                                        <Space direction="vertical">
                                            <Radio value="BNB">BNB</Radio>
                                            <Radio value="USDT">USDT</Radio>
                                            <Radio value="USDC">USDC</Radio>
                                            <Radio value="DAI">DAI</Radio>
                                            <Radio value="FLOKI">FLOKI</Radio>
                                        </Space>
                                    </Radio.Group>
                                    <p className="text-sm text-[#FA8B84]">
                                        {`Users will pay with ${formData.currency} for your token`}
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3">
                                <p className="text-sm text-white">Fee options</p>
                                <Radio.Group name="feeOptions"
                                    defaultValue={
                                        formData.feeOptions
                                    }
                                    onChange={changeOption}>
                                    <Space direction="vertical">
                                        <Radio value='0'>{`5% ${formData.currency} raised only`}
                                            <span className="text-[#C03F4A]">(Recommended)</span>
                                        </Radio>
                                        <Radio value="1">{`2$ ${formData.currency} raised + 2% token sold`}</Radio>
                                    </Space>
                                </Radio.Group>
                            </div>

                            <div className="flex flex-col gap-3">
                                <p className="text-sm text-white">Listing Options</p>
                                <Radio.Group name="listingOptions"
                                    defaultValue={
                                        formData.listingOptions
                                    }
                                    onChange={changeOption}>
                                    <Radio value="Auto Listing">Auto Listing</Radio>
                                </Radio.Group>
                            </div>

                            <div className="flex flex-col gap-3">
                                <p className="text-sm text-white">Affiliate Program</p>
                                <Radio.Group name="affiliateProgram"
                                    defaultValue={
                                        formData.affiliateProgram
                                    }
                                    onChange={changeOption}>
                                    <Space direction="vertical">
                                        <Radio value="Disable Affiliate">Disable Affiliate</Radio>
                                        <Radio value="Enable Affiliate">Enable Affiliate</Radio>
                                        {
                                        formData.affiliateProgram === "Enable Affiliate" && <Input label="Enter Percentage. Max:5 Ex:1" type="number"
                                            required={true}
                                            placeholder="Enter Percentage. Max:5 Ex:1"
                                            value={
                                                formData.percent
                                            }
                                            onChange={handleChangePercentage}/>
                                    } </Space>
                                </Radio.Group>
                            </div>

                            <Warning icon={false}>
                                <p className="text-sm text-[#FFF7CD]">
                                    Auto listing, after you finalize the pool your token will be
                                                      auto listed on DEX.
                                </p>
                            </Warning>
                        </div>

                        <div className="flex flex-row justify-end">
                            <button className="bg-[#FA8B84] max-sm:w-[100%] rounded-[10px] py-[10px] px-[61px] text-sm font-semibold text-[#151103]"
                                onClick={handleNextButtonClick}>
                                Next
                            </button>
                        </div>
                    </div>
                )
            }
                {
                step === 2 && (
                    <div className="flex flex-col gap-7">
                        <p className="text-xs text-[#FA8B84]">(*) is required field.</p>
                        <div className="flex flex-col gap-2">
                            <Input name="sellAmount" type="number" label="Total selling amount" placeholder="100"
                                required={true}
                                onChange={handleCalculateAmount}
                                value={
                                    formData.sellAmount
                                }/>
                        </div>

                        <div className="flex flex-col gap-2">
                            <p className="text-sm text-white">Whitelist</p>
                            <Radio.Group name="whitelist"
                                defaultValue={
                                    formData.whitelist
                                }
                                onChange={changeOption}>
                                <Radio value="Disable">Disable</Radio>
                                <Radio value="Enable">Enable</Radio>
                            </Radio.Group>
                            <p className="text-xs text-[#C03F4A]">
                                You can enable/disable whitelist anytime (If you activate the
                                                whitelist our members who use the floki whitelist function can
                                                access your whitelist)
                            </p>
                        </div>

                        <div className="flex flex-col gap-2 w-[100%]">
                            <Input name="softCap" type='number' label={`SoftCap (${formData.currency})`} placeholder="0"
                                required={true}
                                onChange={changeOption}
                                value={
                                    formData.softCap
                                }/>
                            <div className="flex flex-row gap-2 items-center">
                                <input name="maxCon" type="checkbox"
                                    onChange={changeCheckbox}
                                    checked={
                                        formData.maxCon
                                    }/>
                                <p className="text-sm text-[#BCBBB9]">
                                    Setting max contribution?
                                </p>
                            </div>
                            {
                            formData.maxCon === true && <Input label="Max Contribution" name="maxConVal" type="number"
                                required={true}
                                placeholder={`Max Contribution (${formData.currency})`}
                                value={
                                    formData.maxConVal
                                }
                                onChange={changeOption}/>
                        } </div>

                        <div className="flex flex-row gap-2 w-[100%] items-center">
                            <DefaultSelect required={true}
                                label="Router"
                                onChange={changeOption}
                                defaultValue={
                                    formData.router
                                }
                                optons={
                                    [{
                                            text: "Pancakeswap",
                                            value: "0xD99D1c33F9fC3444f8101754aBC46c52416550D1"
                                        }]
                                }/>

                            <div className="relative w-[18px] h-[97px]">
                                <ExportedImage src={RefreshIcon}
                                    alt="refresh"
                                    className="absolute bottom-[24px] right-0"/>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2 w-[100%]">
                                <Input name="liquidity" type="number" label="liquidity (%)" placeholder="0"
                                    required={true}
                                    onChange={handleCalculateAmount}
                                    value={
                                        formData.liquidity
                                    }/>
                                <div className="flex flex-row gap-2 items-center">
                                    <input name="enableBuyback" type="checkbox"
                                        onChange={changeCheckbox}
                                        checked={
                                            formData.enableBuyback
                                        }/>
                                    <p className="text-sm text-[#BCBBB9]">Enable Buyback?</p>
                                </div>
                                {
                                formData.enableBuyback === true && <Input label="Max Contribution" name="enableBuybackVal" type="number"
                                    required={true}
                                    placeholder="Enable Buyback"
                                    value={
                                        formData.enableBuybackVal
                                    }
                                    onChange={changeOption}/>
                            } </div>
                            <p className="text-xs text-[#C03F4A]">
                                Enter the percentage of raised funds that should be allocated to
                                                Liquidity on (Min 51%, Max 100%)
                                <br/>
                                If I spend 1 on how many tokens will I receive? Usually this
                                                amount is lower than presale rate to allow for a higher listing
                                                price on
                            </p>
                        </div>

                        <div className="flex flex-col gap-2">
                            <p className="text-sm text-white">
                                Select start time & end time (UTC)
                            </p>

                            <div className="flex flex-row gap-6 max-sm:flex-col">
                                <div className="flex flex-col gap-2 w-[100%]">
                                    <p className="text-white text-[14px]">Start time (UTC)</p>
                                    <div className="flex flex-col relative">
                                        <DatePicker selected={
                                                new Date(formData.startDate)
                                            }
                                            onChange={
                                                (date) => setStartDate(date)
                                            }
                                            showTimeSelect
                                            dateFormat="MM/d/yyyy hh:mm aa"
                                            placeholderText="Select date"
                                            className="bg-[#141414] outline-none border w-[100%] border-[#2C2C2C] h-[59px] p-5 rounded-lg text-base text-[#86888C]"/>
                                        <ExportedImage src={DatePickerIcon}
                                            alt="image"
                                            className="absolute top-4 right-5"/>
                                    </div>
                                    {
                                    formData.startDate < Date.now() && <p className="text-xs text-[#C03F4A]">
                                        Start time needs to be after now
                                    </p>
                                } </div>

                                <div className="flex flex-col gap-2 w-[100%]">
                                    <p className="text-white text-[14px]">End time (UTC)</p>
                                    <div className="flex flex-col relative">
                                        <DatePicker selected={
                                                new Date(formData.endDate)
                                            }
                                            onChange={
                                                (date) => setEndDate(date)
                                            }
                                            showTimeSelect
                                            dateFormat="MM/d/yyyy hh:mm aa"
                                            placeholderText="Select date"
                                            className="bg-[#141414] outline-none border w-[100%] border-[#2C2C2C] h-[59px] p-5 rounded-lg text-base text-[#86888C]"/>
                                        <ExportedImage src={DatePickerIcon}
                                            alt="image"
                                            className="absolute top-4 right-5"/>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 w-[100%]">
                            <Input name="liquidityLockDays" type="number" label="Liquidity lockup (days)" placeholder="0"
                                required={true}
                                onChange={changeOption}
                                value={
                                    formData.liquidityLockDays
                                }/> {
                            formData.liquidityLockDays < 30 && formData.liquidityLockDays > 0 && <p className="text-xs text-[#C03F4A]">
                                liquidityLockTime must be greater than or equal to 30
                            </p>
                        } </div>

                        <div className="flex flex-col gap-6">
                            <p className="text-right text-sm text-[#C03F4A] max-sm:text-center">
                                {`Need ${formData.needTokenCnt} ${formData.tokenSymbol} to create launchpad.`}
                            </p>
                            <div className="flex flex-row justify-end gap-5 max-sm:w-[100%]">
                                <button className="px-12 py-[10px] text-sm text-[#FA8B84] max-sm:w-[100%] rounded-[10px] font-semibold border border-[#FA8B84]"
                                    onClick={
                                        () => setStep(1)
                                }>
                                    Previous
                                </button>

                                <button className="px-12 py-[10px] text-sm text-[#151103] font-semibold max-sm:w-[100%] rounded-[10px] bg-[#FA8B84]"
                                    onClick={handleNextButtonClick}>
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
                {
                step === 3 && (
                    <div className="flex flex-col gap-7">
                        <p className="text-xs text-[#FA8B84]">(*) is required field.</p>
                        <div className="flex flex-row max-sm:flex-col gap-6">
                            <div className="flex flex-col w-[100%]">
                                <Input name="logoUrl" label="Logo URL"
                                    required={true}
                                    placeholder="Ex: https://..."
                                    icon={LogoURLIcon}
                                    onChange={changeOption}
                                    value={
                                        formData.logoUrl
                                    }/>
                                <p className="text-xs text-[#C03F4A] mt-[6px]">
                                    URL must end with a supported image extension png, jpg, jpeg
                                                      or gif. You can upload your image at
                                    <br/>
                                    https://upload.flashlaunch.com/
                                </p>
                            </div>

                            <div className="flex flex-col w-[100%]">
                                <Input name="websiteUrl" label="Website"
                                    required={true}
                                    placeholder="Ex: https://..."
                                    icon={WebsiteIcon}
                                    onChange={changeOption}
                                    value={
                                        formData.websiteUrl
                                    }/>
                            </div>
                        </div>
                        <div className="flex flex-row max-sm:flex-col gap-6">
                            <div className="flex flex-col w-[100%]">
                                <Input name="facebookUrl" label="Facebook" placeholder="Ex: https://facebook.com/..."
                                    icon={FacebookIcon}
                                    onChange={changeOption}
                                    value={
                                        formData.facebookUrl
                                    }/>
                            </div>

                            <div className="flex flex-col w-[100%]">
                                <Input name="twitterUrl" label="Twitter" placeholder="Ex: https://twitter.com/..."
                                    icon={TwitterIcon}
                                    onChange={changeOption}
                                    value={
                                        formData.twitterUrl
                                    }/>
                            </div>
                        </div>
                        <div className="flex flex-row max-sm:flex-col gap-6">
                            <div className="flex flex-col w-[100%]">
                                <Input name="githubUrl" label="Github" placeholder="Ex: https://github.com/..."
                                    icon={GithubIcon}
                                    onChange={changeOption}
                                    value={
                                        formData.githubUrl
                                    }/>
                            </div>

                            <div className="flex flex-col w-[100%]">
                                <Input name="telegramUrl" label="Telegram" placeholder="Ex: https://t.me/..."
                                    icon={TelegramIcon}
                                    onChange={changeOption}
                                    value={
                                        formData.telegramUrl
                                    }/>
                            </div>
                        </div>
                        <div className="flex flex-row max-sm:flex-col gap-6">
                            <div className="flex flex-col w-[100%]">
                                <Input name="instagramUrl" label="Instagram" placeholder="Ex: https://instagram.com/..."
                                    icon={InstagramIcon}
                                    onChange={changeOption}
                                    value={
                                        formData.instagramUrl
                                    }/>
                            </div>

                            <div className="flex flex-col w-[100%]">
                                <Input name="discordUrl" label="Discord" placeholder="Ex: https://t.me/..."
                                    icon={DiscordIcon}
                                    onChange={changeOption}
                                    value={
                                        formData.discordUrl
                                    }/>
                            </div>
                        </div>
                        <div className="flex flex-col w-[100%]">
                            <Input name="redditUrl" label="Reddit" placeholder="Ex: https://reddit.com/..."
                                icon={RedditIcon}
                                onChange={changeOption}
                                value={
                                    formData.redditUrl
                                }/>
                        </div>

                        <div className="flex flex-col w-[100%]">
                            <Input name="yutubeUrl" label="Youtube Video" placeholder="Ex: https://youtube.com/watch?v="
                                icon={YoutubeIcon}
                                onChange={changeOption}
                                value={
                                    formData.yutubeUrl
                                }/>
                        </div>
                        <p className="text-xs text-[#C03F4A]">
                            Input your youtube URL, or youtube video ID.
                        </p>
                        <div className="flex flex-col gap-2">
                            <p className="text-sm text-white">Description</p>
                            <textarea name="description" id="" cols="30" rows="10" placeholder="Ex: This project is..." className="bg-[#141414] rounded-[6px] border border-[#2C2C2C] py-[10px] px-4 outline-none"
                                onChange={changeOption}
                                value={
                                    formData.description
                            }></textarea>
                        </div>

                        <div className="flex flex-col gap-6">
                            <div className="flex flex-row justify-end gap-5">
                                <button className="px-12 py-[10px] text-sm text-[#FA8B84] max-sm:w-[100%] rounded-[10px] font-semibold border border-[#FA8B84]"
                                    onClick={
                                        () => setStep(2)
                                }>
                                    Previous
                                </button>

                                <button className="px-12 py-[10px] text-sm text-[#151103] font-semibold max-sm:w-[100%] rounded-[10px] bg-[#FA8B84]"
                                    onClick={handleNextButtonClick}>
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
                {
                step === 4 && (
                    <div className="flex flex-col">
                        <div className="flex flex-col">
                            <div className="py-4 flex flex-row justify-between items-center text-base text-white border-b border-b-[#2C2C2C]">
                                <p>Total token</p>
                                <p className="text-[#C03F4A]">{`${formData.needTokenCnt} ${formData.tokenSymbol}`}</p>
                            </div>

                            <div className="py-4 flex flex-row justify-between items-center text-base text-white border-b border-b-[#2C2C2C]">
                                <p>Token name</p>
                                <p>{formData.tokenName}</p>
                            </div>

                            <div className="py-4 flex flex-row justify-between items-center text-base text-white border-b border-b-[#2C2C2C]">
                                <p>Token symbol</p>
                                <p>{formData.tokenSymbol}</p>
                            </div>

                            <div className="py-4 flex flex-row justify-between items-center text-base text-white border-b border-b-[#2C2C2C]">
                                <p>Token decimals</p>
                                <p>{formData.tokenDecimals}</p>
                            </div>

                            <div className="py-4 flex flex-row justify-between items-center text-base text-white border-b border-b-[#2C2C2C]">
                                <p>Total selling amount</p>
                                <p>{`${formData.sellAmount} ${formData.tokenSymbol}`}</p>
                            </div>

                            <div className="py-4 flex flex-row justify-between items-center text-base text-white border-b border-b-[#2C2C2C]">
                                <p>Softcap</p>
                                <p>{formData.softCap}</p>
                            </div>

                            <div className="py-4 flex flex-row justify-between items-center text-base text-white border-b border-b-[#2C2C2C]">
                                <p>Liquidity</p>
                                <p>{`${formData.liquidity}%`}</p>
                            </div>

                            <div className="py-4 flex flex-row justify-between items-center text-base text-white border-b border-b-[#2C2C2C]">
                                <p>Start time</p>
                                <p>{`${formData.startDate} (UTC)`}</p>
                            </div>

                            <div className="py-4 flex flex-row justify-between items-center text-base text-white border-b border-b-[#2C2C2C]">
                                <p>End time</p>
                                <p>{`${formData.endDate} (UTC)`}</p>
                            </div>

                            <div className="py-4 flex flex-row justify-between items-center text-base text-white border-b border-b-[#2C2C2C]">
                                <p>Liquidity lockup time</p>
                                <p>{`${formData.liquidityLockDays} days`}</p>
                            </div>

                            <div className="py-4 flex flex-row justify-between items-center text-base text-white border-b border-b-[#2C2C2C]">
                                <p>Website</p>
                                <p className="text-[#C03F4A]">{formData.websiteUrl}</p>
                            </div>

                            {/* <div className="py-4 flex flex-row justify-between items-center text-base text-white border-b border-b-[#2C2C2C]">
                                <p>Using Team Vesting?</p>
                                <p>No</p>
                            </div> */}
                        </div>

                        <div className="p-[17px] max-sm:p-[10px] flex flex-row items-center gap-6 max-sm:gap-2 border border-[#262626] bg-[#141414] rounded-[6px] mt-[50px]">
                            <ExportedImage src={WarningIcon}
                                alt="Warning"/>
                            <p className="text-sm text-white max-sm:text-xs break-words max-sm:w-[230px]">
                                Please exclude Flash Factory address
                                                0x609a4e1aE74eD84d0B705180a6Ecbb21DE3e8ce7 from fees, rewards,
                                                max tx amount to start creating pools
                            </p>
                        </div>

                        <div className="p-[17px] flex flex-row items-center gap-6 border border-[#262626] bg-[#141414] rounded-[6px] mt-[10px]">
                            <p className="text-xs text-white">
                                For tokens with burns, rebase or other special transfers please
                                                ensure that you have a way to whitelist multiple addresses or
                                                turn off the special transfer events (By setting fees to 0 for
                                                example for the duration of the presale)
                            </p>
                        </div>

                        <div className="flex flex-row justify-end gap-5 mt-12">
                            <button className="px-12 py-[10px] text-sm text-[#FA8B84] rounded-[10px] font-semibold border border-[#FA8B84]"
                                onClick={
                                    () => setStep(3)
                            }>
                                Previous
                            </button>

                            <button className="px-12 py-[10px] text-sm text-[#151103] font-semibold rounded-[10px] bg-[#FA8B84]"
                                onClick={handleNextButtonClick}>
                                Next
                            </button>
                        </div>
                    </div>
                )
            } </div>
        </div>
    );
};

export default FairLaunch;
