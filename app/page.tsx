// Server Component: tudo sai pronto no HTML, nada vai para o JS do cliente
import { DsBadge, DsButton, DsCard, DsPageHeader, DsSectionHeading, DsSteps } from "@plataforma-xvia/ds-react/server";
import { contatos as c, type Fila } from "./contatos";

const cc = c.observadores.map((o) => o.email).join(",");

const CORPO = `Olá,

O que precisamos:

Sistema e ambiente (produção, homologação...):

Prazo:

Contato de quem pediu (nome e telefone):
`;

// ponytail: mailto tem limite de ~2000 caracteres; o modelo é curto de propósito
const mailto = (f: Fila) =>
  `mailto:${f.email}?cc=${cc}&subject=${encodeURIComponent(`[XVIA] ${f.nome} — `)}&body=${encodeURIComponent(CORPO)}`;

const whatsapp = (telefone: string) => `https://wa.me/${telefone.replace(/\D/g, "")}`;

const DADOS = [
  "Nome completo",
  "Nome social (se tiver)",
  "CPF",
  "Telefone pessoal",
  "E-mail pessoal",
  "Cidade",
  "Setor (ex.: XVia/Desenvolvimento)",
  "Cargo",
  "Tipo de usuário",
  "Empresa",
  "IP da máquina que vai acessar os ambientes do governo",
];

const ACESSOS = [
  "VPN",
  "E-mail institucional",
  "TFS / Azure DevOps",
  "Sistemas específicos do órgão",
  "Outros ambientes que o trabalho exigir",
];

const PASSOS = JSON.stringify([
  { title: "Escolha o assunto", description: "Veja abaixo qual equipe cuida do que você precisa." },
  { title: "Clique em “Abrir pedido”", description: "O e-mail abre pronto, com as cópias e um modelo para preencher." },
  { title: "Preencha e envie", description: "Confira se as 4 pessoas estão em cópia antes de enviar." },
]);

export default function Pagina() {
  return (
    <>
      <div className="section section--muted">
        <div className="wrap">
          <DsPageHeader
            eyebrow="Guia para a equipe XVIA"
            heading="Precisa de algo? Veja quem acionar"
            description="Abra seu pedido direto com a equipe certa. Não precisa passar por outra pessoa."
            icon="users"
          />
        </div>
      </div>

      <section className="section">
        <div className="wrap">
          <DsCard heading="Regra: todo pedido vai com estas 4 pessoas em cópia" headingLevel="2" icon="alert-circle" tone="warning">
            <p>Coloque sempre em cópia (CC). O botão “Abrir pedido” já faz isso para você.</p>
            <ul className="pessoas">
              {c.observadores.map((o) => (
                <li key={o.email}>
                  <strong>{o.nome}</strong> <span className="muted">{o.email}</span>
                </li>
              ))}
            </ul>
          </DsCard>
          <div className="passos">
            <DsSectionHeading heading="Como pedir" headingLevel="2" />
            <DsSteps items={PASSOS} />
          </div>
        </div>
      </section>

      <section className="section section--muted" id="ti">
        <div className="wrap">
          <DsSectionHeading heading="Pedidos de TI" headingLevel="2" />
          <p className="muted">O e-mail enviado para a equipe abre um chamado no suporte.ms.gov.br.</p>
          <div className="grid">
            {c.filas.map((f) => (
              <DsCard key={f.email} heading={f.nome} headingLevel="3" icon={f.icone}>
                <p>{f.quando}</p>
                <p className="muted email">{f.email}</p>
                <div slot="footer" className="acoes">
                  <DsButton href={mailto(f)} icon="mail" variant="primary" fullWidth>
                    Abrir pedido
                  </DsButton>
                </div>
              </DsCard>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="acessos">
        <div className="wrap">
          <DsSectionHeading heading="Acesso para novo colaborador da fábrica" headingLevel="2" />
          <p className="muted">
            Para criar o usuário e liberar os ambientes do Governo de MS, a empresa envia os dados de cada pessoa. O acesso só
            sai quando tudo chega completo.
          </p>
          <div className="grid grid--3">
            <DsCard heading="1. Dados de cada colaborador" headingLevel="3" icon="id-card">
              <ul className="lista">
                {DADOS.map((d) => <li key={d}>{d}</li>)}
              </ul>
            </DsCard>
            <DsCard heading="2. Acessos que a pessoa vai usar" headingLevel="3" icon="shield">
              <p>O gestor do projeto informa o que cada colaborador precisa. Por exemplo:</p>
              <ul className="lista">
                {ACESSOS.map((a) => <li key={a}>{a}</li>)}
              </ul>
            </DsCard>
            <DsCard heading="3. Para quem enviar" headingLevel="3" icon="mail" tone="info">
              <p>
                Envie tudo para a <strong>Andréia</strong>, secretária do time de desenvolvimento coordenado pelo
                <strong> Sandro</strong>.
              </p>
              <p className="muted">
                CPF, telefone e e-mail pessoal são dados pessoais. Envie só por e-mail, nunca em grupo de conversa.
              </p>
            </DsCard>
          </div>
        </div>
      </section>

      <section className="section section--muted" id="focais">
        <div className="wrap">
          <DsSectionHeading heading="Pontos focais das secretarias" headingLevel="2" />
          <p className="muted">Fale direto com a pessoa responsável pelo assunto.</p>
          <div className="grid">
            {c.focais.map((p) => (
              <DsCard key={p.nome} heading={p.nome} headingLevel="3" icon={p.icone}>
                <DsBadge tone="primary" size="sm">{p.orgao}</DsBadge>
                <p>{p.assunto}</p>
                <p className="muted email">{p.telefone ?? p.email}</p>
                <div slot="footer" className="acoes">
                  {p.telefone && (
                    <DsButton href={whatsapp(p.telefone)} target="_blank" rel="noopener" icon="whatsapp" variant="success" fullWidth>
                      Chamar no WhatsApp
                    </DsButton>
                  )}
                  {p.email && (
                    <DsButton href={`mailto:${p.email}?cc=${cc}`} icon="mail" variant="secondary" fullWidth>
                      Enviar e-mail
                    </DsButton>
                  )}
                </div>
              </DsCard>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <DsCard heading="Conversa do time" headingLevel="2" icon="chat">
            <p>Dúvidas rápidas e avisos ficam no canal ti-xvia do Mattermost.</p>
            <DsButton href={c.mattermost} target="_blank" rel="noopener" icon="external-link" iconPosition="end" variant="secondary">
              Abrir canal ti-xvia
            </DsButton>
          </DsCard>
        </div>
      </section>

      <p className="wrap muted fonte">Atualizado em {c.atualizado}.</p>
    </>
  );
}
