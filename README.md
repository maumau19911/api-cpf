# API de Consulta de CPF

Uma API intermediária para consulta de CPF que pode ser hospedada na Railway.

## Funcionalidades

- Consulta de dados a partir de um CPF
- Interface RESTful simples
- Preparada para deploy na Railway
- Formatação avançada de dados (CPF formatado, nomes capitalizados, etc.)

## Instalação

1. Clone o repositório
2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente (edite o arquivo `.env`):

```
PORT=8080
API_URL=https://consultaapioficial.pro/api/index.php
```

## Uso

### Desenvolvimento local

```bash
npm run dev
```

### Produção

```bash
npm start
```

## Endpoints

### Verificar status da API

```
GET /
```

### Consultar CPF

```
GET /cpf/:cpf
```

Exemplo:

```
GET /cpf/72312947900
```

Resposta:

```json
{
  "cpf": "72312947900",
  "cpfFormatado": "723.129.479-00",
  "nome": "Edineusa Martins Da Silva Dos Santos",
  "PrimeiroNome": "Edineusa",
  "nascimento": "29/04/1969",
  "mae": "Carmelita Martins Da Silva",
  "sexo": "Feminino",
  "cns": "72312947900",
  "disclaimer": ""
}
```

## Deploy na Railway

1. Faça o login na [Railway](https://railway.app/)
2. Crie um novo projeto
3. Conecte ao seu repositório Git
4. A Railway vai detectar automaticamente o Node.js e fazer o deploy
5. Configure as variáveis de ambiente no painel da Railway
