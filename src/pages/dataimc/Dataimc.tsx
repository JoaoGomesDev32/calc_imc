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
        <div className="campoForm">
          <label>Nome</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="campoForm">
          <label>Peso</label>
          <input className="inputDados" type="text" value={weight} readOnly />
        </div>
        <div className="campoForm">
          <label>Altura</label>
          <input className="inputDados" type="text" value={height} readOnly />
        </div>
        <div className="campoForm">
          <label>IMC</label>
          <input className="inputDados" type="text" value={imc} readOnly />
        </div>
        <div className="campoForm">
          <label>Data</label>
          <input className="inputDados" type="text" value={date} readOnly />
        </div>
        <div className="botaoDados">
          <button>Gravar</button>
        </div>
      </div>
      <div className="grid">
        <div className="gridLinhaTitulos">
          <div className="gridTitulos">Nome</div>
          <div className="gridTitulos">Peso</div>
          <div className="gridTitulos">Altura</div>
          <div className="gridTitulos">IMC</div>
          <div className="gridTitulos">Data</div>
        </div>
        <div className="linhaDados">
          <div className="gridLinhas">
            <div className="gridLinha">Nome 1</div>
            <div className="gridLinha">Peso 1</div>
            <div className="gridLinha">Altura 1</div>
            <div className="gridLinha">IMC 1</div>
            <div className="gridLinha">Data 1</div>
          </div>
          <div className="gridLinhas">
            <div className="gridLinha">Nome 2</div>
            <div className="gridLinha">Peso 2</div>
            <div className="gridLinha">Altura 2</div>
            <div className="gridLinha">IMC 2</div>
            <div className="gridLinha">Data 2</div>
          </div>
        </div>
      </div>
    </div>
  );
}
