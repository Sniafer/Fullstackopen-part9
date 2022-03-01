import { CoursePart } from "../types";
import Part from "./Part";

interface contentProps {
  courseParts: CoursePart[];
}

const Content = ({ courseParts }: contentProps) => {
  return (
    <div>
      {courseParts.map((c) => (
        <Part key={c.name} part={c} />
      ))}
    </div>
  );
};
export default Content;
