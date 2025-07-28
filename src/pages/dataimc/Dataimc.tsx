import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Dataimc() {
  const [weight, setWeight] = useState<number | "">("");
  const [height, setHeight] = useState<number | "">("");
  const [imc, setImc] = useState<number | "">("");
  const [name, setName] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    // router.query pode ser string | string[] | undefined
    const w = router.query.weight ? Number(router.query.weight) : "";
    const h = router.query.height ? Number(router.query.height) : "";
    const i = router.query.imc ? Number(router.query.imc) : "";
    setWeight(w);
    setHeight(h);
    setImc(i);
    setDate("2025-07-28");
  }, [router.query.weight, router.query.height, router.query.imc]);

  return (
    <div>
      <div>
        <div>
          <label>Nome</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Peso</label>
          <input type="text" value={weight} readOnly />
        </div>
        <div>
          <label>Altura</label>
          <input type="text" value={height} readOnly />
        </div>
        <div>
          <label>IMC</label>
          <input type="text" value={imc} readOnly />
        </div>
        <div>
          <label>Data</label>
          <input type="text" value={date} readOnly />
        </div>
        <div>
          <button>Gravar</button>
        </div>
      </div>
      <div>GRID</div>
    </div>
  );
}
