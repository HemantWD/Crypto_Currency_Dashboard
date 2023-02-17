import React, { useContext, useRef } from 'react'
import { CryptoContext } from '../Context/Context'
import SearchInput from './SearchInput'
import debounce from 'lodash.debounce'



export default function SearchBar() {
    const { getSearchResult, setCurrency, currency } = useContext(CryptoContext);
    const currencyRef = useRef();
    const handleCurrency = (x) => {
        x.preventDefault();
        let val = currencyRef.current.value;
        setCurrency(val);
        currencyRef.current.value = ""
    }
    const debounceFunc = debounce(function (val) {
        getSearchResult(val);
    }, 2000)
    return (
        <>
            <div className="flex">
                <span className="flex rounded-lg" >
                    <select className='border outline-none font-body text-[20px] text-bold cursor-pointer backdrop-blur-md bg-opacity-10 rounded-lg w-[90px] text-center sm:w-[90px] z-1 pr-3 pl-2 shadow-lg' value={currency} onChange={handleCurrency} ref={currencyRef} >
                        <option value={"usd"} className="text-black-600">USD</option>
                        <option value={"inr"} className="text-black-600">INR</option>
                        <option value={"eur"} className="text-black-600">EUR</option>
                        <option value={"jpy"} className="text-black-600">JPY</option>
                        <option value={"gbp"} className="text-black-600">GBP</option>
                        <option value={"aud"} className="text-black-600">AUD</option>
                        <option value={"cad"} className="text-black-600">CAD</option>
                    </select>
                </span>
                <div className="relative w-full">
                    <SearchInput handleSearch={debounceFunc} />
                </div>
            </div>
        </>
    )
}
