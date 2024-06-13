import React from "react";
import Button from "../Button";

const Socials = ({ className, socials }) => {
  if (!socials || socials.length === 0) {
    return null;
  }

  return (
    <div className={`${className} flex flex-wrap mob:flex-nowrap link`}>
      {socials.map((social, index) => (
        <Button key={index} onClick={() => window.open(social.link)}>
          {social.title}
        </Button>
      ))}
    </div>
  );
};

export default Socials;
