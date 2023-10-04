import React from "react";

type Counter = {
    value: number;
};

export default function CounterDisplay({ value }: Counter) {
    return (
        <>
            <div className="text-6xl text-[#e06c75] font-bold">
                Test Couting
            </div>
            <div className="text-[#61afef] text-8xl">{value}</div>
        </>
    );
}
