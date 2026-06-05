import React from "react";

const Topo = () => {
  return (
    <header className="topo-barra-superior">
      <div className="topo-usuario-container">

        <div className="usuario-perfil-box">
          <div className="usuario-info-topo">
            <span className="usuario-nome">admin</span>
            <span className="usuario-cargo">Administrador</span>
          </div>

          <div className="usuario-avatar-topo">
            👤
          </div>
        </div>

      </div>
    </header>
  );
};

export default Topo;