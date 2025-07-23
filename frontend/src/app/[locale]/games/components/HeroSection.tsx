import React from "react";

const HeroSection = () => {
    return (
        <div data-testid="hero" className="w-full h-[407px] flex items-center justify-between bg-black z-10">
            <div className=" flex flex-col justify-center items-center w-[782.75px] h-[407px] ">
                <h1 className="flex flex-col justify-center items-center text-[80px] font-bold text-white w-[644.75px] h-[322px] leading-[1.05]">Welcome to Our World of Anime and Anime- Inspired Games!</h1>
            </div>
            <div className=" flex  justify-end items-start relative overflow-hidden w-[568.25px] h-[407px]"> {/* metade da largura, altura total */}
                <div
                    className="absolute inset-0 w-full h-full"
                    style={{
                        backgroundImage: "url('https://a.storyblok.com/f/174976/1329x1029/47daab1eac/hero-desktop.png/m/filters:quality(95):format(webp)')",
                        backgroundSize: "190% 200%",
                        backgroundPosition: "left 9%",
                        backgroundRepeat: "no-repeat",
                        zIndex: 1,
                    }}
                />
                <div 
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    style={{
                        background: "linear-gradient(rgba(255, 255, 255, 0) 0%, rgb(0, 0, 0) 100%)",
                        zIndex: 2
                    }}
                />
            </div>
        </div>
    );
}

export default HeroSection;