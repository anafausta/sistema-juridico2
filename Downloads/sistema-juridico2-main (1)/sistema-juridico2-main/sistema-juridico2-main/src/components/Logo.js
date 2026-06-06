import React from "react";
import { Link } from "react-router-dom"; // Importação do Link adicionada

const Logo = () => {
  return (
    <Link to="/">
      <h1 className="logo">
        <span>Sistemas Jurídicos</span>
      </h1>
    </Link>
  );
};

export default Logo;