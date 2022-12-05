const operatorToFunction = {
  "+": (num1: string | number, num2: string | number) => +num1 + +num2,
  "-": (num1: string | number, num2: string | number) => +num1 - +num2,
  "*": (num1: string | number, num2: string | number) => +num1 * +num2,
  "/": (num1: string | number, num2: string | number) => +num1 / +num2
}

function findOperator(str: string) {
  const [operator] = str.split("").filter((ch) => ["+", "-", "*", "/"].includes(ch))
  return operator;
}

export function solveQuestion(str: string) {
  const operationStr = str.replace(/ /g, "");
  const operator = findOperator(operationStr);
  const [num1, num2] = operationStr.split(operator)
  // @ts-ignore
  return operatorToFunction[operator](num1, num2);
};
