import type { NextPage } from "next";
import Description from "../components/Description";
import Title from "../components/Title";

const Home: NextPage = () => {
  return (
    <>
      <Title title="Forsiden" author="Marius" />
      <Description text="Min tekst" />
      <button>Dette er en knapp</button>
    </>
  );
};

export default Home;
