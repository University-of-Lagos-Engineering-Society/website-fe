"use client";
import { useState } from "react";
import StatTemplate from "./statTemplate";
import statsObj from "./stats.json";
import statStyle from "./styles/stats.module.css";

export default function Stats() {
    const [stats] = useState(statsObj);

    return (
        <section className={statStyle.stats}>
            <div className={statStyle.statsContainer}>
                {stats.map((statItem) => {
                    return <StatTemplate key={statItem.id} {...statItem} />;
                })}
            </div>
        </section>
    );
}
