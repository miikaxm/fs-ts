import { Part } from "./Part";
import { type CoursePart } from "../types";

interface ContentProps {
  courseParts: CoursePart[];
}

export const Content = ({ courseParts }: ContentProps) => {
  return (
    <>
      {courseParts.map(part => (
        <div>
          <p style={{ margin: 0 }}><b>{part.name} {part.exerciseCount}</b></p>
          <Part key={part.name} part={part} />
        </div>
        
      ))}
    </>
  );
};