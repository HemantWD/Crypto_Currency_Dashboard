// This component contains about the change in the price of crypto curriencies in last 24 hrs

import React, { useContext } from "react";
import { CryptoContext } from "../Context/Context";
import { BiReset } from "react-icons/bi";

function Sidebar() {
  const { cryptoData, currency, resetFunction } = useContext(CryptoContext);
  return (
    <div
      className=" bg-white scroll-smooth backdrop-blur-md border rounded-lg shadow-lg scrollspy"
      data-bs-spy="scroll"
      data-bs-target="#scrollspy1"
      data-bs-offset="200"
    >
      <div>
        <p className="text-black text-bold text-[15px] text-center mt-4 font-bold">
          Cryptocurrency by market cap
        </p>
      </div>
      <div className="flex relative justify-end mt-3">
        <button
          className="w-[1.6rem] flex absolute hover:scale-110 transition all transition-ease"
          onClick={resetFunction}
        >
          <BiReset />
        </button>
      </div>
      <div>
        {cryptoData ? (
          <div className="w-full table-auto ">
            <div>
              {cryptoData.map((cryptoData) => {
                return (
                  <div
                    key={cryptoData.id}
                    className="text-center text-lg border-b hover-bg-gray-600 last:border-b-0"
                  >
                    <img
                      src={cryptoData.image}
                      alt={cryptoData.name}
                      className="flex absolute w-[1.5rem] h-[1.6rem] ml-2 mt-2"
                    />
                    <span className="flex flex-row pl-9 mt-3 text-[20px]">
                      {cryptoData.name}
                    </span>
                    <div className="flex flex-row justify-end mr-2">
                      <div
                        className={`text-[12px] font-semibold ${
                          cryptoData.market_cap_change_percentage_24h > 0
                            ? "text-green-500 "
                            : "text-red-500 "
                        }`}
                      >
                        <i
                          className={`mr-1 text-sm ${
                            cryptoData.market_cap_change_percentage_24h > 0
                              ? "fa-solid fa-caret-up"
                              : "fa-solid fa-caret-down"
                          }`}
                        ></i>
                        <span>
                          {parseFloat(
                            cryptoData.market_cap_change_percentage_24h
                          ).toFixed(2)}
                          %
                        </span>
                      </div>
                    </div>

                    <div className="-ml-9">
                      <span className="text-[15px] -mt-4 ml-3 flex pl-8 mx-4 mb-4 truncate">
                        Mkt.Cap{" "}
                        {/* Intl.NumberFormat() --function that formats a number according to the locale and formatting options of this Intl.NumberFormat object */}
                        {new Intl.NumberFormat("en-IN", {
                          style: "currency",
                          currency: currency,
                        }).format(cryptoData.market_cap)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Sidebar;
