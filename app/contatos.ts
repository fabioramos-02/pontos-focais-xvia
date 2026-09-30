// Lê os contatos no build. O real (data/contatos.json) fica fora do git; sem ele, usa o exemplo.
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

export type Pessoa = { nome: string; email: string };
export type Fila = { nome: string; icone: string; quando: string; email: string };
export type Focal = { nome: string; orgao: string; icone: string; assunto: string; telefone: string };
export type Contatos = { atualizado: string; observadores: Pessoa[]; filas: Fila[]; focais: Focal[]; mattermost: string };

const real = join(process.cwd(), "data", "contatos.json");
const file = existsSync(real) ? real : join(process.cwd(), "data", "contatos.exemplo.json");

export const contatos: Contatos = JSON.parse(readFileSync(file, "utf8"));
