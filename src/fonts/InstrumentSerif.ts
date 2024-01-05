import { Instrument_Serif } from "next/font/google";

const InstrumentSerif = Instrument_Serif({
    subsets: ["latin"],
    weight: "400",
    style: ["normal", "italic"],
    display: "swap",
    adjustFontFallback: false,
});
export default InstrumentSerif;
