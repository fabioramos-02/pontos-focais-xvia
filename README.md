# Pontos focais XVIA — SETDIG

Página para a equipe XVIA saber **quem acionar e como**: pedidos de TI (DBA, Infra, VPN, MS Digital) já saem com os observadores em cópia, e os pontos focais das secretarias ficam a um clique no WhatsApp.
Feita com o [Design System MS](https://designsystem.digital.ms.gov.br) e protegida por senha.

## Onde fica o conteúdo

| Arquivo | No git? |
|---|---|
| `data/contatos.json` — contatos reais | **Não** (repo é público) |
| `data/contatos.exemplo.json` — mesmo formato, dados fictícios | Sim. Usado quando o real não existe |

**Adicionar ponto focal:** inclua um item em `focais` no `data/contatos.json` (`nome`, `orgao`, `icone`, `assunto`, `telefone`) e publique de novo.
Ícones disponíveis: `medkit`, `car`, `globe`, `building`, `briefcase`, `users`... (lista em `@plataforma-xvia/ds-icons`).

## Rodar

Precisa estar na rede do governo (ou VPN) com o token do `gitlabs.ms.gov.br` no seu `~/.npmrc` — mesmo passo a passo do [teste-design](https://github.com/fabioramos-02/teste-design).

```bash
npx.cmd -y pnpm@10 install
```

```bash
npx.cmd -y pnpm@10 dev
```

## Publicar

```bash
setx SITE_SENHA "senha-do-site"
```

```bash
npx.cmd -y pnpm@10 run deploy
```

Gera o site, criptografa cada página com a senha (StatiCrypt) e envia para a branch `gh-pages`.
