import { useState, useEffect } from "react";
import diaryService from "./services/diaryService";
import type { DiaryEntry, NewDiaryEntry } from "./types";
import "./App.css";
import { DiaryForm } from "./components/DiaryForm";
import axios from "axios";
import { DiaryList } from "./components/DiaryList";

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    diaryService.getAll().then((initDiaries) => {
      setDiaries(initDiaries);
    });
  }, []);

  useEffect(() => {
    if (!errorMsg) {
      return;
    }

    const timeoutId = setTimeout(() => {
      setErrorMsg(null);
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [errorMsg]);

  const entryCreation = async (newEntry: NewDiaryEntry) => {
    try {
      const returned = await diaryService.create(newEntry);
      setDiaries(diaries.concat(returned));
      setErrorMsg(null);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const issue = error.response?.data.error[0];
        const field = issue.path[0];
        console.error(error.response);
        setErrorMsg(`Error: ${field ?? "input"} is invalid or missing`);
      } else {
        setErrorMsg("Error: Something went wrong");
      }
      throw error;
    }
  };

  return (
    <div>
      <DiaryForm onSubmit={entryCreation} />
      {errorMsg && <p className="error-message">{errorMsg}</p>}
      <DiaryList diaries={diaries} />
    </div>
  );
}

export default App;
