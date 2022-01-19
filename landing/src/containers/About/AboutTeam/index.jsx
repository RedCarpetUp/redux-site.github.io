import React from "react";
import { team } from "common/data/about";
import TeamSection from "../TeamSection";

const AboutTeam = () => {
  const { title, description, members } = team;

  return <TeamSection />;
};

export default AboutTeam;
