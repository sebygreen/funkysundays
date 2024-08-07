"use client";

import CountUp from "react-countup";

export default function Counter({ number }) {
    return (
        <CountUp start={0} end={number} delay={0} enableScrollSpy scrollSpyOnce>
            {({ countUpRef }) => <span ref={countUpRef} />}
        </CountUp>
    );
}
