export const roundNumber = (n: number) => {
  const three = n.toFixed(2);
  for (let i = three.length - 1; i > 0; i--) {
    console.log(three.charAt(i));
    if (three.charAt(i) !== "0") {
      return Number(three.slice(0, i + 1));
    }
  }
};
