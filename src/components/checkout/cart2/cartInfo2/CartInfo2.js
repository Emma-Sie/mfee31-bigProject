import React, { useState } from "react"
import Row from 'react-bootstrap/Row';
import { Col } from "react-bootstrap";
import { Button, Input,Select } from 'antd';
import { useData } from "../../../../utils/useData";

// import InputReceiver from "./InputReceiver"
import SlectStore from "./SlectStore"

function CartInfo2() {
    // const [values, setValues] = useState({
    //     name: "",
    //     phone: "",
    // });
    const {values,setValues}=useData()

    const inputs = [
        {
            id: 1,
            name: "name",
            type: "text",
            placeholder: "收件人名稱",
            errorMessage:
                "請輸入收件人名稱",
            label: "收件人名稱",
            pattern: "^{3}$",
            required: true,
        },
        {
            id: 2,
            name: "phone",
            type: "tel",
            placeholder: "收件人電話",
            errorMessage: "電話格式錯誤",
            label: "收件人電話",
            pattern: `^[0-9]{3}-[0-9]{3}-[0-9]{4}$`,
            required: true,
        },
    ]

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const onChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    };

    // 取貨者資料是否相同
    const [receiverName, setReceiverName] = useState('');
    const [receiverPhone, setReceiverPhone] = useState('');
    // const [receiverInfo, setReceiverInfo] = useState('');
    const handleReceiver = (e) => {
        if (e.target.checked) {
            // setReceiverName('joe')
            // setReceiverPhone('0911111111')
            setValues({name:'joe',phone:'091111111'})
        } 
    }

    // 門市選擇
    const [StoreName, setStoreName] = useState('');
    const [StoreAddress, setStoreAddress] = useState('');
    const handleStoreChoose = (e) => {
        console.log(`selected ${e.target.value}`);
        setStoreName(e.target.value)
        setStoreAddress(e.target.address)
    };
    
    const [toggle, setToggle] = useState(true);
    const handleStore = () => {
        setToggle(!toggle);
    }

    return (
        <>
            <div className="info2 text-left">
                <div className="left">
                    <div className="title fw-bolder h5 mb-0">
                        買家資料
                    </div>
                    <div className="content-info ">
                        <p><span className="fw-bolder">買家名稱</span><br />Jodie</p>
                        <p><span className="fw-bolder">電子信箱</span><br />jodie@gmail.com</p>
                        <p><span className="fw-bolder">電話號碼</span><br />0966666666</p>
                        <p><span className="fw-bolder">生日</span><br />1966 - 6 - 6</p>
                    </div>
                </div>
                <div className="right">
                    <div className="title fw-bolder h5 mb-0">
                        送貨資料
                    </div>
                    <div className="content-info">

                        <p>已選擇的送貨方式: 取貨付款</p>
                        <p>
                            <input type="checkbox" value="info-correct" onChange={handleReceiver} />
                            <span>收件人資料與顧客資料相同</span>
                        </p>

                        {/* {inputs.map((v, i) => {
                            return (
                                <>
                                    <p>{v.label}</p>
                                    <InputReceiver placeholder={v.placeholder}/>
                                </>
                            )
                        })} */}
                        <p className="mb-1">收件人名稱</p>
                        <Input className="mb-3" placeholder="請輸入收件人名稱" value={values.name} onChange={(e)=>{setValues({...values,name:e.target.value})}}></Input>
                        <p className="mb-1">收件人電話</p>
                        <Input className="mb-3" placeholder="請輸入收件人名稱" value={values.phone} onChange={(e)=>{setValues({...values,phone:e.target.value})}} ></Input>

                        <hr />
                        <p>選擇7-11超商門市</p>
                        {toggle ?
                            <Row>
                                <Col sm={8}>
                                    <Select
                                        defaultValue="海神"
                                        style={{
                                            width: 200,
                                        }}
                                        onChange={handleStoreChoose}
                                        options={[
                                            {
                                                value: '海神',
                                                label: '海神',
                                                address: '新北市八里區中山路二段6號8號'
                                            },
                                            {
                                                value: '千禧',
                                                label: '千禧',
                                                address: '桃園市龜山區光峰路千禧新城15號1樓'
                                            },
                                            {
                                                value: '福冠',
                                                label: '福冠',
                                                address: '桃園市中壢區福州一街242號1樓及2樓'
                                            },
                                            {
                                                value: '台達電',
                                                label: '台達電',
                                                address: '桃園市龜山區山鶯路252號B1樓'
                                            },
                                        ]}
                                    />
                                </Col>
                                <Col >
                                    <Button type="primary" style={{
                                        backgroundColor: "black",
                                    }} onClick={handleStore}>選擇門市</Button>
                                </Col>
                            </Row>
                            :
                            <div>
                                <p>已選擇的門市名稱：{StoreName}</p>
                                <p>門市地址：{StoreAddress}</p>
                                <Button type="primary" style={{
                                    backgroundColor: "black"
                                }} className="w-100" onClick={handleStore}>更改</Button>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default CartInfo2;