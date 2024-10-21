"use client";
import React, { useState, useEffect, useRef } from "react";
import Add from "@/components/invoice/Add";
import Delete from "@/components/invoice/Delete";

import jsPDF from "jspdf";

import { formatedDate, formatedDateDot, inwordEnglish, localStorageGetItem, numberWithComma } from "@/lib/utils";
import { BtnSubmit, TextDt, TextEn, TextNum, TextBnDisabled, DropdownEn, TextEnDisabled } from "@/components/Form";
import { addDataToFirebase, getDataFromFirebase } from "@/lib/firebaseFunction";
require("@/lib/fonts/Poppins-Bold-normal");
require("@/lib/fonts/Poppins-Regular-normal");




const Home = () => {
  // Firebase------------------
  const [dt, setDt] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [shipment, setShipment] = useState('');
  const [payment, setPayment] = useState('');
  const [deduct, setDeduct] = useState('');
  //---------
  const [customers, setCustomers] = useState([]);




  //-- Local --------------------------------
  const [localItems, setLocalItems] = useState([]);
  const [msg, setMsg] = useState("Data ready");
  const [waitMsg, setWaitMsg] = useState("");


  const [pointerEvent, setPointerEvent] = useState(true);




  useEffect(() => {
    const loadFirebase = async () => {
      setWaitMsg('Please Wait...');
      try {
        const responseCustomer = await getDataFromFirebase("customer");
        setCustomers(responseCustomer);
        //-----------

        const inv = Date.now() / 60000;
        setInvoiceNumber(Math.round(inv));
        setDt(formatedDate(new Date()));

      } catch (error) {
        console.log(error);
      }
    };
    loadFirebase();

    //-------------------------------
    const loadLocal = () => {
      setWaitMsg('Please Wait...');
      try {
        const data = localStorageGetItem("localitem");
        const result = data.sort((a, b) => parseInt(b.id) > parseInt(a.id) ? 1 : -1);
        setLocalItems(result);
        setWaitMsg('');
      } catch (error) {
        console.log(error);
      }
    };
    loadLocal();




  }, [msg]);


  const messageHandler = (data) => {
    setMsg(data);
  }

  const createObject = () => {
    const getLocalData = localStorageGetItem('localitem');
    return {
      dt: dt,
      customerId: customerId,
      invoiceNumber: invoiceNumber,
      items: getLocalData,
      shipment: shipment,
      payment: payment,
      deduct: deduct,
      createdAt: new Date().toISOString()
    }
  }



  const printHandler = () => {
    setWaitMsg('Please Wait...');


    setTimeout(() => {
        const invoice = createObject();
         console.log(invoice);

        const doc = new jsPDF({
            orientation: "p",
            unit: "mm",
            format: "a4",
            putOnlyUsedFonts: true,
            floatPrecision: 16
        });

const cusmerData = customers.find(customer=>customer.id=== customerId);

        doc.setFont("Poppins-Bold", "bold");
        doc.setFontSize(16);

        doc.text(`BILL/INVOICE`, 105, 55, null, null, "center");
        doc.setFont("Poppins-Regular", "normal");
        doc.setFontSize(10);

        doc.text(`Invoice No: ${invoice.invoiceNumber}`, 190, 65, null, null, "right");
        doc.text(`Shipment No: ${invoice.shipment}`, 190, 70, null, null, "right");
        doc.text(`Invoice Date: ${formatedDateDot(invoice.dt, true)}`, 190, 75, null, null, "right");

        doc.setFont("Poppins-Bold", "bold");
        doc.text(`${cusmerData.name}`, 20, 80, null, null, "left");
        doc.setFont("Poppins-Regular", "normal");
        doc.text(`${cusmerData.address}`, 20, 85, null, null, "left");
        doc.text(`${cusmerData.contact}`, 20, 90, null, null, "left");
        doc.setFontSize(7);
        doc.text(`Print Data: ${formatedDateDot(new Date(),true)}`, 190, 92, null, null, "right");
        doc.setFontSize(10);

        doc.line(20, 95, 190, 95);
        doc.line(20, 103, 190, 103);
        doc.setFont("Poppins-Bold", "bold");
        doc.text("Items", 23, 100, null, null, "left");
        doc.text("CRT", 87, 100, null, null, "center");
        doc.text("THN", 105, 100, null, null, "center");
        doc.text("MTR", 123, 100, null, null, "center");
        doc.text("WGT", 141, 100, null, null, "center");
        doc.text("Rate", 159, 100, null, null, "center");
        doc.text("Total", 187, 100, null, null, "right");
        doc.setFont("Poppins-Regular", "normal");
        let y = 108;
        let subTotal = 0;
        let items = invoice.items;

        for (let i = 0; i < items.length; i++) {
            const total = parseFloat(items[i].weight) * parseFloat(items[i].taka);
            subTotal = subTotal + total;


            doc.text(`${items[i].itemName}`, 23, y, null, null, "left");
            doc.text(`${items[i].bale}`, 87, y, null, null, "center");
            doc.text(`${items[i].than}`, 105, y, null, null, "center");
            doc.text(`${items[i].meter}`, 123, y, null, null, "center");
            doc.text(`${items[i].weight}`, 141, y, null, null, "center");
            doc.text(`${items[i].taka}`, 159, y, null, null, "center");
            doc.text(`${numberWithComma(total)}`, 187, y, null, null, "right");
            y = y + 5;
        }

        doc.line(20, y - 3.5, 190, y - 3.5); // Horizontal line
        // Subtotal 
        doc.text("Subtotal", 23, y, null, null, "left");
        doc.text(`${subTotal.toLocaleString("en-IN")}`, 187, y, null, null, "right");

        // Deduct
        doc.text("Deduct", 23, y + 5, null, null, "left");
        doc.text(`${parseInt(invoice.deduct).toLocaleString("en-IN")}`, 187, y + 5, null, null, "right");

        // Advance
        doc.text("Advance Payment", 23, y + 10, null, null, "left");
        doc.text(`${parseInt(invoice.payment).toLocaleString("en-IN")}`, 187, y + 10, null, null, "right");

        doc.line(20, y + 11.5, 190, y + 11.5); // Horizontal line

        // Amount to be pay
        doc.setFont("Poppins-Bold", "bold");
        doc.text("Amount to pay", 23, y + 15, null, null, "left");
        const gt = subTotal - (parseFloat(invoice.deduct) + parseFloat(invoice.payment));
        doc.text(`${gt.toLocaleString("en-IN")}`, 187, y + 15, null, null, "right");
        doc.line(20, y + 16.5, 190, y + 16.5); // Horizontal line


        doc.setFont("Poppins-Regular", "normal");
        if (gt > 0) {
            const tkString = parseInt(gt).toString();
            doc.text(`INWORD: ${inwordEnglish(tkString).toUpperCase()} ONLY.`, 20, y + 22, null, null, "left");
        }

        doc.setFontSize(8);
        doc.text("Thank you for your kind cooperation.", 20, y + 35, null, null, "left");

        doc.line(20, 95, 20, y + 16.5); // Vertical Line
        doc.line(190, 95, 190, y + 16.5); // Vertical Line


        doc.line(78, 95, 78, y - 3.5); // Vertical Line
        doc.line(96, 95, 96, y - 3.5); // Vertical Line
        doc.line(114, 95, 114, y - 3.5); // Vertical Line
        doc.line(132, 95, 132, y - 3.5); // Vertical Line
        doc.line(150, 95, 150, y - 3.5); // Vertical Line
        doc.line(168, 95, 168, y - 3.5); // Vertical Line

        doc.save(`WGI_Invoice_${invoice.invoiceNo}_Created_${formatedDate(invoice.dt)}.pdf`);
        setWaitMsg('');
    }, 0);

}






  const submitHandler = async (e) => {
    e.preventDefault();
    const getLocalData = localStorageGetItem('localitem');
    if (getLocalData.length < 1) {
      setWaitMsg("No data to create invoice!");
      return false;
    }

    try {
      setPointerEvent(false);
      const newObject = createObject();
      // const msgInvoice = await addDataToFirebase("invoice", newObject);
      // setMsg(msgInvoice);
      printHandler();
    } catch (error) {
      console.error("Error saving invoice data:", error);
    } finally {
      //localStorage.removeItem('localitem');
      setPointerEvent(true);
    }

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
                  <th className="text-center border-b border-gray-200 px-4 py-2">Bale</th>
                  <th className="text-center border-b border-gray-200 px-4 py-2">Itemname</th>
                  <th className="text-center border-b border-gray-200 px-4 py-2">Meter</th>
                  <th className="text-center border-b border-gray-200 px-4 py-2">Taka</th>
                  <th className="text-center border-b border-gray-200 px-4 py-2">Than</th>
                  <th className="text-center border-b border-gray-200 px-4 py-2">Weight</th>
                  <th className="w-[100px] font-normal">
                    <div className="w-full flex justify-end mt-1 pr-[3px] lg:pr-2 font-normal">
                      <Add message={messageHandler} />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  localItems.length ? localItems.map(item => {
                    return (
                      <tr className="border-b border-gray-200 hover:bg-gray-100" key={item.id}>
                        <td className="text-center py-2 px-4">{item.bale}</td>
                        <td className="text-center py-2 px-4">{item.itemName}</td>
                        <td className="text-center py-2 px-4">{item.meter}</td>
                        <td className="text-center py-2 px-4">{item.taka}</td>
                        <td className="text-center py-2 px-4">{item.than}</td>
                        <td className="text-center py-2 px-4">{item.weight}</td>
                        <td className="flex justify-end items-center mt-1">
                          <Delete message={messageHandler} id={item.id} data={item} />
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
                <TextEnDisabled Title="InvoiceNumber" Id="invoiceNumber" Change={e => setInvoiceNumber(e.target.value)} Value={invoiceNumber} Chr={50} />
                <DropdownEn Title="Customer" Id="customerId" Change={e => setCustomerId(e.target.value)} Value={customerId}>
                  {customers.length ? customers.map(customer => <option value={customer.id} key={customer.id}>{customer.name}</option>) : null}
                </DropdownEn>
                <TextDt Title="Date" Id="dt" Change={e => setDt(e.target.value)} Value={dt} />
                <TextEn Title="Shipment" Id="shipment" Change={e => setShipment(e.target.value)} Value={shipment} Chr={50} />
                <TextNum Title="Payment" Id="payment" Change={e => setPayment(e.target.value)} Value={payment} />
                <TextNum Title="Deduct" Id="deduct" Change={e => setDeduct(e.target.value)} Value={deduct} />

              </div>
              <div className={`w-full mt-4 flex justify-start ${pointerEvent ? 'pointer-events-auto' : 'pointer-events-none'}`}>
                <BtnSubmit Title="Create Button" Class="bg-blue-600 hover:bg-blue-800 text-white" />
              </div>
            </form>
          </div>
        </div>

      </div>

      <div id="footer" className="w-full h-[150px]"></div>
    </>
  );
};

export default Home;

