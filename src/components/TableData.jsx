import React, { useState } from 'react'
import { Table } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import Papa from 'papaparse'

export default function TableData() {
    const [csvData, setCsvData] = useState("")
    // const [formatData, setFormatData] = useState("")
    const [tableRow, setTableRow] = useState([]);
    const [tableHead, setTableHead] = useState([]);
    const [tempTableRow, setTempTableRow] = useState([]);
    const [searchPincode, setSearchPincode] = useState("");
    const [searchDate, setSearchDate] = useState("");
    const [searchItems, setSearchItems] = useState("");

    const submit = () => {
        if (searchDate === "" && searchPincode === "") {
            alert("Fields cannot be empty!!!")
            return;
        }
        else if (searchDate !== "" && searchPincode !== "") {
            let filteredDateNPincode = tableRow.filter((row) => {
                return (searchPincode === row[2] && searchDate === row[3])
            }
            )
            console.log(filteredDateNPincode);
            setTempTableRow(filteredDateNPincode);
        }
        else if (searchPincode !== "") {
            let filteredPincodesList = tableRow.filter((row) => {
                return searchPincode === row[2]
            })
            setTempTableRow(filteredPincodesList);
        }
        else if (searchDate !== "") {
            console.log(searchDate);
            let filteredDateList = tableRow.filter((row) => {
                return searchDate === row[3]
            })
            setTempTableRow(filteredDateList);

            console.log(filteredDateList);
        }
    }

    function handleInputPincodeOnchange(e) {
        // console.log(e);
        e.preventDefault();
        setSearchPincode(e.target.value);
        // console.log(searchPincode);
    }

    function handleInputOnDatechange(e) {
        e.preventDefault();
        setSearchDate(e.target.value);
        console.log(searchDate);

    }

    function handleOnchangeSearchItems(e) {
        e.preventDefault();
        setSearchItems(e.target.value)
        let filteredsearchItems = "";
        // console.log(searchItems);
        filteredsearchItems = tableRow.includes(searchItems)
        // if (tableRow.includes(searchItems)) {
        //     filteredsearchItems = tableRow[searchItems];
        // }
        console.log(filteredsearchItems);
        // setTempTableRow(filteredsearchItems);
    }
    return (
        <>
            <div className="container mt-3 border border-2 border-warning p-3">
                <div className="d-flex justify-content-center m-2 p-3 border border-warning">
                    {/* <input type="file" accept=".csv" id="fileupload" onChange={(e) => { setCsvData(e.target.files[0]) }} /> */}

                    <div className="d-flex justify-content-between mx-5">
                        <input type="file" accept=".csv,.xlsx,.xls" onChange={(e) => {
                            e.preventDefault();
                            const files = e.target.files;
                            // console.log(files);
                            if (files) {
                                // console.log(files[0]);
                                setCsvData(files[0]);
                                Papa.parse(files[0], {
                                    complete: function (results) {
                                        // console.log("Finished:", results.data);
                                        setTableRow(results.data.slice(1));
                                        setTempTableRow(results.data.slice(1));
                                        setTableHead(results.data.slice(0, 1));
                                    }
                                }
                                )
                            }
                        }
                        }
                        />
                    </div>
                    <div>
                    </div>

                </div>
                <div className="d-flex justify-content-around m-1 p-1 align-items-center">
                    <div>
                        <label htmlFor="searchPincode" className="mx-5">Pincode</label>
                        <input type="text" name="searchPincode" onChange={handleInputPincodeOnchange} value={searchPincode}
                            maxLength={6} />
                    </div>
                    <div>
                        <label htmlFor="searchDate" className="mx-5">Date</label>
                        <input list="avldates" name="searchDate" onChange={handleInputOnDatechange} value={searchDate}
                        />

                        <div>
                            {/* {tempTableRow.map((availDates) => {
                                const temp = availDates[3];
                                return (
                                    <div>
                                        <input list="browsers" name="browser" />
                                        <datalist id="browsers">
                                            <option value="Internet Explorer" />
                                            <option value="Firefox" />
                                            <option value="Chrome" />
                                            <option value="Opera" />
                                            <option value="Safari" />
                                        </datalist>
                                    </div>
                                )
                            })} */}
                        </div>
                    </div>

                    <div >
                        <button className="btn btn-warning mx-auto btn-sm" onClick={(e) => {
                            e.preventDefault()
                            if (csvData) { submit() }
                        }}>Submit</button>
                    </div>

                    <div>
                        <label htmlFor="searchItems">Items : </label>
                        <input type="text" placeholder="search by item name " value={searchItems} onChange={handleOnchangeSearchItems} />
                    </div>
                </div>
                <hr className="bg-danger py-1" />
                <Table striped bordered hover>
                    <thead>
                        {tableHead.map((itr) => {
                            const [one, two, three, four, five] = itr
                            return (
                                <tr>
                                    <th>{one}</th>
                                    <th>{two}</th>
                                    <th>{three}</th>
                                    <th>{four}</th>
                                    <th>{five}</th>
                                </tr>
                            )
                        })}

                    </thead>
                    <tbody>
                        {
                            tempTableRow.map((rowItr) => {
                                const [orderId, customerId, deliveryPincode, orderDate, items] = rowItr
                                return (
                                    <tr key={orderId}>
                                        <td>{orderId}</td>
                                        <td>{customerId}</td>
                                        <td>{deliveryPincode}</td>
                                        <td>{orderDate}</td>
                                        <td>{items}</td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </Table>

            </div>


        </>
    )
}
