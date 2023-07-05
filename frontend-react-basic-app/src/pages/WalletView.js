import {useEffect, useState} from 'react';
import TransactionModel from '../model/TransactionModel'
import apiRequest from "../Services/apiRequest";
import ListItems from "../components/ListItems";
function WalletView() {
    const API_URL = 'http://localhost:8080/api/v1/transaction/';
    const [hash, setHash] = useState(null);
    const [fetchError, setFetchError] = useState(null);
    const [from, setFrom] = useState(new Array());
    const [to, setTo] = useState(new Array());
    useEffect(() => {
        const timerId = setInterval(() => {
            const fetchItems = async () => {
                try {
                    const response = await fetch(API_URL+"1");
                    if (!response.ok) throw Error('Did not receive expected data');
                    const listItems = await response.json();
                    //const arr = JSON.parse(listItems)
                    listItems.from.map(val=>console.log(JSON.stringify(val)));
                    setFrom(listItems.from)
                    setTo(listItems.to)
                    setFetchError(null);
                } catch (err) {
                    setFetchError(err.message);
                } finally {
                }
            }
            fetchItems()
        }, 4000);
    }, []);
    useEffect(() => {

        if(hash==null)
            return
        const fetchItems = async () => {
            let trx = new TransactionModel("RegularTransactionDao", hash, "STAKING", 0, 0, "", 0, "1", "2", 1.0, 2.0, 0,  0, "30179190089666276834887403079562508974417649980904472865724382004973443579854", "14029798542497621816798343676332730497595770105064178818079147459382128035034","73885651435926854515264701221164520142160681037984229233067136520784684869519","73885651435926854515264701221164520142160681037984229233067136520784684869519","73885651435926854515264701221164520142160681037984229233067136520784684869519")
            const postOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:3000',
                    'Access-Control-Allow-Credentials': 'true'
                },
                body: JSON.stringify(trx)
            }
            console.log(JSON.stringify(trx))
            const result = await apiRequest(API_URL, postOptions);
            if (result) setFetchError(result);
        }

        setTimeout(() => fetchItems(), 2000);
    }, [hash])
    const handleOnChange = (event) => {
        event.preventDefault();
        const {username, amount} = event.target.elements
        console.log(username.value)
        console.log(amount.value)
        setHash(username.value)
    }
    return (
        <div>
            <p>{hash}</p>
            <form onSubmit={event => handleOnChange(event)}>
                <input type="text" id="username" name="username"/>
                <input type="text" id="amount" name="amount"/>
                <button type="submit">Submit</button>
            </form>
            {fetchError && <p style={{ color: "red" }}>{`Error: ${fetchError}`}</p>}
            {from.length==0&&<p style={{ color: "red" }}>{`'Empty array'}`}</p>}
            {from.length!=0 &&
              <ul>
                  {from.map((item) =>
                      <ListItems value={item}/>
                  )}
              </ul>
            }
        </div>
    );

}

export default WalletView;