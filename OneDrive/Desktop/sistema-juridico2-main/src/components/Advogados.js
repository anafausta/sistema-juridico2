import React, { useState, useEffect } from "react";
import ModalAdvogado from "./ModalAdvogado";

const Advogados = ({ advogados }) => {
  const [listaAdvogados, setListaAdvogados] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [advogadoEditando, setAdvogadoEditando] = useState(null);

  // Sincroniza o estado local com os advogados iniciais vindos do JSON (App.js)
  useEffect(() => {
    if (advogados) {
      setListaAdvogados(advogados);
    }
  }, [advogados]);

  const abrirModalNovo = () => {
    setAdvogadoEditando(null);
    setIsModalOpen(true);
  };

  const abrirModalEditar = (advogado) => {
    setAdvogadoEditando(advogado);
    setIsModalOpen(true);
  };

  const handleSalvarAdvogado = (dadosAdvogado) => {
    if (advogadoEditando) {
      // Atualiza o advogado editado
      const listaAtualizada = listaAdvogados.map(a => 
        a.id === dadosAdvogado.id ? dadosAdvogado : a
      );
      setListaAdvogados(listaAtualizada);
    } else {
      // Adiciona um novo advogado na lista local
      setListaAdvogados([...listaAdvogados, dadosAdvogado]);
    }
    setIsModalOpen(false);
  };

  const handleExcluir = (id, nome) => {
    const confirmacao = window.confirm(`Tem certeza que deseja remover o(a) advogado(a) ${nome} do sistema?`);
    if (confirmacao) {
      const listaAtualizada = listaAdvogados.filter(a => a.id !== id);
      setListaAdvogados(listaAtualizada);
    }
  };

  return (
    <main className="principal-dashboard">
      
      {/* Integração do Modal de Cadastro/Edição */}
      <ModalAdvogado 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSalvarAdvogado}
        advogadoAtual={advogadoEditando}
      />

      <div className="tabela-header-acoes">
        <div className="tabela-titulos">
          <h2>Corpo de Advogados</h2>
          <p>Consulte os profissionais da equipe, suas respectivas inscrições na OAB e especialidades jurídicas.</p>
        </div>
        <div className="botoes-acoes">
          {/* Botão configurado para abrir o modal */}
          <button className="btn-novo" onClick={abrirModalNovo}>+ Cadastrar Advogado</button>
        </div>
      </div>

      {/* Grid de Cards mapeando a lista local dinâmica */}
      <div className="indicadores-container grid-advogados">
        {listaAdvogados && listaAdvogados.length > 0 ? (
          listaAdvogados.map((advogado) => (
            <div className="card-advogado" key={advogado.id}>
              
              <div className="advogado-avatar-container">
                <img 
                  src={advogado.foto ? `/imagens/advogados/${advogado.foto}` : "/imagens/advogados/default.jpg"} 
                  alt={advogado.nome} 
                  className="advogado-foto-perfil"
                />
              </div>

              <div className="advogado-detalhes-corpo">
                <h3>{advogado.nome}</h3>
                
                <p className="advogado-info-linha">
                  <strong>Inscrição OAB:</strong> 
                  <span className="badge-oab">{advogado.oab}</span>
                </p>
                
                <p className="advogado-info-linha">
                  <strong>Especialidade:</strong> 
                  <span className="badge-especialidade">{advogado.especialidade}</span>
                </p>

                <div className="advogado-acoes-card">
                  {/* Eventos onClick adicionados aos botões de ação do card */}
                  <button 
                    className="btn-acao-editar" 
                    title="Editar dados"
                    onClick={() => abrirModalEditar(advogado)}
                  >
                    ✏️ Editar
                  </button>
                  <button 
                    className="btn-acao-excluir" 
                    title="Remover do sistema"
                    onClick={() => handleExcluir(advogado.id, advogado.nome)}
                  >
                    🗑️ Remover
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="tabela-vazia">
            Nenhum advogado localizado no banco de dados.
          </div>
        )}
      </div>
    </main>
  );
};

export default Advogados;