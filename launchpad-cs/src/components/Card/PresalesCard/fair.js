"use client"; // Need to send a JavaScript function to the browser 👈🏽
import PresalesCardHeader from "@/assets/icons/presalescard-header.svg";

import Image from "next/image";

import CardOneBack from "@/assets/image/presales-card-1-back.png";
import CardOneLogo from "@/assets/image/presales-card-1-logo.png";

import Ethereum from "@/assets/icons/ethereum.svg";
import PresalesAlarm from "@/assets/icons/presales-alarm.svg";
import PresalesFavorites from "@/assets/icons/presales-favorites.svg";

import Badge from "./Badge";
import {useRouter} from "next/navigation";
// import {useNavgation} from "next/router";

import ExportedImage from "next-image-export-optimizer";

const Fair = ({
    title = "Wagmi Token",
    text = "Launchpad - Max Spots : 180",
    link = "/presales/test_presale",
    BKImage = CardOneBack,
    IogoImage = CardOneLogo,
    allData={}
}) => {
    const router = useRouter();
    // const navigation=useNavgation()
    const startDate = new Date(allData.startDate);
    const year = startDate.getFullYear();
    const month = String(startDate.getMonth() + 1).padStart(2, '0'); // Adding 1 because months are zero-based
    const day = String(startDate.getDate()).padStart(2, '0');
    const formattedstartDate = `${year}-${month}-${day}`;
    const onHandleView = () => {
        
        router.push(
            link
        );
    };

    return (
        <div >
            <div className="h-[599px]">
                <div className="flex flex-col justify-center items-center">
                    <ExportedImage src={PresalesCardHeader}
                        alt="image"/>
                </div>

                <div className="h-[572px] rounded-2xl bg-[#1B1B1B] overflow-hidden relative border border-[#2C2C2C]">
                    <ExportedImage src={CardOneBack}
                        alt="background"/> {/* <ExportedImage
          src={CardOneLogo}
          alt="logo"
          className="absolute top-[76px] left-5 border-[1px] border-[#202125] rounded-full"
        /> */}
                    <div className="flex flex-row py-1 items-center px-2 bg-[#D1FAE5] rounded-[50px] gap-1 absolute top-3 right-3">
                        <div className="w-[8px] h-[8px] bg-[#10B981] rounded-full"></div>
                        <p className="text-xs text-[#10B981] font-semibold">Sale Live</p>
                    </div>
                    <div className="pt-4 px-5 pb-5">
                        <div className="flex justify-end gap-[8px]">
                            {/* <Badge />
            <Badge
              text="KYC"
              BgClass="bg-[#C03F4A29]/[.16]"
              TxColor="text-[#C03F4A]"
            />
            <Badge
              text="KYB"
              BgClass="bg-[#51C40A29]/[.16]"
              TxColor="text-[#51C40A]"
            /> */} </div>

                        <div className="flex justify-between mt-5 items-center">
                            <div className="flex flex-col gap-[9px]">
                                <p className="text-white text-[22px] font-semibold">{title}</p>
                                <p className="text-white text-[14px] font-semibold">
                                    {text}
                                </p>
                            </div>
                            {/* <ExportedImage
                                alt="Image"/> */}
                        </div>

                        <div className="flex flex-col mt-6 gap-2">
                            <p className="text-[#86888C] text-[16px]">Progress 0%</p>

                            <div className="bg-[#2C2C2C] rounded-[150px] w-[326px] h-[12px] relative">
                                <div className="absolute bg-[#C03F4A] rounded-[150px] h-[12px] w-[0px]"></div>
                            </div>

                            <div className="flex justify-between">
                                <p className="text-[#86888c] text-[14px]">0 {allData.currency}</p>
                                <p className="text-[#C03F4A] text-[14px]">{allData.hardCap} {allData.currency}</p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 mt-6">
                            <div className="flex justify-between items-center">
                                <p className="text-white text-[14px]">Softcap</p>
                                <div className="flex flex-col w-[60%] h-[1px] border border-dashed border-[#2C2C2C]"></div>
                                <p className="text-[#C03F4A] text-[14px]">{allData.softCap} {allData.currency}</p>
                            </div>
                            <div className="flex justify-between items-center">
                                <p className="text-white text-[14px]">Hardcap</p>
                                <div className="flex flex-col w-[70%] h-[1px] border border-dashed border-[#2C2C2C]"></div>
                                <p className="text-[#C03F4A] text-[14px]">{allData.hardCap} {allData.currency}</p>
                            </div>
                            <div className="flex justify-between items-center">
                                <p className="text-white text-[14px]">Liquidity</p>
                                <div className="flex flex-col w-[60%] h-[1px] border border-dashed border-[#2C2C2C]"></div>
                                <p className="text-[#C03F4A] text-[14px]">{allData.uniswapLiquidity}%</p>
                            </div>
                            <div className="flex justify-between items-center">
                                <p className="text-white text-[14px]">Locked</p>
                                <div className="flex flex-col w-[60%] h-[1px] border border-dashed border-[#2C2C2C]"></div>
                                <p className="text-[#C03F4A] text-[14px]">{allData.liquidityLockDays} Days</p>
                            </div>
                        </div>
                        <hr className="h-px w-[366px] mt-6 -ml-5 bg-[#2C2C2C] border-0"></hr>

                        <div className="flex justify-between mt-4">
                            <div className="flex flex-col gap-2">
                                <p className="text-[#86888C] text-[12px]">Listing Time</p>
                                <p className="text-[#86888C] text-[16px]">{formattedstartDate}</p>
                            </div>
                            <div className="flex gap-2 items-center">
                                <ExportedImage src={PresalesAlarm}
                                    className="cursor-pointer"
                                    alt="image"/>
                                <ExportedImage src={PresalesFavorites}
                                    className="cursor-pointer"
                                    alt="image"/>
                                <div onClick={
                                        () => onHandleView()
                                    }
                                    className="cursor-pointer px-2 py-1 rounded-md bg-[#C03F4A] bg-opacity-10">
                                    <span className="text-[#C03F4A]">
                                        View
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Fair;
