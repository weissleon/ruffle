export function parseInput(sourse: string): [string, number][] | any[] {
  const arr: [string, number][] = [];

  sourse.split(/\s*,/);
  //   let isInsideQuote = false;
  //   let wordArr: string[] = [];
  //   for (const ch of sourse) {
  //     if (ch === '"') {
  //       isInsideQuote = !isInsideQuote;
  //       continue;
  //     }

  //     if (ch === "," && !isInsideQuote && wordArr.length !==0) arr.push([wordArr.join(""), 1]);
  //   }

  return arr;
}
