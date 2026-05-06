import { type CoursePart } from "../types";

type PartProps = {
  part: CoursePart;
};

export const Part = ({ part }: PartProps) => {
  switch (part.kind) {
    case "basic":
      return (
        <div>
          <p style={{ marginTop: 0 }}>{part.description}</p>
        </div>
      );

    case "group":
      return (
        <div>
          <p style={{ marginTop: 0 }}>group projects {part.groupProjectCount}</p>
        </div>
      );

    case "background":
      return (
        <div>
          <p style={{ marginTop: 0, marginBottom: 0 }}>{part.description}</p>
          <p style={{ marginTop: 0 }}>submit to: {part.backgroundMaterial}</p>
        </div>
      );
    
    case "special":
      return (
        <div>
          <p style={{ marginTop: 0, marginBottom: 0 }}>{part.description}</p>
          <p style={{ marginTop: 0}}>required skills: {part.requirements.join(", ")}</p>
        </div>
      )

    default:
      return null;
  }
};