import React, { useState, useEffect } from "react";
import ModalProcesso from "./ModalProcesso"; 
import Relatorio from "./Relatorio"; 

const Home = ({ processos, clientes, advogados, casos }) => {
  const [listaProcessos, setListaProcessos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [processoEditando, setProcessoEditando] = useState(null);
  useEffect(() => {
    if (processos) {
      setListaProcessos(processos);
    }
  }, [processos]);

  //FUNÇÕES DE MANIPULAÇÃO

  const abrirModalNovo = () => {
    setProcessoEditando(null);
    setIsModalOpen(true);
  };

  const abrirModalEditar = (processo) => {
    setProcessoEditando(processo);
    setIsModalOpen(true);
  };

  const handleSalvarProcesso = (dadosProcesso) => {
    if (processoEditando) {
      const listaAtualizada = listaProcessos.map(p => 
        p.id === dadosProcesso.id ? dadosProcesso : p
      );
      setListaProcessos(listaAtualizada);
    } else {
      setListaProcessos([...listaProcessos, dadosProcesso]);
    }
    setIsModalOpen(false);
  };

  const handleExcluir = (id, numero) => {
    const confirmacao = window.confirm(`Tem certeza que deseja excluir o processo ${numero}?`);
    if (confirmacao) {
      const listaAtualizada = listaProcessos.filter(p => p.id !== id);
      setListaProcessos(listaAtualizada);
    }
  };

  const handleExportarCSV = () => {
    const cabecalho = ["ID", "Nº Processo", "Cliente", "Advogado Responsável", "Status"];
    const linhasCSV = listaProcessos.map(p => 
      `"${p.id}","${p.numero_processo}","${p.cliente}","${p.advogado}","${p.status}"`
    );

    const csvCompleto = [cabecalho.join(","), ...linhasCSV].join("\n");
    
    const blob = new Blob(["\uFEFF" + csvCompleto], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "processos_recentes.csv"; 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className="principal-dashboard">
      
      <ModalProcesso 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSalvarProcesso}
        processoAtual={processoEditando}
        listaClientes={clientes} 
        listaAdvogados={advogados}
      />
      <Relatorio processos={listaProcessos} />
      
      <section className="indicadores-container">
        <div className="card-indicador">
          <div className="indicador-icone">📂</div>
          <div className="indicador-info">
            <span className="indicador-numero">{listaProcessos ? listaProcessos.length : 0}</span>
            <span className="indicador-rotulo">Total de Processos</span>
          </div>
        </div>
        </section>

      <section className="tabela-secao">
        <div className="tabela-header-acoes">
          <div className="tabela-titulos">
            <h2>Processos Recentes</h2>
            <p>Gerencie os processos jurídicos cadastrados.</p>
          </div>
          <div className="botoes-acoes">
            <button className="btn-novo" onClick={abrirModalNovo}>+ Novo Processo</button>
            <button className="btn-exportar" onClick={handleExportarCSV}>📤 Exportar CSV</button>
          </div>
        </div>

        <div className="tabela-container">
          <table className="tabela-juridica-dashboard">
            <thead>
              <tr>
                <th>Nº Processo</th>
                <th>Cliente</th>
                <th>Advogado Responsável</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {listaProcessos && listaProcessos.length > 0 ? (
                listaProcessos.map((processo) => (
                  <tr key={processo.id}>
                    <td className="col-numero">{processo.numero_processo}</td>
                    <td className="col-destaque">{processo.cliente}</td>
                    <td>{processo.advogado}</td>
                    <td>
                      <span className={`badge-status ${
                        processo.status === "Concluído" ? "status-concluido" :
                        processo.status === "Pendente de julgamento" || processo.status === "Pendente" ? "status-pendente" :
                        "status-andamento"
                      }`}>
                        {processo.status}
                      </span>
                    </td>
                    <td className="col-acoes">
                      <button 
                        className="btn-acao-tabela btn-editar" 
                        title="Editar"
                        onClick={() => abrirModalEditar(processo)}
                      >✏️</button>
                      <button 
                        className="btn-acao-tabela btn-excluir" 
                        title="Excluir"
                        onClick={() => handleExcluir(processo.id, processo.numero_processo)}
                      >🗑️</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="tabela-vazia">Nenhum processo jurídico encontrado.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="tabela-footer-paginacao">
          <span>Mostrando 1 a {listaProcessos ? listaProcessos.length : 0} resultados</span>
          <div className="paginacao-botoes">
            <button className="btn-pag-seta" disabled>&lt;</button>
            <button className="btn-pag-numero ativo">1</button>
            <button className="btn-pag-seta" disabled>&gt;</button>
          </div>
        </div>
      </section>

    </main>
  );
};

export default Home;