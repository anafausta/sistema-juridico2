import React, { useState, useEffect } from "react";

const ModalAdvogado = ({ isOpen, onClose, onSave, advogadoAtual }) => {
  const [nome, setNome] = useState("");
  const [oab, setOab] = useState("");
  const [especialidade, setEspecialidade] = useState("");
  const [foto, setFoto] = useState("");

  useEffect(() => {
    if (advogadoAtual) {
      setNome(advogadoAtual.nome || "");
      setOab(advogadoAtual.oab || "");
      setEspecialidade(advogadoAtual.especialidade || "");
      setFoto(advogadoAtual.foto || "");
    } else {
      setNome("");
      setOab("");
      setEspecialidade("");
      setFoto("");
    }
  }, [advogadoAtual, isOpen]);

  // CORREÇÃO 1: Se o modal não estiver aberto, não renderiza absolutamente nada na tela
  if (!isOpen) return null;

  const handleOabChange = (e) => {
    let valor = e.target.value.toUpperCase();
    valor = valor.replace(/[^A-Z0-9]/g, "");
    setOab(valor);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const regexOab = /^[A-Z]{2}\d{3,6}$/;
    
    if (!regexOab.test(oab)) {
      alert("Por favor, insira uma OAB válida no formato: UF + Número (Ex: SP12345).");
      return;
    }

    onSave({
      id: advogadoAtual ? advogadoAtual.id : Date.now(),
      nome,
      oab,
      especialidade,
      foto: foto || null
    });

    // CORREÇÃO 2: Fecha a aba/modal automaticamente após salvar com sucesso
    onClose(); 
  };

  return (
    <div className="modal-overlay">
      <div className="modal-conteudo">
        <div className="modal-cabecalho">
          <h2>{advogadoAtual ? "Editar Advogado" : "Cadastrar Advogado"}</h2>
          {/* O botão "X" chama a função onClose recebida por propriedade */}
          <button className="btn-fechar-modal" onClick={onClose}>&times;</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-formulario">
          <div className="grupo-input">
            <label>Nome Completo</label>
            <input 
              type="text" 
              required 
              value={nome} 
              onChange={(e) => setNome(e.target.value)} 
              placeholder="Ex: Dr. Roberto Alencar"
            />
          </div>

          <div className="grupo-input">
            <label>Inscrição OAB</label>
            <input 
              type="text" 
              required 
              value={oab} 
              onChange={handleOabChange}
              placeholder="Ex: SP12345"
            />
          </div>

          <div className="grupo-input">
            <label>Especialidade Jurídica</label>
            <input 
              type="text" 
              required 
              value={especialidade} 
              onChange={(e) => setEspecialidade(e.target.value)} 
              placeholder="Ex: Direito Civil, Trabalhista, Penal"
            />
          </div>

          <div className="grupo-input">
            <label>Nome do arquivo da Foto (Opcional)</label>
            <input 
              type="text" 
              value={foto} 
              onChange={(e) => setFoto(e.target.value)} 
              placeholder="Ex: advogado3.jpg (Deixe vazio para padrão)"
            />
          </div>

          <div className="modal-acoes">
            {/* CORREÇÃO 3: Adicionado o evento onClick={onClose} no botão Cancelar */}
            <button type="button" className="btn-cancelar" onClick={onClose}>Cancelar</button>
            <button type="submit" className="btn-salvar">Salvar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalAdvogado;