import React from "react";


export default function DragHorinzontalRule () {
    return (
        <button className="cursor-grab flex w-[142px] px-[9px] pt-[49px]  flex-col justify-center items-center gap-[33px] rounded-sm bg-[#F6F3FF]">
            <div className="bg-[#997BFF] w-[105px] h-[4px] rounded-md"></div>
            <span className="text-[#997BFF] text-center leading-trim text-cap font-Inter text-[14px] font-medium leading-[16px]">Horizontal Rule</span>
        </button>
    )
}