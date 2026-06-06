import React, { useState, useEffect } from "react";

const ModalProcesso = ({ isOpen, onClose, onSave, processoAtual, listaClientes, listaAdvogados }) => {
  const [numero, setNumero] = useState("");
  const [cliente, setCliente] = useState("");
  const [advogado, setAdvogado] = useState("");
  const [status, setStatus] = useState("Em andamento");

  useEffect(() => {
    if (processoAtual) {
      setNumero(processoAtual.numero_processo || "");
      setCliente(processoAtual.cliente || "");
      setAdvogado(processoAtual.advogado || "");
      setStatus(processoAtual.status || "Em andamento");
    } else {
      setNumero("");
      setCliente("");
      setAdvogado("");
      setStatus("Em andamento");
    }
  }, [processoAtual, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault(); 
    onSave({
      id: processoAtual ? processoAtual.id : Date.now(), 
      numero_processo: numero,
      cliente,
      advogado,
      status
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-conteudo">
        <div className="modal-cabecalho">
          <h2>{processoAtual ? "Editar Processo" : "Novo Processo"}</h2>
          <button className="btn-fechar-modal" onClick={onClose}>&times;</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-formulario">
          <div className="grupo-input">
            <label>Número do Processo</label>
            <input 
              type="text" 
              required 
              value={numero} 
              onChange={(e) => setNumero(e.target.value)} 
              placeholder="Ex: 0001234-56.2024.8.26.0000"
            />
          </div>

 {}
          <div className="grupo-input">
            <label>Cliente</label>
            <select 
              required
              value={cliente} 
              onChange={(e) => setCliente(e.target.value)}
            >
              <option value="">Selecione o Cliente</option>
              {listaClientes && listaClientes.map((c) => (
                <option key={c.id} value={c.nome}>
                  {c.nome}
                </option>
              ))}
            </select>
          </div>

          {}
          <div className="grupo-input">
            <label>Advogado Responsável</label>
            <select 
              required
              value={advogado} 
              onChange={(e) => setAdvogado(e.target.value)}
            >
              <option value="">Selecione o Advogado</option>
              {listaAdvogados && listaAdvogados.map((a) => (
                <option key={a.id} value={a.nome}>
                  {a.nome} (OAB: {a.oab})
                </option>
              ))}
            </select>
          </div>

          <div className="grupo-input">
            <label>Status do Processo</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="Em andamento">Em andamento</option>
              <option value="Pendente de julgamento">Pendente de julgamento</option>
              <option value="Concluído">Concluído</option>
            </select>
          </div>

          <div className="modal-acoes">
            <button type="button" className="btn-cancelar" onClick={onClose}>Cancelar</button>
            <button type="submit" className="btn-salvar">Salvar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalProcesso;