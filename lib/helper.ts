export function generateWinnerList(
  sourceList: ItemList,
  count: number
): string[] {
  // Using set for preventing duplicates
  const winnerSet: Set<string> = new Set();

  const maxFreq = Object.values(sourceList).reduce((prev, curr) => prev + curr);

  // Generate random index and push value based on it
  while (winnerSet.size < count) {
    const index = Math.floor(Math.random() * maxFreq) + 1;

    let acc = 0;
    for (const key of Object.keys(sourceList)) {
      acc += sourceList[key];
      if (acc >= index) {
        winnerSet.add(key);
        break;
      }
    }
  }

  return Array.from(winnerSet);
}

export type ItemList = {
  [key: string]: number;
};
