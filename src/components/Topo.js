import React, { useState } from "react"; // <-- Certifique-se de que o { useState } está aqui!

const Topo = ({ notificacoes, setNotificacoes }) => {
  // Altere o início do seu componente Topo.js
  const [mostrarNotificacoes, setMostrarNotificacoes] = useState(false);

  const naoLidas = notificacoes.filter((n) => !n.lida).length;

  const alternarDropdown = () => setMostrarNotificacoes(!mostrarNotificacoes);

  const marcarComoLida = (id) => {
    setNotificacoes(notificacoes.map((n) => (n.id === id ? { ...n, lida: true } : n)));
  };

  const limparTodas = () => setNotificacoes([]);

  // ... mantenha o restante do return exatamente igual ao código anterior ...
  return (
    <header className="topo-barra-superior">
      {/* Campo de Busca Simulado */}

      {/* Lado Direito: Notificações e Usuário */}
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