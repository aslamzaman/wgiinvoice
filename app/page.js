"use client";
import React, { useState, useEffect, useRef } from "react";
import Add from "@/components/bill/Add";
import Edit from "@/components/bill/Edit";
import Delete from "@/components/bill/Delete";
import { formatedDate, formatedDateDot, inwordEnglish, localStorageGetItem, numberWithComma } from "@/lib/utils";
import ReactToPrint from "react-to-print";
import { BtnSubmit, TextDt, TextEn, TextNum } from "@/components/Form";



const Home = () => {
  const [bills, setBills] = useState([]);
  const [waitMsg, setWaitMsg] = useState("");
  const [msg, setMsg] = useState("");

  const [shipment, setShipment] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [dt, setDt] = useState("");

  const [subtotal, setSubtotal] = useState("");
  const [deduct, setDeduct] = useState("");
  const [advance, setAdvance] = useState("");
  const [total, setTotal] = useState("");

  const [isPrintButton, setIsPrintButton] = useState(false);


  const pageRef = useRef(null);

  useEffect(() => {
    const load = () => {
      setWaitMsg('Please Wait...');
      try {
        const data = localStorageGetItem("bill");
        const result = data.sort((a, b) => parseInt(b.id) > parseInt(a.id) ? 1 : -1);
        setBills(result);
        setWaitMsg('');
        // weight, rate
        const subtotalTk = result.reduce((t, c) => t + (parseFloat(c.weight) * parseFloat(c.rate)), 0);
        setSubtotal(subtotalTk);

      } catch (error) {
        console.log(error);
      }
    };
    load();
    setDt(formatedDate(new Date()));
  }, [msg]);


  const messageHandler = (data) => {
    setMsg(data);
  }

  const nameChangeHandler = (e) => {
    setName(e.target.value);
    setIsPrintButton(false);
  }

  const addressChangeHandler = (e) => {
    setAddress(e.target.value);
    setIsPrintButton(false);
  }

  const phoneChangeHandler = (e) => {
    setPhone(e.target.value);
    setIsPrintButton(false);
  }

  const dateChangeHandler = (e) => {
    setDt(e.target.value);
    setIsPrintButton(false);
  }


  const deductChangeHandler = (e) => {
    setDeduct(e.target.value);
    setIsPrintButton(false);
  }


  const advanceChangeHandler = (e) => {
    setAdvance(e.target.value);
    setIsPrintButton(false);
  }


  const shipmentChangeHandler = (e) => {
    setShipment(e.target.value);
    setIsPrintButton(false);
  }


  const submitHandler = (e) => {
    e.preventDefault();
    const totalTaka = parseFloat(subtotal) - parseFloat(deduct) - parseFloat(advance);
    setTotal(totalTaka);
    setIsPrintButton(true);
  }


  return (
    <>
      <div className="w-full mb-3 mt-8">
        <h1 className="w-full text-xl lg:text-3xl font-bold text-center text-blue-700 uppercase">Bill/invoice</h1>
        <p className="w-full text-center text-blue-300">&nbsp;{waitMsg}&nbsp;</p>
        <p className="w-full text-sm text-center text-pink-600">&nbsp;{msg}&nbsp;</p>
      </div>
 

      <div className="w-full md:w-3/4 mx-auto border-2 p-4 shadow-md rounded-md">
        <div className="w-full">
          <div className="overflow-auto">
            <table className="w-full border border-gray-200">
              <thead>
                <tr className="w-full bg-gray-200">
                  <th className="text-start border-b border-gray-200 px-4 py-2 indent-2">Item</th>
                  <th className="text-center border-b border-gray-200 px-4 py-2">Crt</th>
                  <th className="text-center border-b border-gray-200 px-4 py-2">Than</th>
                  <th className="text-center border-b border-gray-200 px-4 py-2">Meter</th>
                  <th className="text-center border-b border-gray-200 px-4 py-2">Weight</th>
                  <th className="text-center border-b border-gray-200 px-4 py-2">Rate</th>
                  <th className="w-[100px] font-normal">
                    <div className="w-full flex justify-end mt-1 pr-[3px] lg:pr-2">
                      <Add message={messageHandler} />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  bills.length ? bills.map(bill => {
                    return (
                      <tr className="border-b border-gray-200 hover:bg-gray-100" key={bill.id}>
                        <td className="text-start py-2 px-4 indent-2">{bill.item}</td>
                        <td className="text-center py-2 px-4">{bill.cartoon}</td>
                        <td className="text-center py-2 px-4">{bill.than}</td>
                        <td className="text-center py-2 px-4">{bill.meter}</td>
                        <td className="text-center py-2 px-4">{bill.weight}</td>
                        <td className="text-center py-2 px-4">{bill.rate}</td>
                        <td className="flex justify-end items-center mt-1">
                          <Edit message={messageHandler} id={bill.id} data={bills} />
                          <Delete message={messageHandler} id={bill.id} data={bills} />
                        </td>
                      </tr>
                    )
                  })
                    : null
                }
              </tbody>
            </table>
          </div>

          <div className="w-full h-4 mt-10 bg-gray-300"></div>

          <div className="p-4 mt-10 overflow-auto">
            <form onSubmit={submitHandler}>
              <div className="grid grid-cols-2 gap-2 my-1">
                <TextEn Title="Company Name:" Id="name" Change={nameChangeHandler} Value={name} Chr={150} />
                <TextEn Title="Company Address:" Id="address" Change={addressChangeHandler} Value={address} Chr={150} />
                <TextEn Title="Company Phone No:" Id="phone" Change={phoneChangeHandler} Value={phone} Chr={150} />
                <TextDt Title="Invoice Date:" Id="dt" Change={dateChangeHandler} Value={dt} />
                <div className="col-span-2">
                  <div className="grid grid-cols-3 gap-2">
                    <TextNum Title="Deduct" Id="deduct" Change={deductChangeHandler} Value={deduct} />
                    <TextNum Title="Advance" Id="advance" Change={advanceChangeHandler} Value={advance} />
                    <TextEn Title="Shipment" Id="shipment" Change={shipmentChangeHandler} Value={shipment} Chr={150} />
                  </div>
                </div>
              </div>
              <div>
                <BtnSubmit Title="Create Button" Class="bg-blue-600 hover:bg-blue-800 text-white" />
                {isPrintButton ?
                  <ReactToPrint trigger={() => <button className="text-center mt-3 mx-0.5 px-4 py-2 font-semibold rounded-md focus:ring-1 ring-blue-200 ring-offset-2 duration-300 bg-green-600 hover:bg-green-800 text-white cursor-pointer">Print Invoice</button>} documentTitle={`${new Date().toISOString()}-wgi-invoice`} content={() => pageRef.current} pageStyle={`@media print{@page{size:A4 portrait; margin:2in 0.75in 0.5in 0.75in;}}`}  />
                  : null}
              </div>             
            </form>
          </div>
        </div>

        <div className="overflow-auto hidden">
          <div ref={pageRef} className="w-full">
            <p className="text-2xl font-bold uppercase text-center">Bill/invoice</p>

            <p className="mt-6 text-end">Shipment: {shipment}<br />Invoice Date: {formatedDateDot(dt)} </p>

            <p className="text-start">Company Name: <span className="font-bold uppercase">{name}</span><br />Company Address: {address}<br />Mobile/Phone: {phone}</p>


            <div className="text-end">
              <span className="text-xs">Print Date: {formatedDateDot(new Date())}</span>
            </div>
            <table className="w-full border border-gray-400">
              <thead>
                <tr>
                  <th className="border border-gray-400 uppercase text-start indent-2"> ITEM</th>
                  <th className="border border-gray-400 uppercase"> CRT</th>
                  <th className="border border-gray-400 uppercase"> THN</th>
                  <th className="border border-gray-400 uppercase"> MTR</th>
                  <th className="border border-gray-400 uppercase"> WGT</th>
                  <th className="border border-gray-400 uppercase"> RATE</th>
                  <th className="border border-gray-400 uppercase text-end"> <span className="mr-4">TOTAL</span></th>
                </tr>
              </thead>
              <tbody>
                {bills.length ? bills.map(bill => (
                  // id, item, cartoon, than, meter, weight, rate
                  <tr key={bill.id}>
                    <td className="border border-gray-400 text-start indent-2">{bill.item}</td>
                    <td className="border border-gray-400 text-center">{bill.cartoon}</td>
                    <td className="border border-gray-400 text-center">{bill.than}</td>
                    <td className="border border-gray-400 text-center">{bill.meter}</td>
                    <td className="border border-gray-400 text-center">{bill.weight}</td>
                    <td className="border border-gray-400 text-center">{bill.rate}</td>
                    <td className="border border-gray-400 text-end"><span className="mr-4">{numberWithComma(bill.weight * bill.rate)}</span></td>
                  </tr>
                )) : null}
                <tr>
                  <td colSpan="6" className="border border-gray-400 text-start indent-2">Subtotal</td>
                  <td className="border border-gray-400 text-end"><span className="mr-4">{numberWithComma(subtotal)}</span></td>
                </tr>
                <tr>
                  <td colSpan="6" className="border border-gray-400 text-start indent-2">Deduct</td>
                  <td className="border border-gray-400 text-end"><span className="mr-4">{numberWithComma(deduct)}</span></td>
                </tr>
                <tr>
                  <td colSpan="6" className="border border-gray-400 text-start indent-2">Advance Payment</td>
                  <td className="border border-gray-400 text-end"><span className="mr-4">{numberWithComma(advance)}</span></td>
                </tr>

                <tr>
                  <td colSpan="6" className="font-bold border border-gray-400 text-start indent-2">Amount to pay</td>
                  <td className="font-bold border border-gray-400 text-end"><span className="mr-4">{numberWithComma(total)}</span></td>
                </tr>
              </tbody>
            </table>
            <div><span className="uppercase">Inword: {inwordEnglish(total)} only</span></div>
            <p className="mt-16 text-xs">Thank you for kind cooperation.</p>
          </div>
        </div>
      </div>

      <div id="footer" className="w-full h-[150px]"></div>
    </>
  );
};

export default Home;

