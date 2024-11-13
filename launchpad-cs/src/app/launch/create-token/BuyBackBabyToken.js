"use client";
import {
    Input,
    Form,
    InputNumber,
    Row,
    Col,
    Select
} from 'antd';

const {Option} = Select;

const BuyBackBabyToken = () => {
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
                    <Form.Item name='tokenName' label='TOKEN NAME' className=""
                        rules={
                            [{
                                    required: true,
                                    message: "Please input token name!"
                                }]
                    }>
                        <Input placeholder="Ex: Ethereum" className="w-[100%] h-[59px] text-white outline-none border border-[#2C2C2C] bg-[#141414] p-5 focus:bg-[#141414] hover:bg-[#141414]"/>
                    </Form.Item>
                </Col>
                <Col {...wrapperCol}>
                    <Form.Item name='tokenSymbol' label='TOKEN SYMBOL'
                        rules={
                            [{
                                    required: true,
                                    message: "Please input token symbol!"
                                }]
                    }>
                        <Input placeholder="Ex: ETH" className="w-[100%] h-[59px] text-white outline-none border border-[#2C2C2C] bg-[#141414] p-5 focus:bg-[#141414] hover:bg-[#141414]"/>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={
                    [16, 16]
                }
                justify="center">
                <Col {...wrapperCol}>
                    <Form.Item name='totalSupply' label='TOTAL SUPPLY'
                        rules={
                            [{
                                    required: true,
                                    message: "Please input total supply!"
                                }]
                    }>
                        <InputNumber placeholder="Ex: 1000000000" className="w-[100%] h-[59px] text-white border border-[#2C2C2C] bg-[#141414] p-5 focus:bg-[#141414] hover:bg-[#141414]"/>
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
                        <Input placeholder="Ex: 0x...." className="w-[100%] h-[59px] text-white outline-none border border-[#2C2C2C] bg-[#141414] p-5 focus:bg-[#141414] hover:bg-[#141414]"/>
                    </Form.Item>
                </Col>
                <Col {...wrapperCol}>
                    <Form.Item name='liquidityFee' label='LIQUIDITY FEE (%)'
                    rules={
                            [{
                                    required: true,
                                    message: "Please input liquidity fee!"
                                }]
                    }>
                        <InputNumber placeholder="1 - 100" className="w-[100%] h-[59px] text-white outline-none border border-[#2C2C2C] bg-[#141414] p-5 focus:bg-[#141414] hover:bg-[#141414]"/>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={
                    [16, 16]
                }
                justify="center">
                <Col {...wrapperCol}>
                    <Form.Item name='buyBackFee' label='BUYBACK FEE (%)'
                    rules={
                            [{
                                    required: true,
                                    message: "Please input buyback fee!"
                                }]
                    }>
                        <InputNumber placeholder="3" className="w-[100%] h-[59px] text-white outline-none border border-[#2C2C2C] bg-[#141414] p-5 hover:bg-[#141414]"/>
                    </Form.Item>
                </Col>
                <Col {...wrapperCol}>
                    <Form.Item name='reflectionFee' label='REFLECTION FEE (%)'
                    rules={
                            [{
                                    required: true,
                                    message: "Please input reflection fee!"
                                }]
                    }>
                        <InputNumber placeholder="8" className="w-[100%] h-[59px] text-white outline-none border border-[#2C2C2C] bg-[#141414] p-5 focus:bg-[#141414] hover:bg-[#141414]"/>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={
                    [16, 16]
                }
                justify="center">
                <Col span={24}>
                    <Form.Item name='marketingFee' label='MARKETING FEE (%)'
                    rules={
                            [{
                                    required: true,
                                    message: "Please input marketing fee!"
                                }]
                    }>
                        <InputNumber placeholder="0 - 100" className="w-[100%] h-[59px] text-white outline-none border border-[#2C2C2C] bg-[#141414] p-5 focus:bg-[#141414] hover:bg-[#141414]"/>
                    </Form.Item>
                </Col>
            </Row>
        </Col>
    );
    return children;
}

export default BuyBackBabyToken;
