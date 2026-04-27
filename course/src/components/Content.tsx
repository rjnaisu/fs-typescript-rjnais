import { Part } from "./Part";
import type { CoursePart } from "../App";

interface ContentProps {
  parts: CoursePart[];
}

export const Content = ({ parts }: ContentProps) => (
  <div>
    {parts.map((part) => (
      <div key={part.name}>
        <Part part={part} />
      </div>
    ))}
  </div>
);
