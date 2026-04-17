import React from "react";
import { useAppSelector } from "../../store/hooks";

const Home = React.memo(() => {
  const app = useAppSelector((state) => state.app);

  return (
    <section className="home">
      <h2>Home page</h2>
      <p>Auth status: {app && app.name}</p>
    </section>
  );
});

export default Home;
