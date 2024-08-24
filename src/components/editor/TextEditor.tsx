import React from "react";

interface EditingInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}

function TextEditor({ value, onChange, onSubmit }: EditingInputProps) {
  return (
    <div className="absolute flex flex-col gap-2 mt-2 z-10 bg-gray-900 rounded-lg p-4">
      <input
        value={value}
        onChange={onChange}
        className="text-white w-fit bg-transparent rounded-lg p-2 border border-gray-200"
      />
      <button
        onClick={onSubmit}
        className="right  p-2 rounded-lg bg-yellow-400"
      >
        Correct
      </button>
    </div>
  );
}

export default TextEditor;
