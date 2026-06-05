import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

// Registra os componentes necessários do Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const Relatorio = ({ processos }) => {
  // 1. Contagem dinâmica dos status baseada no array de processos
  const contarStatus = () => {
    let concluido = 0;
    let pendente = 0;
    let andamento = 0;

    if (processos && processos.length > 0) {
      processos.forEach((p) => {
        const statusFormatado = p.status ? p.status.toLowerCase() : "";

        if (statusFormatado.includes("concluído") || statusFormatado.includes("concluido")) {
          concluido++;
        } else if (statusFormatado.includes("pendente")) {
          pendente++;
        } else {
          andamento++;
        }
      });
    }

    return { concluido, pendente, andamento };
  };

  const { concluido, pendente, andamento } = contarStatus();
  const total = concluido + pendente + andamento;

  // 2. Configuração dos dados estruturais que alimentam o gráfico
  const dadosGrafico = {
    labels: ["Concluídos", "Pendentes de Julgamento", "Em Andamento"],
    datasets: [
      {
        label: "Quantidade de Processos",
        data: [concluido, pendente, andamento],
        backgroundColor: [
          "#2ecc71", // Verde
          "#e67e22", // Laranja
          "#3498db"  // Azul
        ],
        borderColor: ["#ffffff", "#ffffff", "#ffffff"],
        borderWidth: 2,
        cutout: "70%", // Cria o efeito de rosca vazada no meio
      },
    ],
  };

  // 3. Opções visuais do Gráfico (CORRIGIDO)
  const opcoesGrafico = {
    responsive: true,
    maintainAspectRatio: false, // Permite que ele respeite a altura fixa da div pai
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          font: {
            size: 13,
            family: "Arial"
          },
          padding: 15,
          usePointStyle: true,
        }
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const valor = context.raw || 0;
            const porcentagem = total > 0 ? ((valor / total) * 100).toFixed(1) : 0;
            return ` ${context.label}: ${valor} (${porcentagem}%)`;
          }
        }
      }
    }
  };

  return (
    <main className="principal-dashboard">
      <div className="tabela-header-acoes">
        <div className="tabela-titulos">
          <h2>Relatórios e Indicadores</h2>
          <p>Análise gráfica da distribuição de status de todos os processos cadastrados.</p>
        </div>
      </div>

      {/* Grid Layout Principal */}
      <div className="indicadores-container" style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "20px", marginTop: "20px" }}>
        
        {/* Bloco Lateral com Resumo Numérico */}
        <div className="card-cliente" style={{ padding: "20px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <h3>Resumo Operacional</h3>
          <p style={{ margin: "10px 0" }}><strong>Total Geral:</strong> {total} processos</p>
          <hr style={{ border: "0", borderTop: "1px solid #eee", margin: "10px 0" }} />
          <p style={{ color: "#2ecc71" }}>● Concluídos: <strong>{concluido}</strong></p>
          <p style={{ color: "#e67e22" }}>● Pendentes: <strong>{pendente}</strong></p>
          <p style={{ color: "#3498db" }}>● Em Andamento: <strong>{andamento}</strong></p>
        </div>

        {/* Bloco do Gráfico (CORRIGIDO: CSS de altura e posicionamento limpos para o Canvas) */}
        <div className="card-cliente" style={{ padding: "30px", display: "flex", flexDirection: "column", alignItems: "center", minHeight: "360px" }}>
          <h3 style={{ marginBottom: "20px" }}>Distribuição por Status</h3>
          <div style={{ width: "100%", height: "280px", position: "relative" }}>
            {total > 0 ? (
              <Doughnut data={dadosGrafico} options={opcoesGrafico} />
            ) : (
              <p style={{ textAlign: "center", color: "#999", paddingTop: "100px" }}>Nenhum dado disponível para gerar o gráfico.</p>
            )}
          </div>
        </div>

      </div>
    </main>
  );
};

export default Relatorio;