"use client";

import React, {useState, useEffect} from "react";
import {parseEther} from 'viem'
// ! import components
import Input from "@/components/Form/Input";
import DefaultSelect from "@/components/Form/DefaultSelect";
import Warning from "@/components/Alert/Warning";
import Moralis from 'moralis';
import {Radio, Space, message} from 'antd';


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
import DatePickerIcon from "@/assets/icons/datepicker.svg";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ExportedImage from "next-image-export-optimizer";
import {useRouter} from "next/navigation";

import fetchData from "@/app/restAPI";
import getAddress from '@/app/wagmi/getAddress';
import ContractWrite from '@/app/launch/create-token/contract-write'


const moralisApiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImUwNTk1NTk2LTA4NDQtNGYyMy1iMmUxLTQyZWM4ZjhiZTJlZSIsIm9yZ0lkIjoiMzI4MDcxIiwidXNlcklkIjoiMzM3MzA1IiwidHlwZUlkIjoiMWM1YzA0NzItOTg5OC00N2IyLTkzM2MtY2ZlNWMzYjk1MjA3IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE2ODI4MzkzMDMsImV4cCI6NDgzODU5OTMwM30.YlHL6aBCq7qDV56PSOa9OhdChnBRiwwsT6oM3EiTG4M';

const Launchpad = () => {
    const walletAddress = getAddress();
    const initialState = {
        tokenType: '',
        tokenName: '',
        tokenSymbol: '',
        tokenDecimals: 0,
        tokenSupply: 0,
        tokenAddress: '',
        currency: 'BNB',
        feeOptions: '0',
        listingOptions: 'Auto Listing',
        affiliateProgram: 'Disable Affiliate',
        percent: 0,
        presaleRate: 0,
        whitelist: 'Disable',
        softCap: 0,
        hardCap: 0,
        minimumBuy: 0,
        maximumBuy: 0,
        refundType: 'Burn',
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
        service:'create launchpad',
        owner_address:walletAddress,
        chain:""
    };
    const startMoralis = async () => {
        await Moralis.start({ apiKey: moralisApiKey });
    }
    
    useEffect(() => {
        startMoralis()


    }, []);
    
    const [step, setStep] = useState(1);
    const [tokenAddressError, setTokenAddressError] = useState("");
    const [formData, setFormData] = useState(initialState);
    const [messageApi, contextHolder] = message.useMessage();
    const [tokenBalance, setTokenBalance] = useState(0);

    const handleTokenAddressChange = async (e) => {
        const value = e.target.value;

        if(value.length === 43) { 
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

    const changeOption = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
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

    const handleCalculateToken = (e) => {
        let tokenCnt = 0;
        const name = e.target.name;
        const value = e.target.value;

        if(name == 'presaleRate') {
            tokenCnt = formData.hardCap * value * 1.02 + 0.98 * formData.hardCap * formData.uniswapLiquidity * formData.uniswapListingRate / 100
        } else if( name == 'hardCap' ) {
            tokenCnt = value * formData.presaleRate * 1.02 + 0.98 * value * formData.uniswapLiquidity * formData.uniswapListingRate / 100
        } else if( name == 'uniswapLiquidity' ) {
            tokenCnt = formData.hardCap * formData.presaleRate * 1.02 + 0.98 * formData.hardCap * value * formData.uniswapListingRate / 100
        } else if( name == 'uniswapListingRate' ) {
            tokenCnt = formData.hardCap * formData.presaleRate * 1.02 + 0.98 * formData.hardCap * formData.uniswapLiquidity * value / 100
        }

        console.log(Math.floor(tokenCnt));

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
            'needTokenCnt': Math.floor(tokenCnt)
        })
    }

    const router = useRouter();
    const handleNextButtonClick = () => {
        console.log(step);
        if (tokenAddressError) {
            return;
        } else if ((formData.percent > 0 || formData.affiliateProgram === 'Disable Affiliate') && step === 1 && formData.tokenAddress !== '') {
            getWalletBalance();
            setStep(2);
        } else if (formData.presaleRate > 0 && formData.hardCap > formData.softCap && formData.hardCap > 0 && formData.minimumBuy > 0 && formData.maximumBuy > 0 && formData.uniswapLiquidity >= 50 && formData.uniswapListingRate > 0 && formData.liquidityLockDays > 30 && step === 2) {
            if(tokenBalance < formData.needTokenCnt){
                messageApi.open({key, type: 'warning', content: 'Your token balance is not engough', duration: 2});
            } else
                setStep(3);
        } else if (formData.logoUrl !== '' && formData.websiteUrl !== '' && formData.facebookUrl !== '' && formData.twitterUrl !== '' && formData.githubUrl !== '' && formData.telegramUrl !== '' && formData.instagramUrl !== '' && formData.discordUrl !== '' && formData.redditUrl !== '' && formData.yutubeUrl !== '' && step === 3) {
            setStep(4);
        } else if(step === 4) {
            const address = process.env.NEXT_PUBLIC_PRESALE_FACTORY;
            const param = [ formData.tokenAddress, '0xb8c77482e45f1f44de1745f52c74426c631bdd52', [formData.presaleRate, formData.uniswapListingRate], [parseEther(formData.minimumBuy), parseEther(formData.maximumBuy)],
            parseEther(formData.softCap), parseEther(formData.hardCap), formData.uniswapLiquidity , new Date(formData.startDate).getTime(), new Date(formData.endDate).getTime() ];
            const type = 'presale';
            const success = 'Successful';
            ContractWrite(address, param, messageApi, type, success,formData,router, function(msg) {
                router.push("/launch/launchpad");
            }); 
        }
    };

    return (<div className="min-h-[1500px] pb-5 mt-8 lg:mt-0"> {contextHolder}
        <div className="bg-[#1B1B1B] rounded-2xl p-8 flex flex-row max-sm:hidden">
            <div className="flex flex-col w-[24%] relative pr-2">
                <p className="text-sm text-[#C03F4A]">Step 1</p>
                <p className="text-lg text-white font-semibold mt-5">Approve Token</p>
                <p className="text-sm text-[#86888C] mt-4">
                    Enter the token address
                    <br/>
                    and approve
                </p>
                {
                step === 1 && (<hr className="h-0.5 border-0 bg-[#C03F4A] w-[100%] absolute -top-8 left-0"></hr>)
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
                step === 2 && (<hr className="h-0.5 border-0 bg-[#C03F4A] w-[100%] absolute -top-8 left-0"></hr>)
            } </div>

            <div className="flex flex-col sm:w-[24%] relative px-2">
                <p className="text-sm text-[#C03F4A]">Step 3</p>
                <p className="text-lg text-white font-semibold mt-5">
                    Project Information
                </p>
                <p className="text-sm text-[#86888C] mt-4">
                    Add project links,
                    <br/>
                    description and select tier
                </p>

                {
                step === 3 && (<hr className="h-0.5 border-0 bg-[#C03F4A] w-[100%] absolute -top-8 left-0"></hr>)
            } </div>

            <div className="flex flex-col w-[24%] relative pl-2">
                <p className="text-sm text-[#C03F4A]">Step 4</p>
                <p className="text-lg text-white font-semibold mt-5">Submit</p>
                <p className="text-sm text-[#86888C] mt-4">Submit your presale</p>

                {
                step === 4 && (<hr className="h-0.5 border-0 bg-[#C03F4A] w-[100%] absolute -top-8 left-0"></hr>)
            } </div>
        </div>

        <div className="bg-[#1B1B1B] rounded-2xl p-5 flex-col gap-[50px] max-sm:flex hidden">
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

        <div className="bg-[#1B1B1B] rounded-2xl p-8 mt-6 max-sm:p-5"> {
            step === 1 && (<div className="flex flex-col gap-8">
                <div className="flex flex-row justify-between max-sm:flex-col-reverse max-sm:gap-6">
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
                    placeholder="Token Address"
                    value={
                        formData.tokenAddress
                    }
                    onChange={handleTokenAddressChange}
                    error={tokenAddressError}
                    // Pass error message to input component
                />

                <div className="flex flex-col gap-5">
                    <p className="text-sm text-[#FA8B84]">Pool Creation fee: 1 BNB</p>
                    <div className="flex flex-col gap-3">
                        <p className="text-sm text-white">Currency</p>
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
                            {`${`Users will pay with ${formData.currency} for your token`}`}
                        </p>
                    </div>

                    <div className="flex flex-col gap-3">
                        <p className="text-sm text-white">Fee options</p>
                        <Radio.Group name="feeOptions"
                            defaultValue={
                                formData.feeOptions
                            }
                            onChange={changeOption}>
                            <Space direction="vertical">
                                <Radio value='0'> {
                                    `3.5% ${
                                        formData.currency
                                    }
                                            raised only`
                                }
                                    <span className="text-[#C03F4A]">(Recommended)</span>
                                </Radio>
                                <Radio value='2'> {
                                    `1.5$ ${
                                        formData.currency
                                    }
                                            raised + 1.5% token sold`
                                }</Radio>
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
            </div>)
        }
            {
            step === 2 && (<div className="flex flex-col gap-7">
                <p className="text-xs text-[#FA8B84]">(*) is required field.</p>
                <div className="flex flex-col gap-2">
                    <Input name="presaleRate" label="Presale rate" placeholder="0" type="number"
                        required={true}
                        onChange={handleCalculateToken}
                        value={
                            formData.presaleRate
                        }/> {
                    formData.presaleRate < 0 && <p className="text-xs text-[#C03F4A]">
                        If I spend 1 how many tokens will I receive?
                    </p>
                } </div>

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

                <div className="flex flex-row gap-6 max-sm:flex-col">
                    <div className="flex flex-col gap-2 w-[100%]">
                        <Input name="softCap"
                            label={
                                `SoftCap (${
                                    formData.currency
                                })`
                            }
                            placeholder="0"
                            type="number"
                            required={true}
                            onChange={changeOption}
                            value={
                                formData.softCap
                            }/> {
                        formData.softCap < (formData.hardCap / 4) && <p className="text-xs text-[#C03F4A]">
                            Softcap must be ≥ 25% of Hardcap!
                        </p>
                    } </div>

                    <div className="flex flex-col gap-2 w-[100%]">
                        <Input name="hardCap"
                            label={
                                `HardCap (${
                                    formData.currency
                                })`
                            }
                            placeholder="0"
                            type="number"
                            required={true}
                            onChange={handleCalculateToken}
                            value={
                                formData.hardCap
                            }/> {
                        formData.hardCap < 0 && <p className="text-xs text-[#C03F4A]">
                            HardCap must be positive number
                        </p>
                    } </div>
                </div>

                <div className="flex flex-row gap-6 max-sm:flex-col">
                    <div className="flex flex-col gap-2 w-[100%]">
                        <Input name="minimumBuy"
                            label={
                                `Minimum buy (${
                                    formData.currency
                                })`
                            }
                            placeholder="0"
                            type="number"
                            required={true}
                            onChange={changeOption}
                            value={
                                formData.minimumBuy
                            }/> {
                        formData.minimumBuy < 0 && <p className="text-xs text-[#C03F4A]">
                            Minimum buy must be positive number
                        </p>
                    } </div>

                    <div className="flex flex-col gap-2 w-[100%]">
                        <Input name="maximumBuy"
                            label={
                                `Maximum buy (${
                                    formData.currency
                                })`
                            }
                            placeholder="0"
                            type="number"
                            required={true}
                            onChange={changeOption}
                            value={
                                formData.maximumBuy
                            }/> {
                        formData.maximumBuy < 0 && <p className="text-xs text-[#C03F4A]">
                            Maximum buy must be positive number
                        </p>
                    } </div>
                </div>

                <div className="flex flex-row gap-6 max-sm:flex-col">
                    <div className="flex flex-col gap-2 w-[100%]">
                        <DefaultSelect name="refundType" label="Refund type"
                            onChange={changeOption}
                            // defaultValue={
                            //     formData.required
                            // }
                            optons={
                                [
                                    {
                                        text: "Burn",
                                        value: "Burn"
                                    }, {
                                        text: "Refund",
                                        value: "Refund"
                                    }
                                ]
                            }
                            required={true}/>
                    </div>

                    <div className="flex flex-col gap-2 w-[100%]">
                        <DefaultSelect name="router" label="Router"
                            onChange={changeOption}
                            defaultValue={
                                formData.router
                            }
                            optons={
                                [{
                                        text: "Pancakeswap",
                                        value: "0xD99D1c33F9fC3444f8101754aBC46c52416550D1"
                                    },]
                            }
                            required={true}/>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <div className="flex flex-row gap-6 max-sm:flex-col">
                        <div className="flex flex-col gap-2 w-[100%] ">
                            <Input name="uniswapLiquidity" label="UniSwap V3 liquidity (%)" placeholder="0" type="number"
                                required={true}
                                onChange={handleCalculateToken}
                                value={
                                    formData.uniswapLiquidity
                                }/> {
                            formData.uniswapLiquidity < 50 && formData.uniswapLiquidity > 0 && <p className="text-xs text-[#C03F4A]">
                                Liquidity must be greater than 50%
                            </p>
                        } </div>

                        <div className="flex flex-col gap-2 w-[100%]">
                            <Input name="uniswapListingRate" label="UniSwap V3 listing rate" placeholder="0" type="number"
                                required={true}
                                onChange={handleCalculateToken}
                                value={
                                    formData.uniswapListingRate
                                }/>
                            <p className="text-xs text-[#C03F4A]"> {
                                `1 BNB = ${
                                    formData.uniswapListingRate
                                } ${
                                    formData.currency
                                }`
                            }</p>
                        </div>
                    </div>
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
                            <div className="flex flex-col relative" name="startDate">
                                <DatePicker selected={
                                        new Date(formData.startDate)
                                    }
                                    onChange={
                                        date => setStartDate(date)
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
                            <div className="flex flex-col relative" name="endDate">
                                <DatePicker selected={
                                        new Date(formData.endDate)
                                    }
                                    onChange={
                                        date => setEndDate(date)
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
                    <Input name="liquidityLockDays" label="Liquidity lockup (days)" placeholder="0" type="number"
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
                        { `Need ${formData.needTokenCnt} ${formData.tokenSymbol} to create launchpad.` }
                    </p>
                    <div className="flex flex-row justify-end gap-5">
                        <button className="px-12 py-[10px] text-sm text-[#FA8B84] rounded-[10px] font-semibold border border-[#FA8B84]"
                            onClick={
                                () => setStep(1)
                        }>
                            Previous
                        </button>

                        <button onClick={handleNextButtonClick}
                            className="px-12 py-[10px] text-sm text-[#151103] font-semibold rounded-[10px] bg-[#FA8B84]">
                            Next
                        </button>
                    </div>
                </div>
            </div>)
        }
            {
            step === 3 && (<div className="flex flex-col gap-7">
                <p className="text-xs text-[#FA8B84]">(*) is required field.</p>
                <div className="flex flex-row gap-6 max-sm:flex-col">
                    <div className="flex flex-col w-[100%]">
                        <Input label="Logo URL" name="logoUrl"
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
                        <Input label="Website" name="websiteUrl"
                            required={true}
                            placeholder="Ex: https://..."
                            icon={WebsiteIcon}
                            onChange={changeOption}
                            value={
                                formData.websiteUrl
                            }/>
                    </div>
                </div>
                <div className="flex flex-row gap-6 max-sm:flex-col">
                    <div className="flex flex-col w-[100%]">
                        <Input label="Facebook" placeholder="Ex: https://facebook.com/..." name="facebookUrl"
                            icon={FacebookIcon}
                            onChange={changeOption}
                            value={
                                formData.facebookUrl
                            }/>
                    </div>

                    <div className="flex flex-col w-[100%]">
                        <Input label="Twitter" placeholder="Ex: https://twitter.com/..." name="twitterUrl"
                            icon={TwitterIcon}
                            onChange={changeOption}
                            value={
                                formData.twitterUrl
                            }/>
                    </div>
                </div>
                <div className="flex flex-row gap-6 max-sm:flex-col">
                    <div className="flex flex-col w-[100%]">
                        <Input label="Github" placeholder="Ex: https://github.com/..." name="githubUrl"
                            icon={GithubIcon}
                            onChange={changeOption}
                            value={
                                formData.githubUrl
                            }/>
                    </div>

                    <div className="flex flex-col w-[100%]">
                        <Input label="Telegram" placeholder="Ex: https://t.me/..." name="telegramUrl"
                            icon={TelegramIcon}
                            onChange={changeOption}
                            value={
                                formData.telegramUrl
                            }/>
                    </div>
                </div>
                <div className="flex flex-row gap-6 max-sm:flex-col">
                    <div className="flex flex-col w-[100%]">
                        <Input label="Instagram" placeholder="Ex: https://instagram.com/..." name="instagramUrl"
                            icon={InstagramIcon}
                            onChange={changeOption}
                            value={
                                formData.instagramUrl
                            }/>
                    </div>

                    <div className="flex flex-col w-[100%]">
                        <Input label="Discord" placeholder="Ex: https://t.me/..." name="discordUrl"
                            icon={DiscordIcon}
                            onChange={changeOption}
                            value={
                                formData.discordUrl
                            }/>
                    </div>
                </div>
                <div className="flex flex-col w-[100%]">
                    <Input label="Reddit" placeholder="Ex: https://reddit.com/..." name="redditUrl"
                        icon={RedditIcon}
                        onChange={changeOption}
                        value={
                            formData.redditUrl
                        }/>
                </div>

                <div className="flex flex-col w-[100%]">
                    <Input label="Youtube Video" placeholder="Ex: https://youtube.com/watch?v=" name="yutubeUrl"
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
                    <textarea name="description" cols="30" rows="10" placeholder="Ex: This project is..." className="bg-[#141414] rounded-[6px] border border-[#2C2C2C] py-[10px] px-4 outline-none text-[white]"
                        onChange={changeOption}></textarea>
                </div>

                <div className="flex flex-col gap-6">
                    <div className="flex flex-row justify-end gap-5">
                        <button className="px-12 py-[10px] text-sm text-[#FA8B84] rounded-[10px] font-semibold border border-[#FA8B84]"
                            onClick={
                                () => setStep(2)
                        }>
                            Previous
                        </button>

                        <button className="px-12 py-[10px] text-sm text-[#151103] font-semibold rounded-[10px] bg-[#FA8B84]"
                            onClick={handleNextButtonClick}>
                            Next
                        </button>
                    </div>
                </div>
            </div>)
        }
            {
            step === 4 && (<div className="flex flex-col">
                <div className="flex flex-col">
                    <div className="py-4 flex flex-row justify-between items-center text-base text-white border-b border-b-[#2C2C2C]">
                        <p>Total token</p>
                        <p className="text-[#C03F4A]">{`${formData.needTokenCnt} ${formData.tokenSymbol}`}</p>
                    </div>

                    <div className="py-4 flex flex-row justify-between items-center text-base text-white border-b border-b-[#2C2C2C]">
                        <p>Token name</p>
                        <p> {formData.tokenName}</p>
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
                        <p>Presale rate</p>
                        <p>{`${formData.presaleRate} ${formData.tokenSymbol}`}</p>
                    </div>

                    <div className="py-4 flex flex-row justify-between items-center text-base text-white border-b border-b-[#2C2C2C]">
                        <p>Sale method</p>
                        <p>Public</p>
                    </div>

                    <div className="py-4 flex flex-row justify-between items-center text-base text-white border-b border-b-[#2C2C2C]">
                        <p>Softcap</p>
                        <p>{formData.softCap}</p>
                    </div>

                    <div className="py-4 flex flex-row justify-between items-center text-base text-white border-b border-b-[#2C2C2C]">
                        <p>Hardcap</p>
                        <p>{formData.hardCap}</p>
                    </div>

                    <div className="py-4 flex flex-row justify-between items-center text-base text-white border-b border-b-[#2C2C2C]">
                        <p>Unsold tokens</p>
                        <p>{formData.refundType}</p>
                    </div>

                    <div className="py-4 flex flex-row justify-between items-center text-base text-white border-b border-b-[#2C2C2C]">
                        <p>Minimum buy</p>
                        <p>{`${formData.minimumBuy} ${formData.currency}`}</p>
                    </div>

                    <div className="py-4 flex flex-row justify-between items-center text-base text-white border-b border-b-[#2C2C2C]">
                        <p>Maximum buy</p>
                        <p>{`${formData.maximumBuy} ${formData.currency}`}</p>
                    </div>

                    <div className="py-4 flex flex-row justify-between items-center text-base text-white border-b border-b-[#2C2C2C]">
                        <p>Liquidity</p>
                        <p>{formData.uniswapLiquidity}</p>
                    </div>

                    <div className="py-4 flex flex-row justify-between items-center text-base text-white border-b border-b-[#2C2C2C]">
                        <p>Start time</p>
                        <p>{formData.startDate}</p>
                    </div>

                    <div className="py-4 flex flex-row justify-between items-center text-base text-white border-b border-b-[#2C2C2C]">
                        <p>End time</p>
                        <p>{formData.endDate}</p>
                    </div>

                    <div className="py-4 flex flex-row justify-between items-center text-base text-white border-b border-b-[#2C2C2C]">
                        <p>Liquidity lockup time</p>
                        <p>{formData.liquidityLockDays} days</p>
                    </div>

                    <div className="py-4 flex flex-row justify-between items-center text-base text-white border-b border-b-[#2C2C2C]">
                        <p>Website</p>
                        <p className="text-[#C03F4A]">{formData.websiteUrl}</p>
                    </div>

                    <div className="py-4 flex flex-row justify-between items-center text-base text-white border-b border-b-[#2C2C2C]">
                        <p>Facebook</p>
                        <p>{formData.facebookUrl}</p>
                    </div>

                    <div className="py-4 flex flex-row justify-between items-center text-base text-white border-b border-b-[#2C2C2C]">
                        <p>Telegram</p>
                        <p>{formData.telegramUrl}</p>
                    </div>

                    {/* <div className="py-4 flex flex-row justify-between items-center text-base text-white border-b border-b-[#2C2C2C]">
                                <p>Using Team Vesting?</p>
                                <p>No</p>
                            </div> */} </div>

                <div className="p-[17px] max-sm:p-[10px] flex flex-row items-center gap-6 max-sm:gap-2 border border-[#262626] bg-[#141414] rounded-[6px] mt-[50px]">
                    <ExportedImage src={WarningIcon}
                        alt="Warning"/>
                    <p className="text-sm text-white max-sm:text-xs break-words max-sm:w-[245px]">
                        Please exclude Flash Factory address
                        {process.env.NEXT_PUBLIC_PRESALE_FACTORY} PL from fees, rewards,
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

                <div className="flex flex-col gap-6 mt-3">
                    <div className="flex flex-row justify-end gap-5">
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
            </div>)
        } </div>
    </div>);
};

export default Launchpad;
