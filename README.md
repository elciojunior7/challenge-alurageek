# AluraGeek

Projeto relativo ao 3º challenge frontend Alura - Plataforma de produtos AluraGeek - cadastro de produtos (CRUD completo a partir de área logada) e visualização dos mesmos.
O challenge consiste no desenvolvimento de features disponibilizadas semanalmente no Trello, com layout disponibilizado no Figma, e ao final de um mês, consolidar em uma aplicação dentro do escopo estabelecido.

[Link do desafio](https://www.alura.com.br/challenges/front-end-3?host=https://cursos.alura.com.br)!

## 🛠️ Tecnologias e técnicas

- HTML
- CSS (BEM, flex, grid)
- Angular 11.2.2 com TypeScript (rotas, ngx-loading...)
  - ngx-env/builder (para permitir uso de variaveis de ambiente de servidor pela Angular
  - ngx-loading (loading durante requests)
  - ngx-mask (mácara de campos)
  - @angular/forms (FormControl, Validators para controle de validação de campos required, RegEx, etc)
  - @fortawesome/angular-fontawesome (icons)
  - AuthGuard e canActivate (para impedir acesso às rotas ADM sem ter feito login)
- Supabase (backend e banco de dados)
- Node.js/ npm

## 🏠 Executar localmente

> Comando `npm start` para rodar localmente. Acesso em `http://localhost:4200/`.

## 🌎 Acesso online

[https://challenge-alurageek.vercel.app/](https://challenge-alurageek.vercel.app/)


## 👉 Ícones usados neste Readme.md

[Emojipedia](https://emojipedia.org/)

<div align="center">
  <img style="width: 200px;" src="./src/assets/img/Logo.png" alt="Logo AluraGeek" />
</div>
