import React, {useEffect, useRef, useState, createContext} from 'react';
import '../css/App.css';
function App() {
    const [message, setMessage] = useState('0');
    const bloom_filter_api = useRef(null);
    useEffect(() => {
        async function callAsync() {
            await window.cheerpjInit();
            const lib = await window.cheerpjRunLibrary("/app/BloomFilter.jar");
            const Creation = await lib.io.Adrestus.bloom_filter.Creation;
            const creation = await new Creation();
            const d=await creation.create("asdsadas");
            setMessage(d)
        }
        callAsync();
    }, []);

    const onClick = (event) => {
        async function  BloomFilterAsync() {
            const Creation = await bloom_filter_api.current.io.Adrestus.bloom_filter.Creation;
            const creation = await new Creation();
            const d=await creation.create("sadsad");
            setMessage(d)
        }
        BloomFilterAsync();
    }
    return (
        <div className="App">
            <header className="App-header">
                <p>Wait for the cheerpj value to load here {message} </p>
                {/*<button onClick={(event) => onClick(event)}>*/}
                {/*    Click me*/}
                {/*</button>*/}
            </header>
        </div>
    );
}

export default App;
