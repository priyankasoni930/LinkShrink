"use client";
import React, { useState } from "react";
import axios from "axios";
import { ArrowLeft, Search } from "lucide-react";
import Link from "next/link";

import Toast from "@/utils/toast";

const Page = () => {
    const [shortid, setShortId] = useState<string>("");
    const [renderClickDiv, setRenderClickDiv] = useState<boolean>(false);
    const [loading, setIsLoading] = useState<boolean>(false);
    const [data, setData] = useState<any>({});
    const getClicks = async () => {
        try {
            if (shortid.length < 5) {
                Toast.ErrorShowToast("Enter a valid id");
                return;
            }
            setIsLoading(true);
            const res = await axios.get(`/api/getClicks?id=${shortid}`);
            setData(res.data);
            setRenderClickDiv(true);
            console.log(res.data);
        } catch (error) {
            Toast.ErrorShowToast("Unable to get information check id");
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-500 via-gray-400 to-gray-700 text-gray-400 flex flex-col p-4">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-400/10 via-gray-300/10 to-gray-200/10"></div>

            <Link href="/" className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors z-10">
                <ArrowLeft className="w-5 h-5" />
                <span>Back</span>
            </Link>

            <div className="flex flex-col items-center justify-center mt-10 w-full max-w-2xl mx-auto z-10">
                <div className="w-full space-y-6">
                    <label htmlFor="shortId" className="relative w-full block">
                        <input type="text" id="shortId" onChange={(e) => setShortId(e.target.value)} className="w-full px-6 py-4 rounded-lg bg-white/80 backdrop-blur-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition text-gray-700" placeholder="Enter Your ShortId" />
                        <span className="absolute -top-3 left-4 px-2 bg-gray-100 text-sm font-medium text-gray-600">ShortId</span>
                    </label>

                    <button onClick={getClicks} className="w-full md:w-auto px-8 py-4 rounded-lg bg-gradient-to-r from-gray-700 to-gray-900 text-white hover:from-gray-800 hover:to-gray-950 transition-all duration-300 flex items-center justify-center space-x-2 font-semibold shadow-md">
                        <span>{loading ? "Searching..." : "Search"}</span>
                        <Search className="w-5 h-5" />
                    </button>
                </div>

                {renderClickDiv ? (
                    <div className="w-full mt-8 p-6 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 flex items-center justify-center">
                        <h1 className="text-3xl font-bold text-gray-800">
                            Total Clicks: <span className="text-blue-600">{data?.data || 0}</span>
                        </h1>
                    </div>
                ) : (
                    <div className="w-full mt-8 p-6 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">What is ShortId?</h2>
                        <p className="text-gray-600 mb-4">The ShortId is the last 7 characters at the end of your shortened URL.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
export default Page;
