import React from 'react'

export const Duplicatefile = (props) => {
    const { tableRow } = props
    const pincode = 560013;
    return (
        <div>
            {tableRow.map((rowItr) => {
                const [orderId, customerId, deliveryPincode, orderDate, items] = rowItr.split(',')
                return (
                    <>
                        {(deliveryPincode === pincode) ? <tr key={orderId}>
                            <td>{orderId}</td>
                            <td>{customerId}</td>
                            <td>{deliveryPincode}</td>
                            <td>{orderDate}</td>
                            <td>{items}</td>

                        </tr> : null
                        }
                    </>


                )
            })}
        </div>
    )
}
