"use client";

import React, { useState, useEffect } from "react";

// ! import components
import DefaultCard from "@/components/Card/DefaultCard";
import Success from "@/components/Alert/Success";
import DefaultSelect from "@/components/Form/DefaultSelect";
import { Button, message, Form } from 'antd';
import {useRouter} from "next/navigation";

// ! import Image
import BurnImage from "@/assets/image/burn-image.png";
import ExportedImage from "next-image-export-optimizer";
import ContractWrite from '@/app/launch/create-token/contract-write'
import StandardToken from "./StandardToken";
import LiquidityToken from "./LiquidityToken";
import BabyToken from "./BabyToken";
import BuyBackBabyToken from "./BuyBackBabyToken";

const CreateToken = () => {
    const router=useRouter()
    const tokenType = [
        {
            text: "Standard Token",
            value: '1'
        }, {
            text: "Liquidity Generator Token",
            value: '2'
        }, {
            text: "Baby Token",
            value: '3'
        }, {
            text: "Buyback Baby Token",
            value: '4'
        },
    ];

    const [currentToken, setCurrentToken] = useState("1");
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm();
    
    const changeTokenType = (e) => {
        setCurrentToken(e.target.value);
        form.resetFields();
    }

    const CreateNewToken = async (fieldsValue) => { // Standard Token
        console.log(currentToken);
        if (currentToken === '1') {
           
            const address = '0xA9EAf37d95A30e0fC2AB6405Ce1af00b74C6757f';
            const param = [ fieldsValue.tokenName, fieldsValue.tokenSymbol, fieldsValue.tokenDecimals, fieldsValue.totalSupply ];
            ContractWrite(address, param, messageApi, currentToken,'Token Created Successfuly',fieldsValue,router,function(msg) {
                
            });
            form.resetFields();
        } else if (currentToken === '2') { // Liquidity Generator c
            const address = '0xA20E5c308Fcfab355629FeB76d3bF812A10392d3';
            const param = [ fieldsValue.tokenName, fieldsValue.tokenSymbol, fieldsValue.totalSupply, fieldsValue.router, fieldsValue.marketingAddress, fieldsValue.transactionFeeToYield, fieldsValue.transactionFeeToLiquidity, fieldsValue.marketingPercent ];
            ContractWrite(address, param, messageApi, currentToken,'Token Created Successfuly',fieldsValue,router,function(msg) {
                
            });
        } else if (currentToken === '3') {
            const address = '0x91F9aE081EC150983c1D464ed9d74C129a351a53';
            const param = [ fieldsValue.tokenName, fieldsValue.tokenSymbol, fieldsValue.totalSupply, [fieldsValue.rewardToken, fieldsValue.router, fieldsValue.marketingWallet, '0x73acA5510ea78AE118B1A1129a295d40Bf92dFE1'], [fieldsValue.tokenRewardFee, fieldsValue.autoAddLiquidity, fieldsValue.marketingFee], fieldsValue.minimumTokenBalance ];
            ContractWrite(address, param, messageApi, currentToken,'Token Created Successfuly',fieldsValue,router,function(msg) {
                
            });
            form.resetFields();
        } else {
            const address = '0xA23BF8B4A5458bbF0Abe567Cb6DC25b69a95FbB1';
            const param = [ fieldsValue.tokenName, fieldsValue.tokenSymbol, fieldsValue.totalSupply, fieldsValue.rewardToken, fieldsValue.router, [ fieldsValue.liquidityFee, fieldsValue.buyBackFee, fieldsValue.reflectionFee, fieldsValue.marketingFee, 70 ] ];
            ContractWrite(address, param, messageApi, currentToken,'Token Created Successfuly',fieldsValue,router,function(msg) {
                
            });
            form.resetFields();
        }
    }

    return (
        <div className="relative min-h-[1500px] mt-8 lg:mt-0">
            {contextHolder}
            <DefaultCard 
                header="Create Token"
                footer={true}
                form={form}
                footerWrapper={
                        <div className="flex flex-row gap-6 justify-end max-sm:flex-row-reverse">
                        <Button htmlType="reset" className="px-8 py-4 border border-[#86888C] rounded-[8px] text-center text-[#86888C] text-[20px] max-sm:text-sm max-sm:px-6 h-[100%] ant-hover-btn">
                            RESET
                        </Button>
                         <Button htmlType="submit" className="px-8 py-4 border border-[#86888C] bg-[#C03F4A] rounded-[8px] text-center text-[#000] text-[20px] max-sm:text-sm max-sm:px-6 h-[100%] ant-hover-btn">
                            Create New Token
                        </Button>
                    </div>
                }
                onFinish={CreateNewToken}>
                <div>
                    <Success>
                        <p className="text-white text-[14px]">
                            All created tokens include an Audit.
                            <br />
                            Audits can be found
                            <span className="text-[#C03F4A]">here</span>.
                            Created tokens also get Audit badge on TaikoPad presales
                            automatically.
                        </p>
                    </Success>
                    <div className="flex flex-col pt-11 gap-8">
                        <div>
                            <DefaultSelect optons={tokenType}
                                onChange={changeTokenType} />
                                
                            <span className="text-[14px] text-[#C03F4A]">Fee: 0.1 BNB</span>
                        </div>
                        {
                            currentToken === "1" && 
                                <StandardToken onFinish={CreateNewToken} />
                        }
                        {
                            currentToken === "2" && 
                                <LiquidityToken onFinish={CreateNewToken} />
                        }
                        {
                            currentToken === "3" && 
                                <BabyToken onFinish={CreateNewToken} />
                        }
                        {
                            currentToken === "4" && 
                                <BuyBackBabyToken onFinish={CreateNewToken} />
                        }
                    </div>
                </div>
            </DefaultCard>

            <ExportedImage src={BurnImage}
                alt="image"
                className="absolute -bottom-16 -right-10 max-sm:hidden" />
        </div>
    );
};

export default CreateToken;
