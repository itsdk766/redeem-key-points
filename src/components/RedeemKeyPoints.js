import React, { Fragment, useEffect, useState } from 'react'
import style from '../Assets/styles/redeem.css'
import fetch from '../data/Transaction'
import { TotalCalculatePoints } from '../common/TotalCalculatePoints'
import ShoppingDate from '../common/ShoppingDate'

const RedeemKeyPoints =() => {

    const [customers, setCustomers] = useState([]);
    const [customerRewards, setCustomerRewards] = useState([])
    const [customerTransactions, setCustomerTransactions] = useState([])
    const [customerDetails, setCustomerDetails] = useState([])

    const [currentUser, setCurrentUser] = useState("");
    const [savedCustomer, setSavedCustomer] = useState([]);

    
    useEffect(() => {
        setCustomers([...Object.keys(fetch)])
        setCustomerDetails([...Object.values(fetch)])
        setSavedCustomer({...fetch})
    }, [])
   
    console.log(customerDetails)
    console.log(savedCustomer)
    console.log(customers)


    const selectUser = (value, key) => {
        setCurrentUser((value));
        let customerData = savedCustomer[value];

        let monthData = {
            1: {
                amounts: [],
                rewards: 0,
            },
            2: {
                amounts: [],
                rewards: 0,
            },
            3: {
                amounts: [],
                rewards: 0,
            },

        };
       ShoppingDate(customerData, monthData)
        setCustomerRewards({...monthData});
        setCustomerTransactions([...customerData]);
    }

  

    return (
        <div>
        <div className={style.displayLayout}>
            <div className={style.display}>
                <div>
               Please select customer:  <select onChange={e => selectUser(e.target.value)} value={currentUser} style={{fontSize: '20px'}}>
                    :
                    <option value={""} disabled>Select Customer</option>
                    {customers.map((customer, index)=>{
                        return(
                            <option key={index} value={customer}>{customer}</option>
                        )
                    })}
                </select>
                </div>
                <hr />
                {Object.keys(customerRewards).length> 0 &&
                <Fragment>
                            <table style={{padding: '5px'}}>
                            <tbody>
                            <tr>
                                <th width={200}>Month</th>
                                <th>Reward Points</th>
                            </tr>
                                <tr>
                                    <td>
                                        First Month
                                    </td>
                                    <td>{customerRewards[1]["rewards"]}</td>
                                </tr>
                                <tr>
                                    <td>
                                        Second Month
                                    </td>
                                    <td>{customerRewards[2]["rewards"]}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Third Month
                                    </td>
                                    <td>{customerRewards[3]["rewards"]}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Total Reward</td>
                                    <td>{customerRewards[1]["rewards"] + customerRewards[2]["rewards"] + customerRewards[3]["rewards"]} </td>
                                </tr>
                                </tbody>
                                </table>
                    <hr />
                                <h4>Customer Purchases Details</h4>
                                {customerTransactions.length > 0 ?
      
                            <table>
                            <tbody>
                            <tr>
                            <th>Price</th>
                            <th width={200}>Date</th>
                            <th>Reward Points</th>
                        </tr>
                {
                customerTransactions.map((customer, i) => (
                        <tr key={i}>

                            <td>{customer["amount"]}</td>
                            <td>{customer["date"]}</td>
                            <td>{TotalCalculatePoints(customer.amount)}</td>
                        </tr>
                         ))
                        }
                        </tbody>
                    </table> : 
                    <div> 
                        <h2>Transaction unavailable</h2>
                        </div>}
          </Fragment>}
                    </div>
                </div>     
</div>

    )
}

export default RedeemKeyPoints