export type ArrayElement<T extends any[]> = T extends (infer U)[] ? U : never;

function lines(text: string) {
  return text.split('\n');
}

export function csvToArray(csv: string) {
  return lines(csv).map((line) => line.split('\t'));
}
