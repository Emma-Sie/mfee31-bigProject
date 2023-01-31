import { display } from "@mui/system";
import React , { useState } from "react";
import Table from 'react-bootstrap/Table';
// import InputNum from "../../cart/inputNumber/InputNumber";
// import { BsFillTrashFill } from "react-icons/bs";
import { FcExpand } from "react-icons/fc"
import { useCart } from '../../../../utils/useCart'


function CartTable() {
    const [toggleForm , setToggleForm] = useState(false);
    const handleForm = () => {
        setToggleForm(!toggleForm);
    };

    const { cart, items, plusOne, minusOne, removeItem } = useCart()

    return (
        <>
            <Table className="border" >
                <thead>
                    <tr className="bg-secondary">
                        <th
                            colSpan={5}
                            className="text-center text-dark fw-bolder h3"
                        >
                            <p style={{ fontWeight: "700"}}>合計：NT${cart.finalTotal}</p>
                            <p>購物車</p>
                            <FcExpand onClick={handleForm}/>
                        </th>
                    </tr>
                    {toggleForm ? 
                    <tr className="text-center">
                        <th>商品資料</th>
                        <th >優惠</th>
                        <th >單價</th>
                        <th >數量</th>
                        <th >小計</th>
                    </tr >
                    : <></>}
                </thead>
                {toggleForm ? 
                <tbody className="">
                    {items.map((v,i) => (
                        <tr key={v.id} >
                            <td className="text-left"><img src={v.picture} alt="" className="w-25"/>{v.name}</td>
                            <td className="text-center">NT$0</td>
                            <td className="text-center">NT${v.price}</td>
                            <td className="text-center">{v.quantity}</td>
                            <td className="text-center">NT${v.itemTotal}</td>
                        </tr>
                    ))}
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                            <div className="d-flex flex-column text-start">
                                <p>小計:</p>
                                <p>運費 :</p>
                                <p>優惠代碼折扣 :</p>
                                <p>合計 :</p>
                            </div>
                        </td>
                        <td>
                            <div className="d-flex flex-column text-end">
                                <p>NT${cart.cartTotal}</p>
                                <p>NT$90</p>
                                <p>NT$0</p>
                                <p>NT${cart.finalTotal}</p>
                            </div>
                        </td>
                    </tr>
                </tbody>
                : <></>}
            </Table>
        </>
    )
}

export default CartTable

