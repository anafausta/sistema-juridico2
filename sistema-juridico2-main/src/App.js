import React, { useState, useEffect } from "react";
import Topo from "./components/Topo";
import Rodape from "./components/Rodape";

// Importação das páginas de gerenciamento e listagem
import Home from "./components/Home";
import Advogados from "./components/Advogados";
import Clientes from "./components/Clientes";
import Processos from "./components/Processos";
import NotFound from "./components/NotFound";
import Navegacao from "./components/Navegacao";
import Login from "./components/Login"; 
import Mensagens from "./components/Mensagens"; 
import Relatorio from "./components/Relatorio"; // <-- Adicione este import

import axios from "axios";
import "./index.css";
import {Routes, Route } from "react-router-dom";

const App = () => {
  // 1. Definição dos estados do sistema
  const [clientes, setClientes] = useState([]);
  const [advogados, setAdvogados] = useState([]);
  const [processos, setProcessos] = useState([]);
  const [conversas, setConversas] = useState([]); // Estado para o chat
  const [notificacoes, setNotificacoes] = useState([]); // Estado global de notificações
  
  // Estado para controlar se o usuário está logado
  const [autenticado, setAutenticado] = useState(false);

  // 2. Busca os dados operacionais das APIs locais
  useEffect(() => {
    // Só busca os dados do sistema se o usuário estiver autenticado
    if (!autenticado) return;

    const buscarDadosDoSistema = async () => {
      try {
        const [resClientes, resAdvogados, resProcessos, resMensagens] = await Promise.all([
          axios.get("/api/clientes.json"),
          axios.get("/api/advogados.json"),
          axios.get("/api/processos.json"),
          axios.get("/api/mensagens.json")
        ]);

        setClientes(resClientes.data);
        setAdvogados(resAdvogados.data);
        setProcessos(resProcessos.data);
        setConversas(resMensagens.data);

        // Gera os alertas iniciais no sininho para conversas marcadas como novas
        const alertasIniciais = resMensagens.data
          .filter(c => c.nova)
          .map(c => ({
            id: `msg-${c.id}`,
            texto: `Nova mensagem de ${c.cliente}: "${c.ultimaMensagem.substring(0, 25)}..."`,
            lida: false
          }));
        setNotificacoes(alertasIniciais);

      } catch (error) {
        console.error("Erro ao carregar os dados operacionais do sistema:", error);
        
        const elementoPrincipal = document.querySelector(".principal-dashboard");
        if (elementoPrincipal) {
          elementoPrincipal.insertAdjacentHTML(
            "beforeend",
            "<p class='erro'>Mensagem de erro: Não foi possível carregar as informações do painel.</p>"
          );
        }
      }
    };

    buscarDadosDoSistema();
  }, [autenticado]);

  // 3. Simulador de Mensagens recebidas em tempo real (Roda a cada 20 segundos)
  useEffect(() => {
    if (!autenticado || conversas.length === 0) return;

    const intervaloSimulacao = setInterval(() => {
      const textoSimulado = "Doutor, preciso agendar uma reunião para assinar o contrato.";
      
      setConversas(prevConversas => 
        prevConversas.map(c => {
          if (c.id === 3) { // Simula que o cliente Thiago Galvão mandou uma nova mensagem
            return {
              ...c,
              historico: [...c.historico, { id: Date.now(), envio: "cliente", texto: textoSimulado, horario: "Agora" }],
              ultimaMensagem: textoSimulado,
              nova: true
            };
          }
          return c;
        })
      );

      // Injeta um novo alerta de notificação instantaneamente no Topo
      setNotificacoes(prev => [
        {
          id: Date.now(),
          texto: `Mensagem de Thiago Galvão: "${textoSimulado.substring(0, 25)}..."`,
          lida: false
        },
        ...prev
      ]);

    }, 20000); // 20 segundos

    return () => clearInterval(intervaloSimulacao);
  }, [autenticado, conversas.length]);

  // Condicional: Se não estiver autenticado, mostra apenas a tela de login
  if (!autenticado) {
    return <Login onLogin={() => setAutenticado(true)} />;
  }

  // Se estiver autenticado, carrega todo o ecossistema do Dashboard
  return (
      <div className="layout-aplicacao">
        {/* Menu Lateral Fixo à Esquerda */}
        <Navegacao />

        {/* Bloco de Conteúdo à Direita (Header + Páginas Dinâmicas) */}
        <div className="layout-conteudo-principal">
          {/* Topo sincronizado recebendo as notificações e seu modificador de estado */}
          <Topo notificacoes={notificacoes} setNotificacoes={setNotificacoes} />
          
          <div className="conteudo-dinamico-paginas">
            <Routes>
              <Route path="/" element={<Home processos={processos} clientes={clientes} advogados={advogados} />} />
              <Route path="/processos" element={<Processos processos={processos} clientes={clientes} advogados={advogados} />} />
              <Route path="/clientes" element={<Clientes clientes={clientes} />} />
              <Route path="/advogados" element={<Advogados advogados={advogados} />} />
              
              <Route path="/relatorios" element={<Relatorio processos={processos} />} />
              {/* Rota da sua nova Central de Mensagens */}
              <Route path="/mensagens" element={<Mensagens conversas={conversas} setConversas={setConversas} />} />
              
             <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Rodape />
        </div>
      </div>
  );
};

export default App;