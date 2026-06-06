// src/components/Login.js
import React, { useState } from "react";


const Login = ({ onLogin }) => {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const handleSubmit = (e) => {
  e.preventDefault();

  // Validação estrita
  if (usuario === "admin" && senha === "admin123") {
    setErro("");
    onLogin(); // <-- ADICIONE ESTA LINHA AQUI! Ela avisa o App.js que o login deu certo.
  } else {
    setErro("Usuário ou senha incorretos. Tente novamente.");
  }
};

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>IFjuridico</h2>
        <p>Gestão Jurídica Inteligente</p>
        
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="usuario">Usuário</label>
            <input
              type="text"
              id="usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              placeholder="Digite seu usuário (admin)"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Digite sua senha"
              required
            />
          </div>

          {erro && <p className="mensagem-erro">{erro}</p>}

          <button type="submit" className="btn-login">Entrar</button>
        </form>
      </div>
    </div>
  );
};

export default Login;