import type { Metadata } from "next";
import { DS_FALLBACK_CSS } from "@plataforma-xvia/ds-core/fallback-css";
import { DS_THEMES_CSS, DS_TOKENS_CSS } from "@plataforma-xvia/ds-tokens/css-text";
import {
  DsAccessibilityBar,
  DsFooter,
  DsHeader,
  DsIcon,
  DsNavbar,
} from "@plataforma-xvia/ds-react/server";
import "./app.css";
import { href } from "./href";

const CRITICAL_CSS = `${DS_TOKENS_CSS}\n${DS_THEMES_CSS}\n${DS_FALLBACK_CSS}`;

const NAV = JSON.stringify([
  { label: "Início", href: href("/"), icon: "home" },
  { label: "Pedidos de TI", href: href("/#ti"), icon: "mail" },
  { label: "Pontos focais", href: href("/#focais"), icon: "users" },
]);

export const metadata: Metadata = {
  title: "Pontos focais XVIA · SETDIG",
  description: "Quem acionar e como abrir pedidos de TI no projeto X-VIA.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR">
      <head>
        <style dangerouslySetInnerHTML={{ __html: CRITICAL_CSS }} />
      </head>
      <body>
        <header>
          <DsAccessibilityBar
            links={JSON.stringify([
              { label: "Ir para conteúdo", href: "#conteudo" },
              { label: "Ir para rodapé", href: "#rodape" },
            ])}
          />
          <DsHeader homeHref={href("/")} homeLabel="Início — Pontos focais XVIA" navItems={NAV}>
            <span slot="brand" className="brand">
              <DsIcon name="shield" size="xl" />
              <span>
                <strong>Projeto X-VIA</strong>
                <small>SETDIG · Pontos focais</small>
              </span>
            </span>
          </DsHeader>
          <DsNavbar label="Navegação principal" items={NAV} autoCurrent />
        </header>

        <main id="conteudo">{children}</main>

        <DsFooter
          id="rodape"
          columns={JSON.stringify([
            {
              heading: "Governo de MS",
              links: [
                { label: "ms.gov.br", href: "https://www.ms.gov.br" },
                { label: "SETDIG", href: "https://www.setdig.ms.gov.br" },
              ],
            },
          ])}
          bottomLinks={JSON.stringify([{ label: "Uso interno — acesso restrito", href: "#" }])}
        >
          <div slot="address">
            <strong>Secretaria-Executiva de Transformação Digital — SETDIG</strong>
            <br />
            Guia de contatos do projeto X-VIA.
          </div>
          <span slot="brand">
            <DsIcon name="shield" size="xl" label="Estado de Mato Grosso do Sul" />
          </span>
          <span slot="bottom-start">SETDIG | Secretaria-Executiva de Transformação Digital</span>
        </DsFooter>
      </body>
    </html>
  );
}
