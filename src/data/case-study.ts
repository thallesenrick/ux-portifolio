import { spanish } from "../lib/spanish";
export type CaseCopy={pt:string;en:string;es:string};
export const copy=(pt:string,en:string):CaseCopy=>({pt,en,es:spanish(en)});
export type CaseScreen={src:string;label:CaseCopy;width?:number;height?:number};
