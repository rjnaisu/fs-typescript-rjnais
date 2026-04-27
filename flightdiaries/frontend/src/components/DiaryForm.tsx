import { useState } from "react";
import type { NewDiaryEntry } from "../types";

const weatherOptions = ["sunny", "rainy", "cloudy", "stormy", "windy"];
const visibilityOptions = ["great", "good", "ok", "poor"];

type DiaryFormProps = {
  onSubmit: (entry: NewDiaryEntry) => Promise<void>;
};

export const DiaryForm = ({ onSubmit }: DiaryFormProps) => {
  const [date, setDate] = useState("");
  const [weather, setWeather] = useState("");
  const [visibility, setVisibility] = useState("");
  const [comment, setComment] = useState("");

  const entryCreation = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const newEntry = {
      date,
      weather,
      visibility,
      comment,
    };

    await onSubmit(newEntry);

    setDate("");
    setWeather("");
    setVisibility("");
    setComment("");
  };

  return (
    <form onSubmit={entryCreation} className="diary-form">
      <h2>New Diary Entry</h2>
      <input type="date" value={date} onChange={(event) => setDate(event.target.value)} />
      <fieldset>
        <legend>Weather</legend>
        {weatherOptions.map((option) => (
          <label key={option}>
            <input
              type="radio"
              name="weather"
              value={option}
              checked={weather === option}
              onChange={(event) => setWeather(event.target.value)}
            />
            {option}
          </label>
        ))}
      </fieldset>

      <fieldset>
        <legend>Visibility</legend>
        {visibilityOptions.map((option) => (
          <label key={option}>
            <input
              type="radio"
              name="visibility"
              value={option}
              checked={visibility === option}
              onChange={(event) => setVisibility(event.target.value)}
            />
            {option}
          </label>
        ))}
      </fieldset>

      <input
        value={comment}
        placeholder={"comment"}
        onChange={(event) => setComment(event.target.value)}
      />

      <button type="submit">Add Entry</button>
    </form>
  );
};
