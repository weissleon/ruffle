export function generateWinnerList(
  sourceList: ItemList,
  count: number
): string[] {
  // Using set for preventing duplicates
  const winnerSet: Set<string> = new Set();

  const maxFreq = Array.from(sourceList.values()).reduce(
    (prev, curr) => prev + curr
  );

  // Generate random index and push value based on it
  while (winnerSet.size < count) {
    const index = Math.floor(Math.random() * maxFreq) + 1;

    let acc = 0;
    for (const [key, value] of sourceList.entries()) {
      acc += value;
      if (acc >= index) {
        winnerSet.add(key);
        break;
      }
    }
  }

  return Array.from(winnerSet);
}

export type ItemList = Map<string, number>;

export function sortMapByKey(sourceObject: ItemList) {
  return new Map([...sourceObject.entries()].sort());
}

export function sortMapByValue(sourceObject: ItemList) {
  return new Map([...sourceObject.entries()].sort((a, b) => b[1] - a[1]));
}
