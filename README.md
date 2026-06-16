# Solidarity Connection

Projeto Hackathon Fase 5 - Pós-Tech Arquitetura Sistemas .NET.
Plataforma de arrecadação solidária baseada em microsserviços, mensageria e processamento assíncrono.
O sistema permite o gerenciamento de campanhas beneficentes, cadastro de doadores e processamento de doações utilizando SQL Server, MongoDB e RabbitMQ.

---

# Arquitetura

```text
┌─────────────────────┐
│   Solidarity.Api    │
└──────────┬──────────┘
           │
           │ SQL Server
           ▼
┌─────────────────────┐
│ Campaigns / Users   │
└─────────────────────┘

           │
           │ MongoDB
           ▼
┌─────────────────────┐
│     Donations       │
└─────────────────────┘

           │
           │ RabbitMQ
           ▼
┌─────────────────────┐
│ DonationReceived    │
│      Event          │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Solidarity.Worker   │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Update TotalRaised  │
└─────────────────────┘
```

---

# Tecnologias Utilizadas

- .NET 10
- ASP.NET Core Web API
- Entity Framework Core
- SQL Server
- MongoDB
- RabbitMQ
- JWT Authentication
- Swagger
- Docker
- Docker Compose

---

# Estrutura da Solução

```text
SolidarityConnection

├── Solidarity.Api
├── Solidarity.Application
├── Solidarity.Domain
├── Solidarity.Infrastructure
├── Solidarity.Shared
├── Solidarity.Worker
└── docker-compose.yml
```

---

# Perfis de Usuário

## NgoManager

Responsável pelo gerenciamento de campanhas.
Permissões:
- Criar campanhas;
- Atualizar campanhas;
- Cancelar campanhas;

---

## Donor

Responsável por realizar doações.
Permissões:
- Consultar campanhas;
- Realizar doações;

---

# Requisitos

## Docker Desktop

Instalar:
https://www.docker.com/products/docker-desktop/

Verificar:

```bash
docker --version
docker compose version
```

---

## .NET SDK

Instalar:
https://dotnet.microsoft.com/download

Verificar:

```bash
dotnet --version
```

---

# Executando o Ambiente

Na raiz do projeto:

```bash
docker compose up -d
```

Verificar:

```bash
docker ps
```

Containers esperados:

```text
solidarity-sqlserver
solidarity-mongodb
solidarity-rabbitmq
```

---

# RabbitMQ Management

URL:
http://localhost:15672

Usuário:

```text
guest
```

Senha:

```text
guest
```

---

# Configuração da Base SQL

Aplicar migrations:

```bash
dotnet ef database update \
--project Solidarity.Infrastructure \
--startup-project Solidarity.Api
```

---

# Executando a API

```bash
dotnet run --project Solidarity.Api
```

Swagger:

```text
http://localhost:5131/swagger
```

---

# Executando o Worker

Em outro terminal:

```bash
dotnet run --project Solidarity.Worker
```

---

# Usuário Seed

O sistema cria automaticamente um gestor inicial.

Email:

```text
manager@solidarity.com
```

Senha:

```text
123456
```

Role:

```text
NgoManager
```

---

# Fluxo de Autenticação

## Registrar usuário

POST

```http
/api/auth/register
```

Exemplo:

```json
{
  "fullName": "Teste",
  "email": "teste@fiap.com.br",
  "cpf": "12345678901",
  "password": "123456"
}
```

---

## Login

POST

```http
/api/auth/login
```

Exemplo:

```json
{
  "email": "teste@fiap.com.br",
  "password": "123456"
}
```

Retorno:

```json
{
  "token": "JWT_TOKEN"
}
```

---

# Campanhas

## Criar Campanha

POST

```http
/api/campaigns
```

Role necessária:

```text
NgoManager
```

Exemplo:

```json
{
  "title": "Exemplo de Campanha",
  "description": "Descrição do Exemplo de Campanha",
  "startDate": "2026-06-20T00:00:00",
  "endDate": "2026-07-20T00:00:00",
  "financialGoal": 10000
}
```

---

## Listar Campanhas

GET

```http
/api/campaigns
```

---

## Campanhas Ativas

GET

```http
/api/campaigns/active
```

Retorna:
- Title;
- FinancialGoal;
- TotalRaised;

---

# Doações

## Criar Doação

POST

```http
/api/donations
```

Role necessária:

```text
Donor
```

Exemplo:

```json
{
  "campaignId": "GUID",
  "amount": 50
}
```

---

# Fluxo Assíncrono

Ao receber uma doação:

1. API valida a campanha;
2. API grava a doação no MongoDB;
3. API publica evento no RabbitMQ;
4. Worker consome o evento;
5. Worker atualiza o TotalRaised da campanha;

---

# Banco SQL Server

Tabelas:

```text
Users
Campaigns
```

---

# Banco MongoDB

Coleções:

```text
donations
```

---

# Mensageria

Fila:

```text
donation-received
```

Evento:

```text
DonationReceivedEvent
```

---

# Teste Completo

## Passo 1

Login como gestor.

## Passo 2

Criar campanha.

## Passo 3

Registrar novo doador.

## Passo 4

Login com doador.

## Passo 5

Realizar doação.

## Passo 6

Verificar:

- MongoDB recebeu a doação;
- RabbitMQ processou a fila;
- Worker atualizou o TotalRaised;

---

# Autores

Projeto acadêmico desenvolvido para demonstração de arquitetura baseada em microsserviços, mensageria e processamento assíncrono utilizando .NET.
Alunos: Pedro, Tony, Diego e Gustavo.
Curso: Pós-Tech Arquitetura Sistemas .NET.
Projeto: Hackathon Fase 5.