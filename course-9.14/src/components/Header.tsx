interface headerProps {
  courseName: string;
}

const Header = ({ courseName }: headerProps) => {
  return <h1>{courseName}</h1>;
};

export default Header;
