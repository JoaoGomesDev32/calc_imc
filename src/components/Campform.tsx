import React from "react";

interface CompformProps {
  label: string;
  state: string;
  funcState: (value: string) => void;
}

export default function Compform({ label, state, funcState }: CompformProps) {
  return (
    <div className="flex mx-2">
      <label className="flex flex-col w-full">
        {label}:
        <input
          className="border border-black rounded-md p-1"
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
