import { PauseIcon, PlayIcon } from "@radix-ui/react-icons";

function Controls({
  isPlaying,
  startPlayback,
  stopPlayback,
}: {
  isPlaying: boolean;
  startPlayback: () => void;
  stopPlayback: () => void;
}) {
  return (
    <div className="rounded-lg border p-2">
      {isPlaying ? (
        <PauseIcon onClick={stopPlayback} />
      ) : (
        <PlayIcon onClick={startPlayback} />
      )}
    </div>
  );
}

export default Controls;
