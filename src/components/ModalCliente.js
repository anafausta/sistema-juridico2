import React, { useState, useEffect } from "react";

const ModalCliente = ({ isOpen, onClose, onSave, clienteAtual }) => {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [foto, setFoto] = useState("");

  useEffect(() => {
    if (clienteAtual) {
      setNome(clienteAtual.nome || "");
      setCpf(clienteAtual.cpf || "");
      setTelefone(clienteAtual.telefone || "");
      setFoto(clienteAtual.foto || "");
    } else {
      setNome("");
      setCpf("");
      setTelefone("");
      setFoto("");
    }
  }, [clienteAtual, isOpen]);

  // --- MÁSCARAS DE DIGITAÇÃO EM TEMPO REAL ---
  
  // Aplica a máscara: 000.000.000-00
  const handleCpfChange = (e) => {
    let valor = e.target.value.replace(/\D/g, ""); // Remove tudo o que não for número
    if (valor.length > 11) valor = valor.slice(0, 11); // Limita a 11 dígitos

    valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

    setCpf(valor);
  };

  // Aplica a máscara: (00) 00000-0000
  const handleTelefoneChange = (e) => {
    let valor = e.target.value.replace(/\D/g, ""); // Remove tudo o que não for número
    if (valor.length > 11) valor = valor.slice(0, 11); // Limita a 11 dígitos

    valor = valor.replace(/^(\d{2})(\d)/g, "($1) $2");
    valor = valor.replace(/(\d{5})(\d)/, "$1-$2");

    setTelefone(valor);
  };

  if (!isOpen) return null;

  // --- VALIDAÇÃO NO SUBMIT ---
  const handleSubmit = (e) => {
    e.preventDefault();

    // Regex para validar o formato exato: XXX.XXX.XXX-XX
    const regexCpf = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    
    // Regex para validar o formato exato: (XX) XXXXX-XXXX
    const regexTelefone = /^\(\d{2}\)\s\d{5}-\d{4}$/;

    if (!regexCpf.test(cpf)) {
      alert("Por favor, insira um CPF válido no formato 000.000.000-00 (11 dígitos).");
      return;
    }

    if (!regexTelefone.test(telefone)) {
      alert("Por favor, insira um telefone válido no formato (11) 99999-9999 (11 dígitos).");
      return;
    }

    onSave({
      id: clienteAtual ? clienteAtual.id : Date.now(),
      nome,
      cpf,
      telefone,
      foto: foto || null
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-conteudo">
        <div className="modal-cabecalho">
          <h2>{clienteAtual ? "Editar Cliente" : "Novo Cliente"}</h2>
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
              placeholder="Ex: Maria Silva"
            />
          </div>

          <div className="grupo-input">
            <label>CPF</label>
            <input 
              type="text" 
              required 
              value={cpf} 
              onChange={handleCpfChange} // Evento alterado para aplicar a máscara
              placeholder="000.000.000-00"
            />
          </div>

          <div className="grupo-input">
            <label>Telefone</label>
            <input 
              type="text" 
              required 
              value={telefone} 
              onChange={handleTelefoneChange} // Evento alterado para aplicar a máscara
              placeholder="(11) 99999-9999"
            />
          </div>

          <div className="grupo-input">
            <label>Nome do arquivo da Foto (Opcional)</label>
            <input 
              type="text" 
              value={foto} 
              onChange={(e) => setFoto(e.target.value)} 
              placeholder="Ex: cliente5.jpg (Deixe vazio para padrão)"
            />
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

export default ModalCliente;