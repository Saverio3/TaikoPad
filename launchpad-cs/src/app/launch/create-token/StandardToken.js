"use client";
import {
    Input,
    Form,
    InputNumber,
    Row,
    Col
} from 'antd';

const StandardToken = () => {
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
                    <Form.Item name='tokenDecimals'
                        label='TOKEN DECIMALS'
                        className=""
                        rules={
                            [{
                                    required: true,
                                    message: "Please input token decimals!"
                                }]
                    }>
                        <InputNumber placeholder="18" className="w-[100%] h-[59px] text-white outline-none border border-[#2C2C2C] bg-[#141414] p-5 focus:bg-[#141414] hover:bg-[#141414]"/>
                    </Form.Item>
                </Col>
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
            </Row>
        </Col>
    );
    return children;
}

export default StandardToken;
