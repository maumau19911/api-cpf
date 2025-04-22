require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 8080;
// Garantir que a URL base da API está correta
const API_URL =
  process.env.API_URL || "https://consultaapioficial.pro/api/index.php";

// Middleware
app.use(cors());
app.use(express.json());

// Função para formatar CPF (XXX.XXX.XXX-XX)
function formatarCPF(cpf) {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

// Função para formatar nome (capitalizar)
function formatarNome(nome) {
  return nome
    .toLowerCase()
    .split(" ")
    .map((palavra) => palavra.charAt(0).toUpperCase() + palavra.slice(1))
    .join(" ");
}

// Rota principal
app.get("/", (req, res) => {
  res.json({ message: "API de consulta de CPF funcionando!" });
});

// Rota para consulta de CPF
app.get("/cpf/:cpf", async (req, res) => {
  try {
    const { cpf } = req.params;

    // Validação básica do CPF (apenas dígitos)
    if (!/^\d+$/.test(cpf)) {
      return res
        .status(400)
        .json({ error: "CPF inválido. Forneça apenas números." });
    }

    // Log para debug
    console.log(`Consultando CPF: ${cpf}`);
    console.log(`URL da API: ${API_URL}?modulo=cpf&cpf=${cpf}`);

    // Faz a requisição para a API externa com URL absoluta
    const response = await axios.get(`${API_URL}?modulo=cpf&cpf=${cpf}`);

    const dadosOriginais = response.data;

    // Criar objeto com o formato solicitado
    const dadosFormatados = {
      cpf: dadosOriginais.cpf,
      cpfFormatado: formatarCPF(dadosOriginais.cpf),
      nome: formatarNome(dadosOriginais.nome),
      PrimeiroNome: formatarNome(dadosOriginais.nome).split(" ")[0],
      nascimento: dadosOriginais.nascimento,
      mae: formatarNome(dadosOriginais.mae),
      sexo: formatarNome(dadosOriginais.sexo),
      cns: dadosOriginais.cns,
      disclaimer: dadosOriginais.disclaimer,
    };

    // Retorna os dados formatados
    return res.json(dadosFormatados);
  } catch (error) {
    console.error("Erro ao consultar CPF:", error.message);
    console.error("Detalhes completos do erro:", error);
    return res.status(500).json({
      error: "Erro ao consultar o CPF",
      message: error.message,
      detalhes: error.response?.data || "Sem detalhes adicionais",
    });
  }
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`URL da API externa configurada: ${API_URL}`);
});
