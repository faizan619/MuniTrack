import { Rye, Kaushan_Script, Arima, Source_Serif_4,Caveat_Brush } from "next/font/google";

const rye = Rye({
  weight: "400",
  subsets: "",
  preload: false,
});
const kushan = Kaushan_Script({
  weight: "400",
  subsets: "",
  preload: false,
});
const arima = Arima({
  weight: "400",
  subsets: "",
  preload: false,
});
const serif = Source_Serif_4({
  weight: "400",
  subsets: "",
  preload: false,
});
const car = Caveat_Brush({
  weight: "400",
  subsets: "",
  preload: false,
});

export { serif, arima, kushan, rye ,car};
