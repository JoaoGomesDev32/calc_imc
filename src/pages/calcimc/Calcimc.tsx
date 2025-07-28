import { useState } from "react";
import Campform from "@/components/Campform";
import Tableimc from "@/components/Tableimc";

export default function Calcimc() {
  const [weight, setWeight] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [imc, setImc] = useState<number | null>(null);

  const calculateIMC = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    if (!isNaN(w) && !isNaN(h) && h > 0) {
      const res = w / (h * h);
      setImc(res);
    } else {
      setImc(null);
    }
  };

  return (
    <div className="flex flex-col border border-black w-[300px] gap-5">
      <p className="w-full text-center bg-zinc-400 font-bold text-lg">
        Cálculo do IMC
      </p>
      <Campform label="peso" state={weight} funcState={setWeight} />
      <Campform label="altura" state={height} funcState={setHeight} />
      <button
        className="bg-indigo-900 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-300"
        onClick={calculateIMC}
      >
        Calcular
      </button>
      <p className="bg-zinc-100 p-1 text-center text-xl font-bold mt-5">
        Resultado: {imc !== null ? imc.toFixed(2) : "Insira valores válidos"}
      </p>
      <Tableimc />
    </div>
  );
}
