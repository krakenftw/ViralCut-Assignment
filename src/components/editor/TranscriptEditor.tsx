import { useState, useEffect, useRef } from "react";
import { Transcript } from "../../App";
import EachWord from "./EachWord";
import Controls from "./Controls";
import TextEditor from "./TextEditor";

function TranscriptEditor({
  initialTranscript,
  setTranscript,
}: {
  initialTranscript: Transcript[];
  setTranscript: (value: Transcript[]) => void;
}) {
  const synth = window.speechSynthesis;

  const [currentTime, setCurrentTime] = useState(0);
  const [isActive, setIsActive] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedWord, setEditedWord] = useState<string | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isActive == null || isActive === -1) return;
    const speakIt = new SpeechSynthesisUtterance(
      initialTranscript[isActive].word,
    );
    speakIt.rate = 1.7;
    synth.speak(speakIt);
  }, [isActive]);

  const startPlayback = () => {
    if (intervalRef.current) return;
    setIsPlaying(true);

    intervalRef.current = setInterval(() => {
      setCurrentTime((prevTime) => {
        const newTime = prevTime + 50;
        const activeWordIndex = initialTranscript.findIndex(
          (word) =>
            newTime >= word.start_time &&
            newTime < word.start_time + word.duration,
        );

        if (activeWordIndex !== -1) {
          setIsActive(activeWordIndex);
        } else {
          setIsPlaying(false);
          setIsActive(null);
          clearInterval(intervalRef.current as NodeJS.Timeout);
          intervalRef.current = null;
          setCurrentTime(0);
        }

        return newTime;
      });
    }, 50);
  };

  const stopPlayback = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsPlaying(false);
    setIsActive(null);
    setCurrentTime(0);
  };

  const handleWordClick = (index: number) => {
    setEditingIndex(index);
    setEditedWord(initialTranscript[index].word);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value == "") {
      alert("you cannot delete a word");
      //  we can add toast or something similar here, alert is just to show
      return;
    }
    setEditedWord(e.target.value);
  };

  const handleSubmit = () => {
    if (editingIndex !== null && editedWord !== null) {
      const updatedTranscript = [...initialTranscript];
      updatedTranscript[editingIndex] = {
        ...updatedTranscript[editingIndex],
        word: editedWord,
      };
      setTranscript(updatedTranscript);
    }
    setEditingIndex(null);
    setEditedWord(null);
  };

  return (
    <div className="w-1/2 flex flex-col gap-2">
      <span className="p-2 rounded-lg text-white w-fit bg-gray-500">
        {(currentTime / 1000).toFixed(1)}s
      </span>
      <div className="flex flex-wrap gap-1">
        {initialTranscript.map((eachWord, index) => (
          <div key={index} className="relative">
            <EachWord
              index={index}
              word={eachWord}
              isActive={isActive}
              onClick={() => handleWordClick(index)}
            />
            {editingIndex === index && (
              <TextEditor
                value={editedWord ?? ""}
                onChange={handleInputChange}
                onSubmit={handleSubmit}
              />
            )}
          </div>
        ))}
      </div>
      <div className="flex text-white items-center justify-center">
        <Controls
          isPlaying={isPlaying}
          startPlayback={startPlayback}
          stopPlayback={stopPlayback}
        />
      </div>
    </div>
  );
}

export default TranscriptEditor;
