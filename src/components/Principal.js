import React from "react";
import Home from "./Home";

const Principal = () => {
  // Dados definidos como variáveis no componente-pai (Principal)
  const idSistema = "sistema-civil-law";
  const titulo = "Sistema de Civil Law";
  const autor = "Tradição Romano-Germânica";
  const tituloPagina = "Sistemas Jurídicos em Destaque";

  return (
    <main className="principal">
      {/* Dados passados para o componente-filho (Home) via atributos/props */}
      <Home
        idSistema={idSistema}
        titulo={titulo}
        autor={autor}
        tituloPagina={tituloPagina}
      />
    </main>
  );
};

export default Principal;