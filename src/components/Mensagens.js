import React, { useState } from "react";


const Mensagens = ({ conversas, setConversas }) => {
  const [conversaAtivaId, setConversaAtivaId] = useState(1);
  const [inputMensagem, setInputMensagem] = useState("");

  const conversaAtiva = conversas.find(c => c.id === conversaAtivaId) || conversas[0];

  const enviarMensagem = (e) => {
    e.preventDefault();
    if (!inputMensagem.trim()) return;

    const novaMsgObj = {
      id: Date.now(),
      envio: "voce",
      texto: inputMensagem,
      horario: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setConversas(prevConversas => 
      prevConversas.map(c => {
        if (c.id === conversaAtiva.id) {
          return {
            ...c,
            historico: [...c.historico, novaMsgObj],
            ultimaMensagem: inputMensagem,
            nova: false
          };
        }
        return c;
      })
    );

    setInputMensagem("");
  };

  return (
    <div className="chat-container-principal">
      {/* Sidebar de conversas */}
      <div className="chat-lista-clientes">
        <h2>Mensagens</h2>
        {conversas.map(c => (
          <div 
            key={c.id} 
            className={`chat-item-cliente ${c.id === conversaAtivaId ? "ativo" : ""} ${c.nova ? "nao-lida" : ""}`}
            onClick={() => {
              setConversaAtivaId(c.id);
              c.nova = false; // Retira badge de não lido ao abrir
            }}
          >
            <span className="avatar-cliente-chat">{c.avatar}</span>
            <div className="info-resumo-chat">
              <h4>{c.cliente}</h4>
              <p>{c.ultimaMensagem}</p>
            </div>
            {c.nova && <span className="ponto-mensagem-nova"></span>}
          </div>
        ))}
      </div>

      {/* Janela de conversação direta */}
      <div className="chat-janela-conversa">
        {conversaAtiva ? (
          <>
            <div className="chat-janela-header">
              <h3>{conversaAtiva.avatar} {conversaAtiva.cliente}</h3>
            </div>
            
            <div className="chat-mensagens-corpo">
              {conversaAtiva.historico.map(m => (
                <div key={m.id} className={`balao-mensagem ${m.envio}`}>
                  <p>{m.texto}</p>
                  <span className="balao-horario">{m.horario}</span>
                </div>
              ))}
            </div>

            <form className="chat-input-form" onSubmit={enviarMensagem}>
              <input 
                type="text" 
                value={inputMensagem}
                onChange={(e) => setInputMensagem(e.target.value)}
                placeholder="Digite sua resposta jurídica aqui..." 
              />
              <button type="submit">Enviar</button>
            </form>
          </>
        ) : (
          <div className="chat-sem-selecao">Selecione uma conversa para iniciar.</div>
        )}
      </div>
    </div>
  );
};

export default Mensagens;