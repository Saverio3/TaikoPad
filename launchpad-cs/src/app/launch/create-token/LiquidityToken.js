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

const LiquidityToken = () => {
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
                    <Form.Item name='transactionFeeToYield'
                        label='TRANSACTION FEE TO GENERATE YIELD (%)'
                        rules={
                            [{
                                    required: true,
                                    message: "Please input generate yield!"
                                }]
                    }>
                        <InputNumber placeholder="Ex: 1" className="w-[100%] h-[59px] text-white outline-none border border-[#2C2C2C] bg-[#141414] p-5 hover:bg-[#141414]"
                            />
                    </Form.Item>
                </Col>
                <Col {...wrapperCol}>
                    <Form.Item name='transactionFeeToLiquidity'
                        label='TRANSACTION FEE TO GENERATE LIQUIDITY (%)'
                        rules={
                            [{
                                    required: true,
                                    message: "Please input generate liquidity!"
                                }]
                    }>
                        <InputNumber placeholder="Ex: 1" className="w-[100%] h-[59px] text-white outline-none border border-[#2C2C2C] bg-[#141414] p-5 focus:bg-[#141414] hover:bg-[#141414]"
                            />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={
                    [16, 16]
                }
                justify="center">
                <Col {...wrapperCol}>
                    <Form.Item name='marketingAddress' label='CHARITY/MARKETING ADDRESS'
                    rules={
                        [{
                                required: true,
                                message: "Please input charity/marketing address!"
                            }]
                }>
                        <Input placeholder="Ex: 0x...." className="w-[100%] h-[59px] text-white outline-none border border-[#2C2C2C] bg-[#141414] p-5 focus:bg-[#141414] hover:bg-[#141414]"
                            />
                    </Form.Item>
                </Col>
                <Col {...wrapperCol}>
                    <Form.Item name='marketingPercent' label='CHARITY/MARKETING PERCENT (%)'
                    rules={
                        [{
                                required: true,
                                message: "Please input charity/marketing percent!"
                            }]
                }>
                        <InputNumber placeholder="0 - 25" className="w-[100%] h-[59px] text-white outline-none border border-[#2C2C2C] bg-[#141414] p-5 focus:bg-[#141414] hover:bg-[#141414]"
                            />
                    </Form.Item>
                </Col>
            </Row>
        </Col>
    );
    return children;
}

export default LiquidityToken;
