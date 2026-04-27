import type { DiaryEntry } from "../types";

export const DiaryList = ({ diaries }: { diaries: DiaryEntry[] }) => {
  return (
    <div>
      {diaries.map((entry) => (
        <li key={entry.id}>
          <h3>{entry.date}</h3>
          weather: {entry.weather} <br />
          visibility: {entry.visibility}
        </li>
      ))}
    </div>
  );
};
