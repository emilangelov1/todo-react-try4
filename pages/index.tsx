import type { NextPage } from "next";
import { Todos } from "../components/Todos/Todos";

const Home: NextPage = () => {
  return (
    <div>
      <Todos />
    </div>
  );
};

export default Home;
