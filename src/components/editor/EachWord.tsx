import { Transcript } from "../../App";

function EachWord({
  word,
  isActive,
  index,
  onClick,
}: {
  word: Transcript;
  isActive: number | null;
  index: number;
  onClick: () => void;
}) {
  return (
    <span
      onClick={onClick}
      className={`break-words rounded-lg p-1 text-xl text-white border-2 ${
        isActive === index ? "border-yellow-400" : "border-transparent"
      }`}
    >
      {word.word}
    </span>
  );
}

export default EachWord;
