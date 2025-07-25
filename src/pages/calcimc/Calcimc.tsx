import { useState } from "react";

export default function Calcimc() {
  const [weight, setWeight] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  return (
    <div>
      <p>Cálculo do IMC</p>
    </div>
  );
}
