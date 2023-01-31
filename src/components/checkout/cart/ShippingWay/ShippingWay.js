import React, { useContext, useEffect } from "react";
import { Button } from 'antd';
import { Link } from 'react-router-dom'

import { useCart } from '../../../../utils/useCart'

// import CouponSelect from './CouponSelect'
// import {SelectValue} from './CouponSelect'
import { Select } from 'antd';
import { getElementError } from "@testing-library/react";


// 優惠折扣
// const handleCoupon = (value) => {
//     console.log(`CouponSelect ${value}`);
// };

// const CouponSelect = () => (
//     <>
//         <Select
//             placeholder="Search to Select"
//             style={{
//                 width: 430,
//             }}
//             onChange={handleChange}
//             options={[
//                 {
//                     value: '50',
//                     label: '折50',
//                 },
//                 {
//                     value: '100',
//                     label: '折100',
//                 },
//                 {
//                     value: '150',
//                     label: '折150',
//                 },
//             ]}
//         />

//     </>
// );

// step變色

// 優惠折扣

const handlePay = (e) => {
    console.log(`handlePay ${e.target.value}`);
};
const handleCountry = (e) => {
    console.log(`handleCountry ${e.target.value}`);
};
const handleShip = (e) => {
    console.log(`handleShip ${e.target.value}`);
};
const handleCoupon = (value) => {
    console.log(`CouponSelect ${value}`);
    // const { cart } = useCart();
    // const finalTotal = cart.cartTotal + 90 - {value} ;
};

function ShippingWay() {
    const { cart } = useCart();

    return (
        <>
            <React.Fragment>
                <div className="shipping-way mb-5">
                    <div className="left-bottom ">
                        <div className="title fw-bolder h5 mb-0">
                            選擇送貨及付款方式
                        </div>
                        <div className="content-info p-3">
                            <p>送貨地點</p>
                            <select className="w-100 mb-3" onChange={handleCountry}>
                                <option value="AU" >澳大利亞</option>
                                <option value="BE" >比利時</option>
                                <option value="KH" >柬埔寨</option>
                                <option value="CA" >加拿大</option>
                                <option value="CN" >中國</option>
                                <option value="CZ" >捷克共和國</option>
                                <option value="DK" >丹麥</option>
                                <option value="FR" >法國</option>
                                <option value="DE" >德國</option>
                                <option value="GU" >關島</option>
                                <option value="HK" >香港</option>
                                <option value="ID" >印度尼西亞</option>
                                <option value="IE" >愛爾蘭</option>
                                <option value="IT" >意大利</option>
                                <option value="JP" >日本</option>
                                <option value="KR" >韓國</option>
                                <option value="MO" >澳門</option>
                                <option value="MY" >馬來西亞</option>
                                <option value="MN" >蒙古</option>
                                <option value="NL" >荷蘭</option>
                                <option value="NZ" >新西蘭</option>
                                <option value="NO" >挪威</option>
                                <option value="PH" >菲律賓</option>
                                <option value="PL" >波蘭</option>
                                <option value="SG" >新加坡</option>
                                <option value="SE" >瑞典</option>
                                <option value="CH" >瑞士</option>
                                <option value="TW" selected>台灣</option>
                                <option value="TH" >泰國</option>
                                <option value="AE" >阿拉伯聯合酋長國</option>
                                <option value="GB" >英國</option>
                                <option value="US" >美國</option>
                                <option value="VN" >越南</option>
                            </select>
                            <p>送貨方式</p>
                            <select className="w-100 mb-3" onChange={handleShip}>
                                <option value="711" selected ng-non-bindable>7-11取貨不付款</option>
                                <option value="outlying-islands" ng-non-bindable>離島郵寄(須先付款，澎湖/金門/馬祖/蘭嶼/綠島/琉球各離島地區)</option>
                                <option value="home-delivery" ng-non-bindable>本島宅配到府(須先付款)</option>
                            </select>
                            <p>付款方式</p>
                            <select className="w-100 mb-3" onChange={handlePay}>
                                <option value="line-pay" ng-non-bindable>LINE Pay</option>
                                <option value="atm" ng-non-bindable>銀行轉帳／ATM</option>
                                <option value="OPay" selected ng-non-bindable>歐付寶</option>
                                <option value="EcPay" ng-non-bindable>信用卡/綠界</option>
                            </select>
                        </div>
                    </div>
                    <div className="right-bottom ">
                        <div className="title fw-bolder h5 mb-0">
                            訂單資訊
                        </div>
                        <div className="content-info p-3">
                            <div class="subtotal mb-2">
                                <tr>
                                    <td className="w-100">
                                        <div class="d-flex flex-column text-start">
                                            <p>小計:</p><p>運費 :</p>
                                        </div>
                                    </td>
                                    <td><div class="d-flex flex-column text-end">
                                        <p> NT${cart.cartTotal}</p><p>NT$90</p>
                                    </div></td>
                                </tr>
                            </div>
                            <div class="cart-coupon mb-0">
                                <p>優惠券折扣：</p>
                                <Select
                                    defaultValue="0"
                                    placeholder="Search to Select"
                                    style={{
                                        width: 430,
                                    }}
                                    onChange={handleCoupon}
                                    options={[
                                        {
                                            value: '100',
                                            label: '滿1000折100',
                                        },
                                        {
                                            value: '150',
                                            label: '滿2000折200',
                                        },
                                    ]}
                                />


                            </div>
                            <hr />
                            <div class="total mb-2">
                                <tr>
                                    <td className="w-100">
                                        <div class="d-flex flex-column text-start">
                                            <p>合計：</p>
                                        </div>
                                    </td>
                                    <td><div class="d-flex flex-column text-end">
                                        <p>NT${cart.finalTotal}</p>
                                    </div>
                                    </td>
                                </tr>
                            </div>
                            <Link to="/cart2" >
                                <Button type="primary" className="checkout-button">前往結帳</Button>
                            </Link>

                        </div>
                    </div>
                </div>

            </React.Fragment>
        </>
    )
}

export default ShippingWay;
