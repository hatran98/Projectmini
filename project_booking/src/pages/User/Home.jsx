import React, { useEffect } from "react";
import HomeScreen from "../../components/screens/HomeScreen";
import { useDoctor } from "../../hooks/doctor";
import { useUser } from "../../hooks/user";
import { useClinic } from "../../hooks/clinic";
function Home() {
  const { loading, doctors } = useDoctor();
  const { clinic } = useClinic();
  const { user } = useUser();
  if (loading) return "loading";

  return <HomeScreen doctors={doctors} />;
}

export default Home;
