import dictionary from "./es.json";

const copy: Record<string, string> = dictionary;
export const spanish = (text: string): string => copy[text] ?? text;
