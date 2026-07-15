# Micro-commerce 🛒
> Uma solução moderna de microserviços para cadastro de produtos, gestão de pedidos e notificações integradas.

---

<p align="center">
  <img src="https://img.shields.io/badge/status-em%20desenvolvimento-orange?style=for-the-badge" alt="Status do Projeto">
  <img src="https://img.shields.io/badge/licen%C3%A7a-MIT-blue?style=for-the-badge" alt="Licença MIT">
  <img src="https://img.shields.io/badge/docker-%232496ED.svg?style=for-the-badge&logo=docker&logoColor=white" alt="Docker">
  <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54" alt="Python">
</p>

O **Micro-commerce** é uma aplicação distribuída baseada em microsserviços projetada para ser escalável, resiliente e de fácil manutenção. O ecossistema é orquestrado por um API Gateway e utiliza mensageria assíncrona para comunicação entre os serviços.

---

## 🛠️ Arquitetura do Sistema

O projeto é dividido em quatro componentes principais:

1. **[api-getway](file:///home/dsalves/documents/workspace/micro-commerce/api-getway)**: Gateway baseado em **Nginx** atuando como ponto de entrada unificado da aplicação, responsável pelo roteamento reverso de requisições para os microsserviços de produtos e pedidos.
2. **[product-service](file:///home/dsalves/documents/workspace/micro-commerce/product-service)**: API desenvolvida com **Fastify** e **TypeScript** que utiliza **MongoDB** para o gerenciamento e persistência do catálogo de produtos.
3. **[order-service](file:///home/dsalves/documents/workspace/micro-commerce/order-service)**: API desenvolvida com **Fastify** e **TypeScript** que utiliza **PostgreSQL** para o gerenciamento de pedidos e se comunica com o `product-service` para validação e publica eventos de compra no **RabbitMQ**.
4. **[notification-service](file:///home/dsalves/documents/workspace/micro-commerce/notification-service)**: Consumidor desenvolvido em **Python** que escuta eventos na fila do **RabbitMQ** e processa notificações de novas compras em tempo real.

---

## ✨ Funcionalidades

- 🔀 **API Gateway centralizado**: Encaminha requisições dinamicamente para as portas corretas dos serviços de produtos e de pedidos sob a porta unificada `:8080`.
- 📦 **Gestão de Produtos**: Cadastro e consulta de itens com banco de dados NoSQL flexível (MongoDB).
- 🧾 **Processamento de Pedidos**: Registro de novas vendas no banco de dados relacional (PostgreSQL) com verificação de integridade de dados.
- 🔔 **Notificações Assíncronas**: Envio desacoplado e resiliente de notificações de compras concluídas através de mensageria com RabbitMQ e scripts Python.

---

## 🚀 Tecnologias Utilizadas

A stack tecnológica do projeto conta com ferramentas modernas e de alta performance:

- **Linguagens & Frameworks:**
  - ![Fastify](https://img.shields.io/badge/fastify-%23000000.svg?style=flat-square&logo=fastify&logoColor=white) **Fastify** com **TypeScript** (Microsserviços de Produtos e Pedidos)
  - ![Python](https://img.shields.io/badge/python-3670A0?style=flat-square&logo=python&logoColor=ffdd54) **Python 3.10** (Serviço de Notificações)
- **Bancos de Dados & Mensageria:**
  - ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=flat-square&logo=mongodb&logoColor=white) **MongoDB** (Persistência de Produtos)
  - ![PostgreSQL](https://img.shields.io/badge/postgres-%23316192.svg?style=flat-square&logo=postgresql&logoColor=white) **PostgreSQL 15** (Persistência de Pedidos)
  - ![RabbitMQ](https://img.shields.io/badge/RabbitMQ-FF6600?style=flat-square&logo=rabbitmq&logoColor=white) **RabbitMQ** (Mensageria assíncrona)
- **Infraestrutura:**
  - ![Nginx](https://img.shields.io/badge/nginx-%23009639.svg?style=flat-square&logo=nginx&logoColor=white) **Nginx** (Reverse Proxy & API Gateway)
  - ![Docker](https://img.shields.io/badge/docker-%232496ED.svg?style=flat-square&logo=docker&logoColor=white) **Docker & Docker Compose** (Orquestração e conteinerização)

---

## 📋 Pré-requisitos

Para rodar o projeto localmente de forma nativa ou para modificações locais, você precisará de:

- **Node.js** (versão 20 ou superior)
- **Yarn** (gerenciador de pacotes)
- **Python** (versão 3.10 ou superior)
- **Docker & Docker Compose**
- **Nginx** (opcional se rodar fora do Docker)

---

## 🏃 Como Executar o Projeto Localmente

### 1. Clonar o repositório
Comece clonando este repositório para a sua máquina local:
```bash
git clone git@github.com:davisousadev/micro-commerce.git
cd micro-commerce
```

### 2. Instalar dependências locais (Opcional - para modificações e desenvolvimento)

Para modificações nos serviços baseados em **Node.js** (`product-service` e `order-service`):
```bash
# Instalar dependências de Node.js
yarn install
```

Para o serviço de notificações em **Python** (`notification-service`):
```bash
# Criar e ativar um ambiente virtual
python -m venv venv
source venv/bin/activate  # No Windows: venv\Scripts\activate

# Instalar as dependências do Python
pip install -r notification-service/requirements.txt
```

### 3. Executar o build e inicializar os containers Docker
A maneira mais fácil e recomendada de rodar todo o ecossistema com todas as dependências pré-configuradas é utilizando o Docker Compose. Execute o seguinte comando no terminal na raiz do projeto:

```bash
docker-compose up --build
```

Este comando irá baixar as imagens oficiais dos bancos de dados e do RabbitMQ, realizar o build das imagens dos serviços customizados e inicializar todas as aplicações de forma integrada.

### 🌐 Portas expostas localmente
* **API Gateway (Nginx):** [http://localhost:8080](http://localhost:8080)
* **Painel do RabbitMQ (Management):** [http://localhost:15672](http://localhost:15672) (usuário/senha padrão: `guest`/`guest`)
* **MongoDB:** `localhost:27017`
* **PostgreSQL:** `localhost:5432`

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👤 Autor

Desenvolvido por **Davi**. 
Sinta-se à vontade para entrar em contato ou contribuir com o projeto!
