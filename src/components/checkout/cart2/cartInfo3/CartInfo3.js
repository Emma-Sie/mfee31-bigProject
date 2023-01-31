import React, { useState } from "react"
import InputArea from "./InputArea"

const typeOptions =
    [{ label: '捐贈發票', sites: ['財團法人至善社會福利基金會'] },
    { label: '雲端發票', sites: ['會員載具(發票會寄至您的電郵)'] },
    { label: '紙本發票', sites: ['紙本發票會隨商品一同寄送給您'] }]

function CartInfo3() {

    const [ivoiceType, setIvoiceType] = useState(typeOptions[0].label);

    const [site, setSite] = useState(typeOptions[0].sites[0]);

    const handleChange = (e) => {
        e.preventDefault();
        setIvoiceType(e.target.value)

        typeOptions.map((v, i) => {
            if (e.target.value === v.label) {
                setSite(v.sites[0])
            }
        })
    };
    return (
        <>
            <div className="info3 text-left">
                <div className="left">
                    <div className="title fw-bolder h5 mb-0">
                        訂單備註
                    </div>
                    <div className="content-info">
                        <InputArea placeholder="有甚麼想告訴賣家的嗎？" />
                    </div>
                </div>
                <div className="right">
                    <div className="right-top mb-2">
                        <div className="title fw-bolder h5 mb-0">
                            付款資料
                        </div>
                        <div className="content-info">
                            <p>已選擇的付款方式: 取貨付款</p>
                        </div>
                    </div>
                    <div className="right-buttom">
                        <div className="title fw-bolder h5 mb-0">
                            索取發票
                        </div>
                        <div className="content-info">
                            <p>發票類型</p>

                            <select className="w-100 mb-3" onChange={handleChange} value={ivoiceType}>
                                {typeOptions.map((v, i) => {
                                    return (
                                        <option key={i}>{v.label}</option>
                                    )
                                })}
                            </select>

                            <p>提供方式</p>
                            <select className="w-100 mb-3" value={site} onChange={(e) => {
                                setSite(e.target.value)
                                typeOptions.map((v, i) => {
                                    if (e.target.value === v.sites[0]) {
                                        setIvoiceType(v.label)
                                    }
                                })
                            }}>
                                {typeOptions.map((v, i) => {
                                    return (
                                        <option key={i}>{v.sites[0]}</option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default CartInfo3;
