"use client";
import {
    Input,
    Form,
    InputNumber,
    Row,
    Col,
    Select
} from 'antd';

const { Option } = Select;

const BabyToken = () => {
    const wrapperCol = {
        xs: {
            span: 24
        },
        sm: {
            span: 12
        },
        md: {
            span: 12
        },
        lg: {
            span: 12
        },
        xl: {
            span: 12
        }
    };
    
    const children = [];
    children.push (
        <Col>
            <Row gutter={
                    [16, 16]
                }
                justify="center">
                <Col {...wrapperCol}>
                    <Form.Item name='tokenName'
                        label='TOKEN NAME'
                        className=""
                        rules={
                            [{
                                    required: true,
                                    message: "Please input token name!"
                                }]
                    }>
                        <Input placeholder="Ex: Ethereum" className="w-[100%] h-[59px] text-white outline-none border border-[#2C2C2C] bg-[#141414] p-5 focus:bg-[#141414] hover:bg-[#141414]"
                            />
                    </Form.Item>
                </Col>
                <Col {...wrapperCol}>
                    <Form.Item name='tokenSymbol'
                        label='TOKEN SYMBOL'
                        rules={
                            [{
                                    required: true,
                                    message: "Please input token symbol!"
                                }]
                    }>
                        <Input placeholder="Ex: ETH" className="w-[100%] h-[59px] text-white outline-none border border-[#2C2C2C] bg-[#141414] p-5 focus:bg-[#141414] hover:bg-[#141414]"
                            />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={
                    [16, 16]
                }
                justify="center">
                <Col {...wrapperCol}>
                    <Form.Item name='totalSupply'
                        label='TOTAL SUPPLY'
                        rules={
                            [{
                                    required: true,
                                    message: "Please input total supply!"
                                }]
                    }>
                        <InputNumber placeholder="Ex: 1000000000" className="w-[100%] h-[59px] text-white border border-[#2C2C2C] bg-[#141414] p-5 focus:bg-[#141414] hover:bg-[#141414]"
                            />
                    </Form.Item>
                </Col>
                <Col {...wrapperCol}>
                    <Form.Item name="router" label="ROUTER" className='router-select' initialValue='0xD99D1c33F9fC3444f8101754aBC46c52416550D1'>
                        <Select className="">
                            <Option value="0xD99D1c33F9fC3444f8101754aBC46c52416550D1">Pancakeswap</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={
                    [16, 16]
                }
                justify="center">
                <Col {...wrapperCol}>
                    <Form.Item name='rewardToken' label='REWARD TOKEN'
                    rules={
                        [{
                                required: true,
                                message: "Please input reward token!"
                            }]
                }>
                        <Input placeholder="Ex: 0x...." className="w-[100%] h-[59px] text-white outline-none border border-[#2C2C2C] bg-[#141414] p-5 focus:bg-[#141414] hover:bg-[#141414]"
                            />
                    </Form.Item>
                </Col>
                <Col {...wrapperCol}>
                    <Form.Item name='minimumTokenBalance' label='MINIMUM TOKEN BALANCE FOR DIVIDENDS'
                    rules={
                        [{
                                required: true,
                                message: "Please input minimum token balance for dividends!"
                            }]
                }>
                        <InputNumber placeholder="Ex: 100000" className="w-[100%] h-[59px] text-white outline-none border border-[#2C2C2C] bg-[#141414] p-5 focus:bg-[#141414] hover:bg-[#141414]"
                            />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={
                    [16, 16]
                }
                justify="center">
                <Col {...wrapperCol}>
                    <Form.Item name='tokenRewardFee' label='TOKEN REWARD FEE (%)'
                        rules={
                            [{
                                    required: true,
                                    message: "Please input token reward fee!"
                                }]
                    }>
                        <InputNumber placeholder="0 - 100" className="w-[100%] h-[59px] text-white outline-none border border-[#2C2C2C] bg-[#141414] p-5 hover:bg-[#141414]"
                            />
                    </Form.Item>
                </Col>
                <Col {...wrapperCol}>
                    <Form.Item name='autoAddLiquidity' label='AUTO ADD LIQUIDITY (%)'
                        rules={
                            [{
                                    required: true,
                                    message: "Please input auto add liquidity!"
                                }]
                    }>
                        <InputNumber placeholder="0 - 25" className="w-[100%] h-[59px] text-white outline-none border border-[#2C2C2C] bg-[#141414] p-5 focus:bg-[#141414] hover:bg-[#141414]"
                            />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={
                    [16, 16]
                }
                justify="center">
                <Col {...wrapperCol}>
                    <Form.Item name='marketingFee' label='MARKETING FEE (%)'
                    rules={
                        [{
                                required: true,
                                message: "Please input marketing fee!"
                            }]
                }>
                        <InputNumber placeholder="0 - 25" className="w-[100%] h-[59px] text-white outline-none border border-[#2C2C2C] bg-[#141414] p-5 focus:bg-[#141414] hover:bg-[#141414]"
                            />
                    </Form.Item>
                </Col>
                <Col {...wrapperCol}>
                    <Form.Item name='marketingWallet' label='MARKETING WALLET'
                    rules={
                        [{
                                required: true,
                                message: "Please input marketing wallet!"
                            }]
                }>
                        <Input placeholder="Ex: 0x...." className="w-[100%] h-[59px] text-white outline-none border border-[#2C2C2C] bg-[#141414] p-5 focus:bg-[#141414] hover:bg-[#141414]"
                            />
                    </Form.Item>
                </Col>
            </Row>
        </Col>
    );
    return children;
}

export default BabyToken;
