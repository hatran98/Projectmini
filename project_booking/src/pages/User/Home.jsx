import React from "react";
import HomeScreen from "../../components/screens/HomeScreen";
import { useDoctor } from "../../hooks/doctor";

function Home() {
  const { loading, doctors } = useDoctor();
  if (loading) return "loading";

  return <HomeScreen doctors={doctors} />;
}

export default Home;
