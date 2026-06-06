import React from "react";
import { NavLink } from "react-router-dom";
import logoImg from "../imagens/logo.png"; 

const Navegacao = () => {
  return (
    <aside className="sidebar-sistema">
      {/* Topo da Sidebar: Logo da Marca */}
      <div className="sidebar-logo-container">
        <img 
          src={logoImg} 
          alt="IFjuridico" 
          className="sidebar-logo-img" 
        />
        <div className="sidebar-marca-texto">
          <h1>IFjuridico</h1>
          <span>Gestão Jurídica Inteligente</span>
        </div>
      </div>

      {/* Lista de Links de Navegação */}
      <ul className="menu-navegacao-vertical">
        <li>
          <NavLink to="/" end>
            <span className="menu-icone">🏠</span> Dashboard
          </NavLink>
        </li>
{/* Substitua o item de Casos por este de Mensagens */}
        <li>
          <NavLink to="/mensagens">
            <span className="menu-icone">✉️</span> Mensagens
          </NavLink>
        </li>
        <li>
          <NavLink to="/processos">
            <span className="menu-icone">📂</span> Processos

          </NavLink>
        </li>
        <li>
          <NavLink to="/clientes">
            <span className="menu-icone">👥</span> Clientes
          </NavLink>
        </li>
        <li>
          <NavLink to="/advogados">
            <span className="menu-icone">⚖️</span> Advogados
          </NavLink>
        </li>
      </ul>

      {/* Vetor/Marca d'água decorativa no final da sidebar (opcional) */}
      <div className="sidebar-balanca-decorativa">
        ⚖️
      </div>
    </aside>
  );
};

export default Navegacao;