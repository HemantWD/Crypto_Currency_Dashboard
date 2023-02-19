import React, { useContext } from 'react'
import { useState } from "react"
import { CryptoContext } from '../Context/Context';
import "../App.css"

export default function SearchInput({ handleSearch }) {
    const [searchText, setSearchText] = useState("");
    const { searchData, setCoinSearch, setSearchData } = useContext(CryptoContext);

    let handleInput = (x) => {
        x.preventDefault()
        // let query = x.target.value;
        setSearchText(x.target.value);
        handleSearch(x.target.value);
    };

    const selectCoin = (coin) => {
        //our api to fetch the search result;
        // console.log("coin",coin)
        setCoinSearch(coin);
        setSearchText("");
        setSearchData();
    }


    return (
        <>
            <form className="flex pl-2 w-full">
                <div className="flex flex-grow rounded-sm ">
                    <div className="flex flex-grow items-center">
                        <span className='absolute text-[13px] lg:text-[13px] sm:text-[12px] md:text-[14px] ml-7 z-10'>
                            <svg xmlns="http://www.w3.org/2000/svg"
                                width="25" height="25"
                                // style={{ marginLeft: "3px"}}
                                viewBox="0 0 50  50">
                                <path d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z"></path>
                            </svg>
                        </span>
                        <input value={searchText} onChange={handleInput} required type="search" name='searchText' id='searchTextDesktop' className='flex border shadow-lg focus:ring-1 text-lg w-full pl-14 py-3 pr-2 p rounded-lg overflow-hidden focus-within:shadow-none outline-none sm:items-center' placeholder='Seacrh by coin ' />
                    </div>
                </div>
            </form>
            {searchText.length > 0 ? (
                <ul  className='absolute top-14 -right-2 w-full h-96 mr-2 bg-white rounded overflow-x-hidden py-2 overflow-scroll scrollbar-thin backdrop-blur-md z-10'>
                    {searchData ? (
                        searchData.map((coin) => {
                            return (
                                <li className='flex items-center ml-4 my-2 cursor-pointer' key={coin.id} onClick={() => selectCoin(coin.id)}>
                                    <img src={coin.thumb} alt="coin" className='w-[2rem] h-[2rem] mx-1.5 alt="m"' />
                                    <span className='text-xl' >{coin.id}</span>
                                </li>
                            );
                        })
                    ) : (
                        <div className="w-full h-full mt-8 flex justify-center items-center">
                            <div className="w-8 h-8 flex border-4 rounded-full animate-spin" role="status" />
                            <span className="ml-2 font-semibold">Digging....</span>
                        </div>
                    )}
                 
                </ul>
            ) : null } 
        </>
    )
}
