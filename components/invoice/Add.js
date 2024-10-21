import React, { useState } from "react";
import { BtnSubmit, TextEn } from "@/components/Form";
import { localStorageAddItem } from "@/lib/utils";

const Add = ({ message }) => {
    const [bale, setBale] = useState('');
    const [itemName, setItemName] = useState('');
    const [meter, setMeter] = useState('');
    const [taka, setTaka] = useState('');
    const [than, setThan] = useState('');
    const [weight, setWeight] = useState('');   
    const [show, setShow] = useState(false);


    const resetVariables = () => {
        setBale('');
        setItemName('');
        setMeter('');
        setTaka('');
        setThan('');
        setWeight('');        
    }


    const showAddForm = () => {
        setShow(true);
        resetVariables();
    }


    const closeAddForm = () => {
        setShow(false);
    }


    const createObject = () => {
        return {
            id: Date.now(),
            bale: bale,
            itemName: itemName,
            meter: meter,
            taka: taka,
            than: than,
            weight: weight            
        }
    }


    const saveHandler = (e) => {
        e.preventDefault();
        try {
            const newObject = createObject();
            const msg = localStorageAddItem('localitem', newObject);
            message(msg);
        } catch (error) {
            console.error("Error saving localitem data:", error);
            message("Error saving localitem data.");
        } finally {
            setShow(false);
        }
    }


    return (
        <>
            {show && (
                <div className="fixed inset-0 py-16 bg-black bg-opacity-30 backdrop-blur-sm z-10 overflow-auto">
                    <div className="w-11/12 md:w-1/2 mx-auto mb-10 bg-white border-2 border-gray-300 rounded-md shadow-md duration-300">
                        <div className="px-6 md:px-6 py-2 flex justify-between items-center border-b border-gray-300">
                            <h1 className="text-xl font-bold text-blue-600">Add New Data</h1>
                            <button onClick={closeAddForm} className="w-8 h-8 p-0.5 bg-gray-50 hover:bg-gray-300 rounded-md transition duration-500">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-full h-full stroke-black">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="px-6 pb-6 text-black">
                            <form onSubmit={saveHandler}>
                                <div className="grid grid-cols-1 gap-4 my-4">
                                    <TextEn Title="Bale" Id="bale" Change={e => setBale(e.target.value)} Value={bale} Chr={150} />
                                    <TextEn Title="ItemName" Id="itemName" Change={e => setItemName(e.target.value)} Value={itemName} Chr={150} />
                                    <TextEn Title="Meter" Id="meter" Change={e => setMeter(e.target.value)} Value={meter} Chr={150} />
                                    <TextEn Title="Taka" Id="taka" Change={e => setTaka(e.target.value)} Value={taka} Chr={150} />
                                    <TextEn Title="Than" Id="than" Change={e => setThan(e.target.value)} Value={than} Chr={150} />
                                    <TextEn Title="Weight" Id="weight" Change={e => setWeight(e.target.value)} Value={weight} Chr={150} />                                
                                </div>
                                <div className="w-full flex justify-start">
                                    <input type="button" onClick={closeAddForm} value="Close" className="bg-pink-600 hover:bg-pink-800 text-white text-center mt-3 mx-0.5 px-4 py-2 font-semibold rounded-md focus:ring-1 ring-blue-200 ring-offset-2 duration-300 cursor-pointer" />
                                    <BtnSubmit Title="Save" Class="bg-blue-600 hover:bg-blue-800 text-white" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
            <button onClick={showAddForm} className="px-1 py-1 bg-blue-500 hover:bg-blue-700 rounded-md transition duration-500" title="Add New">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="w-7 h-7 stroke-white hover:stroke-gray-100">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </button>
        </>
    )
}
export default Add;
  
