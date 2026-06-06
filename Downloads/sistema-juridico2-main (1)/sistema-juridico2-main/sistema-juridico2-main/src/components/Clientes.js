import React, { useState, useEffect } from "react";
import ModalCliente from "./ModalCliente";

const Clientes = ({ clientes }) => {
  const [listaClientes, setListaClientes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clienteEditando, setClienteEditando] = useState(null);

  // Sincroniza o estado local com as propriedades vindas do JSON (App.js)
  useEffect(() => {
    if (clientes) {
      setListaClientes(clientes);
    }
  }, [clientes]);

  const abrirModalNovo = () => {
    setClienteEditando(null);
    setIsModalOpen(true);
  };

  const abrirModalEditar = (cliente) => {
    setClienteEditando(cliente);
    setIsModalOpen(true);
  };

  const handleSalvarCliente = (dadosCliente) => {
    if (clienteEditando) {
      // Editar cliente existente
      const listaAtualizada = listaClientes.map(c => 
        c.id === dadosCliente.id ? dadosCliente : c
      );
      setListaClientes(listaAtualizada);
    } else {
      // Inserir novo cliente
      setListaClientes([...listaClientes, dadosCliente]);
    }
    setIsModalOpen(false);
  };

  const handleExcluir = (id, nome) => {
    const confirmacao = window.confirm(`Tem certeza que deseja remover o cliente ${nome}?`);
    if (confirmacao) {
      const listaAtualizada = listaClientes.filter(c => c.id !== id);
      setListaClientes(listaAtualizada);
    }
  };

  return (
    <main className="principal-dashboard">
      
      {/* Chamada do Modal de Clientes */}
      <ModalCliente 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSalvarCliente}
        clienteAtual={clienteEditando}
      />

      <div className="tabela-header-acoes">
        <div className="tabela-titulos">
          <h2>Gerenciamento de Clientes</h2>
          <p>Consulte a listagem de clientes ativos, seus documentos de identificação e informações de contato.</p>
        </div>
        <div className="botoes-acoes">
          {/* O botão "+ Novo Cliente" agora abre o modal corretamente */}
          <button className="btn-novo" onClick={abrirModalNovo}>+ Novo Cliente</button>
        </div>
      </div>

      {/* Grid de Cards dos Clientes usando o estado local modificado */}
<div className="indicadores-container grid-clientes">
        {listaClientes && listaClientes.length > 0 ? (
          listaClientes.map((cliente) => (
            <div className="card-cliente" key={cliente.id}>
              
              {/* 💡 Espaço da Foto Dinâmica / Ícone de Usuário Tratado */}
              <div className="cliente-avatar-container">
                {cliente.foto === "👤" || !cliente.foto ? (
                  // Renderiza um bloco centralizado com o emoji se não houver arquivo de imagem
                  <div className="avatar-padrao-fallback">👤</div>
                ) : (
                  // Caso tenha uma string de imagem (ex: "cliente1.jpg"), renderiza normalmente
                  <img 
                    src={`/imagens/clientes/${cliente.foto}`} 
                    alt={cliente.nome} 
                    className="cliente-foto-perfil"
                    // Caso o arquivo dê erro 404 ao carregar, muda dinamicamente para o fallback
                    onError={(e) => {
                      e.target.style.display = "none";
                      const fallback = document.createElement("div");
                      fallback.className = "avatar-padrao-fallback";
                      fallback.innerText = "👤";
                      e.target.parentNode.appendChild(fallback);
                    }}
                  />
                )}
              </div>

              <div className="cliente-detalhes-corpo">
                <h3>{cliente.nome}</h3>
                
                <p className="cliente-info-linha">
                  <strong>CPF:</strong> {cliente.cpf}
                </p>
                
                <p className="cliente-info-linha">
                  <strong>Telefone:</strong> {cliente.telefone}
                </p>

                <div className="cliente-acoes-card">
                  {/* Botões configurados com eventos onClick interativos */}
                  <button 
                    className="btn-acao-editar" 
                    title="Editar" 
                    onClick={() => abrirModalEditar(cliente)}
                  >
                    ✏️ Editar
                  </button>
                  <button 
                    className="btn-acao-excluir" 
                    title="Excluir"
                    onClick={() => handleExcluir(cliente.id, cliente.nome)}
                  >
                    🗑️ Remover
                  </button>
                </div>
              </div>

            </div>
          ))
        ) : (
          <div className="tabela-vazia">
            Nenhum cliente localizado no banco de dados.
          </div>
        )}
      </div>
    </main>
  );
};

export default Clientes;