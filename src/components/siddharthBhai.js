import React, { useState } from 'react'
import { Table } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Duplicatefile } from './Duplicatefile';

export default function SiddharthBhai() {
    const [csvData, setCsvData] = useState("")
    const [formatData, setFormatData] = useState("")
    const [tableHead, setTableHead] = useState([]);
    const [tableRow, setTableRow] = useState([]);

    // const [tableRow, setTableRow] = useState({
    //     orderId: "",
    //     customerId: "",
    //     deliveryPincode: "",
    //     orderDate: "",
    //     items: ""

    // });
    const [pincodeBasedTableRow, setPincodeBasedTableRow] = useState([]);

    const [pincode, setPincode] = useState("");
    // const [date, setDate] = useState([]);
    // const [dateAndPincode, setDateAndPincode] = useState({
    // })


    const submit = () => {
        const file = csvData
        const reader = new FileReader()

        reader.onload = function (e) {
            const text = e.target.result;
            setFormatData(text)
            // const headers = text.slice(0, text.indexOf('\n')).split(',');
            // const rows = text.slice(text.indexOf('\n') + 1).split('\n');
            // console.log(headers, rows)
            // console.log(rows[0].split(','));
            setTableHead(text.slice(0, text.indexOf('\n')).split(','));
            setTableRow(text.slice(text.indexOf('\n') + 1).split('\n'))
        }
        reader.readAsText(file)
    }
    // console.log(csvData)
    // console.log(formatData.split(','))

    function handleInputPincodeOnchange(e) {
        // console.log(e);
        setPincode(e.target.value);

        console.log(pincode)
        if (e.target.value.length === 6) {
            // console.log(e.target.value);
            let newData = tableRow.filter(row => {
                const [orderId, customerId, deliveryPincode, orderDate, items] = row.split(',')
                // setTableRow(orderId, customerId, deliveryPincode, orderDate, items);
                console.log(deliveryPincode);
                return pincode === deliveryPincode
            })
            // console.log(newData);

            //     // row.deliveryPincode === e.target.value
            // )
            // const newData = tableRow.filter(row => console.log(row))

            // tableRow.map((rowItr) => {
            //     const [orderId, customerId, deliveryPincode, orderDate, items] = rowItr.split(',')
            // })

            // console.log(newData)
            // setTableRow(newData)
        }

    }
    return (
        <>
            <div>
                <input type="file" accept=".csv" id="fileupload" onChange={(e) => { setCsvData(e.target.files[0]) }} />
                <button onClick={(e) => {
                    e.preventDefault()
                    if (csvData) { submit() }
                }}>Submit</button>

                <div>
                    <label htmlFor="pincode">Pincode</label>
                    <input type="text" name="pincode" onChange={handleInputPincodeOnchange} value={pincode}
                        maxLength={6}
                    />
                    <label htmlFor="date">Date</label>
                    {/* <input type="date" name="date" onChange={handleInputOnchange} value={date} /> */}
                </div>
                {/* {console.log(tableRow)} */}
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            {
                                tableHead.map((itr) => (
                                    <th>{itr}</th>
                                ))
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tableRow.map((rowItr) => {
                                const [orderId, customerId, deliveryPincode, orderDate, items] = rowItr.split(',')
                                return (
                                    <tr key={orderId}>
                                        <td>{orderId}</td>
                                        <td>{customerId}</td>
                                        <td>{deliveryPincode}</td>
                                        <td>{orderDate}</td>
                                        <td>{items}</td>
                                    </tr>
                                )
                            })}

                        {/* tableRow.map((rowItr) => {
                                     const [orderId, customerId, deliveryPincode, orderDate, items] = rowItr.split(',') 
                                    return (
                                        <tr key={orderId}>
                                            <td>{orderId}</td>
                                            <td>{customerId}</td>
                                            <td>{deliveryPincode}</td>
                                            <td>{orderDate}</td>
                                            <td>{items}</td>

                                        </tr>
                                    )
                                }) */}

                    </tbody>
                </Table>
            </div>
        </>
    )
}
