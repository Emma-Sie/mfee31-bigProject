import React, { useState } from "react"
import InputReceiver from "./InputReceiver"


function CartInfo2_1() {
    const [values, setValues] = useState({
        name: "",
        phone: "",
    });
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
        {
            id: 3,
            name: "address",
            type: "text",
            placeholder: "收件人地址",
            errorMessage: "地址格式錯誤",
            label: "收件人地址",
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

    return (
        <>
            <div className="info2-1 text-left">
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
                        <p>已選擇的送貨方式: 配送到宅</p>
                        <p>
                            <input type="checkbox" value="info-correct" />
                            <span>收件人資料與顧客資料相同</span>
                        </p>
                        {inputs.map((v, i) => {
                            return (
                                <>
                                    <p>{v.label}</p>
                                    <InputReceiver placeholder={v.placeholder} />
                                </>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default CartInfo2_1;