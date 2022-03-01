import { CoursePart } from "../types";

interface partProps {
  part: CoursePart;
}

const Part = ({ part }: partProps) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };
  switch (part.type) {
    case "normal":
      return (
        <div key={part.name}>
          <h4>
            {part.name} {part.exerciseCount}
          </h4>
          <p>
            <i>{part.description}</i>
          </p>
        </div>
      );
    case "groupProject":
      return (
        <div key={part.name}>
          <h4>
            {part.name} {part.exerciseCount}
          </h4>
          <p>Project exercises: {part.groupProjectCount}</p>
        </div>
      );
    case "submission":
      return (
        <div key={part.name}>
          <h4>
            {part.name} {part.exerciseCount}
          </h4>
          <p>
            <i>{part.description}</i>
          </p>
          <p>Submmit to: {part.exerciseSubmissionLink}</p>
        </div>
      );
    case "special":
      return (
        <div key={part.name}>
          <h4>
            {part.name} {part.exerciseCount}
          </h4>
          <p>
            <i>{part.description}</i>
          </p>
          <p>Required skills: {part.requirements.join(", ")}</p>
        </div>
      );
    default:
      return assertNever(part);
  }
};

export default Part;
