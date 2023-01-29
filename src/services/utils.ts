export function wait(foo?: any, time: number = 500) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

const normmap: Record<string, string> = {
  "À": "A"
};

export function normaliseLetter(l: string): string {
  return normmap[l] ?? l;
}
