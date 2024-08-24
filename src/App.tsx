import { useState } from "react";
import TranscriptEditor from "./components/editor/TranscriptEditor";

export type Transcript = {
  word: string;
  start_time: number;
  duration: number;
};

function App() {
  const [transcript, setTranscript] = useState<Transcript[]>([
    { word: "Hello", start_time: 0, duration: 500 },
    { word: "world", start_time: 500, duration: 700 },
    { word: "This", start_time: 1200, duration: 300 },
    { word: "is", start_time: 1500, duration: 200 },
    { word: "a", start_time: 1700, duration: 100 },
    { word: "test", start_time: 1800, duration: 400 },
    { word: "transcript", start_time: 2200, duration: 600 },
    { word: "for", start_time: 2800, duration: 200 },
    { word: "playback", start_time: 3000, duration: 500 },
    { word: "and", start_time: 3500, duration: 250 },
    { word: "editing", start_time: 3750, duration: 800 },
    { word: "features.", start_time: 4550, duration: 650 },
    { word: "It", start_time: 5200, duration: 200 },
    { word: "also", start_time: 5400, duration: 300 },
    { word: "supports", start_time: 5700, duration: 500 },
    { word: "real-time", start_time: 6200, duration: 600 },
    { word: "highlighting", start_time: 6800, duration: 700 },
    { word: "and", start_time: 7500, duration: 250 },
    { word: "text", start_time: 7750, duration: 300 },
    { word: "editing", start_time: 8050, duration: 500 },
    { word: "capabilities", start_time: 8550, duration: 600 },
    { word: "for", start_time: 9150, duration: 200 },
    { word: "an", start_time: 9350, duration: 150 },
    { word: "enhanced", start_time: 9500, duration: 400 },
    { word: "user", start_time: 9900, duration: 300 },
    { word: "experience.", start_time: 10200, duration: 600 },
  ]);
  return (
    <>
      <div className="w-screen min-h-screen bg-slate-700 flex items-center justify-center">
        <TranscriptEditor
          initialTranscript={transcript}
          setTranscript={setTranscript}
        />
      </div>
    </>
  );
}

export default App;
