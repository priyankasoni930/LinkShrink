"use client";
import React, { useState } from "react";
import axios from "axios";
import { Clipboard, Copy, Gauge, Share2, MousePointerClick, X } from "lucide-react";
import Link from "next/link";

import ShareBtn from "@/components/ShareBtn";
import Toast from "@/utils/toast";

interface ResponseProps {
    data: {
        shortUrl: string;
        longUrl: string;
    };
}

const Page = () => {
    const [longUrl, setLongUrl] = useState<string>("");
    const [isUrlGenerated, setIsUrlGenerated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [response, setResponse] = useState<ResponseProps | {}>({});
    const [isCopied, setIsCopied] = useState<boolean>(false);

    const handleSubmit = async () => {
        let urlToShorten = longUrl;
        try {
            if (longUrl.length === 0) {
                Toast.ErrorShowToast("Please enter a valid url");
                return;
            }
            if (!longUrl.startsWith("http")) {
                urlToShorten = `https://${longUrl}`;
            }
            const urlParts = urlToShorten.split(".");
            if (urlParts.length < 2) {
                Toast.ErrorShowToast("Please enter a valid url");
                return;
            }
            setIsLoading(true);
            const req = await axios.post("/api/shorten", { url: urlToShorten });
            setResponse(req.data);
            console.log(response);
            setIsUrlGenerated(true);
            setLongUrl("");
            Toast.SuccessshowToast("Url Shortened Successfully");
        } catch (err) {
            setIsUrlGenerated(false);
            console.log(err);
            Toast.ErrorShowToast("An error occurred while shortening the url");
        } finally {
            setIsLoading(false);
        }
    };
    const copyToClipboard = async () => {
        try {
            if ("data" in response) {
                await navigator.clipboard.writeText(`https://link-shrink-snowy.vercel.app/${response.data.shortUrl || ""}`);
                setIsCopied(true);
                Toast.SuccessshowToast("URL Copied to Clipboard");
                setTimeout(() => {
                    setIsCopied(false);
                }, 2000);
            }
        } catch (err) {
            console.error("Failed to copy:", err);
            Toast.ErrorShowToast("Failed to copy URL to Clipboard");
        }
    };
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-500 via-gray-400 to-gray-700 text-gray-400 flex flex-col items-center justify-center p-4">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-400/10 via-gray-300/10 to-gray-200/10"></div>
            <section className="w-full max-w-4xl mx-auto flex flex-col items-center space-y-10 relative z-10">
                <h1 className="text-5xl md:text-7xl font-extrabold text-center text-gray-800 drop-shadow-sm">
                    {" "}
                    <span className="text-3xl font-bold">LinkShrink... </span>
                    Shrink Your Links
                </h1>

                <div className="w-full flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
                    <input type="text" onChange={(e) => setLongUrl(e.target.value)} placeholder="Enter the URL to shorten" className="w-full md:flex-1 px-6 py-4 rounded-full bg-white/80 backdrop-blur-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition placeholder-gray-400 text-gray-700" />
                    <button onClick={handleSubmit} className="w-full md:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-gray-700 to-gray-900 text-white hover:from-gray-800 hover:to-gray-950 transition-all duration-300 flex items-center justify-center space-x-2 font-semibold shadow-md">
                        <Gauge className="w-5 h-5" />
                        <span>{isLoading ? "Shrinking..." : "Shrink"}</span>
                    </button>
                </div>

                {isUrlGenerated && (
                    <div className="w-full bg-slate-400 backdrop-blur-sm rounded-lg p-6 space-y-4 shadow-lg border border-gray-400">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-semibold text-gray-700">Your Shortened URL</h2>
                            <X onClick={() => setIsUrlGenerated(false)} className="cursor-pointer text-gray-500 hover:text-gray-700 transition-colors" />
                        </div>
                        <p className="text-lg break-all text-gray-600">
                            {process.env.NEXT_PUBLIC_APP_URL || "https://link-shrink-snowy.vercel.app"}/{("data" in response && response.data.shortUrl) || ""}
                        </p>
                       <ShareBtn url={`${process.env.NEXT_PUBLIC_APP_URL || "https://link-shrink-snowy.vercel.app"}/{("data" in response && response.data.shortUrl) || ""}`}>
                                <button className="flex items-center space-x-2 px-4 py-2 rounded-full bg-black-500 hover:bg-black-600 transition-colors text-white">
                                    <Share2 className="w-5 h-5" />
                                    <span>Share</span>
                                </button>
                            </ShareBtn>
                    </div>
                )}

                <Link href="/clicks" className="group flex items-center space-x-2 px-6 py-3 rounded-full bg-gradient-to-r from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 transition-all duration-300 shadow-md text-gray-700">
                    <MousePointerClick className="w-5 h-5 group-hover:text-gray-900 transition-colors" />
                    <span>Get Number of Clicks</span>
                </Link>
            </section>

            <footer className="mt-auto py-4 text-center text-gray-600"></footer>
        </div>
    );
};

export default Page;
