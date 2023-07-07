import React from "react";
import poster from "../../img/poster.png";

const HomePage = () => {
    return (
        <>
        <section className="pb-10 bg-gray-300">
            <div className="relative container px-4   mx-auto">
            <div className="flex flex-wrap items-center -mx-4 mb-10 2xl:mb-14">
                <div className="w-full lg:w-1/2 px-4 mb-16 lg:mb-0">
                <span className="text-lg font-bold text-black">
                    Create Fashion Posts
                </span>
                <h2 className="max-w-2xl mt-12 mb-12 text-6xl 2xl:text-8xl text-white font-bold font-heading">
                    Share your ideas{" "}
                    <span className="text-yellow-500">with a post</span>
                </h2>
                <p className="mb-12 lg:mb-16 2xl:mb-24 text-xl text-gray-100">
                    Explore your ideas and share them with your friends.
                </p>
                <a
                    className="inline-block px-12 py-5 text-lg text-white font-bold bg-green-300 hover:bg-green-400 rounded-full transition duration-200"
                    href="/"
                >
                    Find the look
                </a>
                </div>
                <div className="w-full lg:w-1/2 px-4">
                <img className="w-full" src={poster} alt={poster} />
                </div>
            </div>
            </div>
        </section>
        </>
    );
};

export default HomePage;