export type CaseCopy={pt:string;en:string};
export const copy=(pt:string,en:string):CaseCopy=>({pt,en});
export type CaseScreen={src:string;label:CaseCopy;width?:number;height?:number};
