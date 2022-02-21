export function generateWinnerList(
  sourceList: ItemMap,
  count: number
): string[] {
  if (sourceList.size === 0 || count <= 0) return [];
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

export type ItemMap = Map<string, number>;

export function sortMapByKey(sourceObject: ItemMap) {
  return new Map([...sourceObject.entries()].sort());
}

export function sortMapByValue(sourceObject: ItemMap) {
  return new Map([...sourceObject.entries()].sort((a, b) => b[1] - a[1]));
}
