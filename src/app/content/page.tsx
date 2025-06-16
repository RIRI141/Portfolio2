'use client'

import AboutMe from "@/components/AboutMe";
import Work from "@/components/Work";
import Contact from "@/components/Contact";
import Skill from "@/components/Skill";

const Contents = () => {
  return (
    <>
      <div id="about-me">
        <AboutMe />
      </div>
      <div id="work">
        <Work />
      </div>
      <div id="skill">
        <Skill />
      </div>
      <div id="contact">
        <Contact />
      </div>
    </>
  );
};

export default Contents;