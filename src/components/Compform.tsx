import React from "react";

interface CompformProps {
  label: string;
  state: string;
  funcState: (value: string) => void;
}

export default function Compform({ label, state, funcState }: CompformProps) {
  return (
    <div>
      <label>
        {label}:
        <input
          type="number"
          value={state}
          onChange={(e) => funcState(e.target.value)}
          min="0"
          step="any"
        />
      </label>
    </div>
  );
}
