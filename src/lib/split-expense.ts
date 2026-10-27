/** Allocate integer cents without losing money to floating-point rounding. */
export function splitExpense(cents:number,participants:number[]):Record<number,number> {
  if(!Number.isSafeInteger(cents) || cents<0 || !participants.length)throw new Error("Invalid expense");
  const ids=[...new Set(participants)].sort((a,b)=>a-b);
  const base=Math.floor(cents/ids.length),remainder=cents%ids.length;
  return Object.fromEntries(ids.map((id,index)=>[id,base+(index<remainder ? 1 : 0)]));
}
