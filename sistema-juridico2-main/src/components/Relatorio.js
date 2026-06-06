import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const Relatorio = ({ processos }) => {
  const contarStatus = () => {
    let concluido = 0;
    let pendente = 0;
    let andamento = 0;

    if (processos?.length) {
      processos.forEach((p) => {
        const status = p.status?.toLowerCase() || "";

        if (
          status.includes("concluído") ||
          status.includes("concluido")
        ) {
          concluido++;
        } else if (status.includes("pendente")) {
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

  const dadosGrafico = {
    labels: [
      "Concluídos",
      "Pendentes de Julgamento",
      "Em Andamento",
    ],
    datasets: [
      {
        data: [concluido, pendente, andamento],
        backgroundColor: [
          "#2ecc71",
          "#e67e22",
          "#3498db",
        ],
        borderColor: "#ffffff",
        borderWidth: 3,
      },
    ],
  };

  const opcoesGrafico = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const valor = context.raw || 0;
            const porcentagem =
              total > 0
                ? ((valor / total) * 100).toFixed(1)
                : 0;

            return `${context.label}: ${valor} (${porcentagem}%)`;
          },
        },
      },
    },
  };

  return (
    <main className="principal-dashboard">
      <div className="relatorio-container">

        <div className="relatorio-header">
          <h2>Relatórios e Indicadores</h2>
          <p>
            Análise gráfica da distribuição de status de todos os
            processos cadastrados.
          </p>
        </div>

        <div className="relatorio-grid">

          <div className="resumo-operacional">
            <h3>Resumo Operacional</h3>

            <div className="resumo-item">
              <span className="resumo-label">
                Total Geral
              </span>
              <span className="resumo-valor">
                {total}
              </span>
            </div>

            <div className="resumo-item">
              <span
                className="resumo-label"
                style={{ color: "#2ecc71" }}
              >
                ● Concluídos
              </span>
              <span className="resumo-valor">
                {concluido}
              </span>
            </div>

            <div className="resumo-item">
              <span
                className="resumo-label"
                style={{ color: "#e67e22" }}
              >
                ● Pendentes
              </span>
              <span className="resumo-valor">
                {pendente}
              </span>
            </div>

            <div className="resumo-item">
              <span
                className="resumo-label"
                style={{ color: "#3498db" }}
              >
                ● Em Andamento
              </span>
              <span className="resumo-valor">
                {andamento}
              </span>
            </div>
          </div>

          <div className="grafico-container">
            <h3 className="grafico-titulo">
              Distribuição por Status
            </h3>

            <div className="grafico-wrapper">
              {total > 0 ? (
                <Doughnut
                  data={dadosGrafico}
                  options={opcoesGrafico}
                />
              ) : (
                <p className="grafico-vazio">
                  Nenhum dado disponível para gerar o gráfico.
                </p>
              )}
            </div>
          </div>

        </div>
      </div>
    </main>
  );
};

export default Relatorio;