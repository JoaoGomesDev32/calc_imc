import { useState } from "react";
import Compform from "@/components/Compform";
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
    <div>
      <p>Cálculo do IMC</p>
      <Compform label="peso" state={weight} funcState={setWeight} />
      <Compform label="altura" state={height} funcState={setHeight} />
      <button onClick={calculateIMC}>Calcular</button>
      <p>
        Resultado: {imc !== null ? imc.toFixed(2) : "Insira valores válidos"}
      </p>
      <Tableimc />
    </div>
  );
}
