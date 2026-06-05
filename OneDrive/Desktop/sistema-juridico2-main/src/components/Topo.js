import React, { useState } from "react";

const Topo = ({ notificacoes = [], setNotificacoes }) => {
  const [mostrarNotificacoes, setMostrarNotificacoes] = useState(false);

  const naoLidas = notificacoes.filter((n) => !n.lida).length;

  const alternarDropdown = () =>
    setMostrarNotificacoes(!mostrarNotificacoes);

  const marcarComoLida = (id) => {
    setNotificacoes(
      notificacoes.map((n) =>
        n.id === id ? { ...n, lida: true } : n
      )
    );
  };

  const limparTodas = () => setNotificacoes([]);

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