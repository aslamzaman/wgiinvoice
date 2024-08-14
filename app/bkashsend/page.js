"use client";
import React, { useState, useEffect } from "react";
import Add from "@/components/bill/Add";
import Edit from "@/components/bill/Edit";
import Delete from "@/components/bill/Delete";
import { localStorageGetItem } from "@/lib/utils";


const Bill = () => {
    const [bills, setBills] = useState([]);
    const [waitMsg, setWaitMsg] = useState("");
    const [msg, setMsg] = useState("");


    useEffect(() => {
        const load = () => {
            setWaitMsg('Please Wait...');
            try {
                const data = localStorageGetItem("bill");
                const result = data.sort((a, b) => parseInt(b.id) > parseInt(a.id) ? 1 : -1);
                setBills(result);
                setWaitMsg('');
            } catch (error) {
                console.log(error);
            }
        };
        load();
    }, [msg]);


    const messageHandler = (data) => {
        setMsg(data);
    }


    return (
        <>
            <div className="w-full mb-3 mt-8">
                <h1 className="w-full text-xl lg:text-3xl font-bold text-center text-blue-700">Bill</h1>
                <p className="w-full text-center text-blue-300">&nbsp;{waitMsg}&nbsp;</p>
                <p className="w-full text-sm text-center text-pink-600">&nbsp;{msg}&nbsp;</p>
            </div>


            <div className="w-full lg:w-3/4 mx-auto border-2 p-4 shadow-md rounded-md">
                <div className="overflow-auto">
                    <table className="w-full border border-gray-200">
                        <thead>
                            <tr className="w-full bg-gray-200">
                                    <th className="text-center border-b border-gray-200 px-4 py-2">Item</th>
                                    <th className="text-center border-b border-gray-200 px-4 py-2">Cartoon</th>
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
                                                <td className="text-center py-2 px-4">{bill.item}</td>
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
            </div>
        </>
    );
};

export default Bill;
  
