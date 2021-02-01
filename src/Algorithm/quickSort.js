function partitionWithKey(arr, key, start, end, sortOrder) {
  // Taking the last element as the pivot
  const pivotValue = arr[end][key];
  // console.log("[Track]", arr[end]);

  let pivotIndex = start;
  for (let i = start; i < end; i++) {
    if (
      (arr[i][key] < pivotValue && sortOrder === "asc") ||
      (arr[i][key] > pivotValue && sortOrder === "desc")
    ) {
      // Swapping elements
      [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];
      // Moving to next element
      pivotIndex++;
    }
  }

  // Putting the pivot value in the middle
  [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]];
  return pivotIndex;
}

export function quickSortRecursive(
  key,
  arr,
  sortOrder = "asc",
  start = 0,
  end = arr.length - 1
) {
  // Base case or terminating case
  if (start >= end) {
    return arr;
  }

  let index = partitionWithKey(arr, key, start, end, sortOrder);
  // Recursively apply the same logic to the left and right subarrays
  quickSortRecursive(key, arr, sortOrder, start, index - 1);
  quickSortRecursive(key, arr, sortOrder, index + 1, end);

  return arr;
}
