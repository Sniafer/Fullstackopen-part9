interface totalProps {
  courseParts: Array<{ name: string; exerciseCount: number }>;
}

function Total({ courseParts }: totalProps) {
  return (
    <p>
      Number of exercises{" "}
      {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  );
}
export default Total;
