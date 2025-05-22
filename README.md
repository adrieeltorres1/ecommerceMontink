# Ecommerce Básico

Este é um projeto simples de e-commerce desenvolvido com React e Tailwind CSS. Ele permite que o usuário selecione características de um produto (como cor e tamanho), verifica a disponibilidade de entrega usando o CEP. 

## Funcionalidades

- **Seleção de cor e tamanho:** O usuário pode escolher entre diferentes opções de cor (Branca e Preta) e tamanho (P, M, G, GG).
- **Troca de imagem:** Ao clicar nas miniaturas das imagens, a imagem principal do produto é alterada.
- **Verificação de CEP:** O usuário pode inserir um CEP para verificar se a entrega está disponível para seu endereço, com dados recuperados via API ViaCEP.
- **Persistência de dados:** As seleções feitas pelo usuário (imagem, cor, tamanho e CEP) são salvas no `localStorage` por 15 minutos, para garantir uma melhor experiência de compra caso o usuário saia da página.

## Como rodar o projeto

1. Clone o repositório:
   ```bash
   git clone https://github.com/adrieeltorres1/ecommerceMontink.git

2. Entrar na pasta:
   ```bash
   cd ecommerceMontink

3. Rodar o projeto:
   ```bash
   npm run dev

## 🔎 Visualização do Projeto
![](mockup.png)