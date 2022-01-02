import React from "react";
import Navbar from "./Navbar";

const About = () => {
  return (
    <>
      <Navbar />
      <div id="Background" className="About">
        <p>
          UniForum was created with the vision of having a universal platform
          for people to talk to the world. It was created so that people could
          talk to other people regardless of their country, caste, race,
          religion, gender.
        </p>
      </div>
    </>
  );
};

export default About;
