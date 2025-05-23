export function generateMultAndDivMathQuestions(
  numQuestions = 100,
  maxOperand = 20
) {
  const questions = new Set();
  const result = [];

  while (result.length < numQuestions) {
    const isMultiplication = Math.random() < 0.5;
    const [question, key] = isMultiplication
      ? generateMultiplicationQuestion(maxOperand)
      : generateDivisionQuestion(maxOperand);

    if (!questions.has(key)) {
      questions.add(key);
      result.push(question);
    }
  }
  return result;
}

export function generateMultiMathQuestions(
  numQuestions = 100,
  maxOperand = 20
) {
  const questions = new Set();
  const result = [];

  while (result.length < numQuestions) {
    const [question, key] = generateMultiplicationQuestion(maxOperand);
    if (!questions.has(key)) {
      questions.add(key);
      result.push(question);
    }
  }
  return result;
}

export function generateDivMathQuestions(numQuestions = 100, maxOperand = 20) {
  const questions = new Set();
  const result = [];

  while (result.length < numQuestions) {
    const [question, key] = generateDivisionQuestion(maxOperand);
    if (!questions.has(key)) {
      questions.add(key);
      result.push(question);
    }
  }
  return result;
}

export function generateAddMathQuestions(numQuestions = 100, maxOperand = 20) {
  const questions = new Set();
  const result = [];

  while (result.length < numQuestions) {
    const [question, key] = generateAddQuestion(maxOperand);
    if (!questions.has(key)) {
      questions.add(key);
      result.push(question);
    }
  }
  return result;
}

export function generateSubMathQuestions(numQuestions = 100, maxOperand = 20) {
  const questions = new Set();
  const result = [];

  while (result.length < numQuestions) {
    const [question, key] = generateSubtractionQuestion(maxOperand);
    if (!questions.has(key)) {
      questions.add(key);
      result.push(question);
    }
  }
  return result;
}

export function generateAddAndSubMathQuestions(
  numQuestions = 100,
  maxOperand = 20
) {
  const questions = new Set();
  const result = [];

  while (result.length < numQuestions) {
    const isAdd = Math.random() < 0.5;
    const [question, key] = isAdd
      ? generateAddQuestion(maxOperand)
      : generateSubtractionQuestion(maxOperand);

    if (!questions.has(key)) {
      questions.add(key);
      result.push(question);
    }
  }
  return result;
}

// ------------------ Updated helper functions ------------------ //

function generateMultiplicationQuestion(maxOperand) {
  const op1 = Math.floor(Math.random() * maxOperand) + 1;
  const op2 = Math.floor(Math.random() * maxOperand) + 1;
  const key = [op1, op2].sort().join("×");
  return [`${op1} × ${op2} = `, key];
}

function generateDivisionQuestion(maxOperand) {
  const divisor = Math.floor(Math.random() * Math.min(maxOperand, 10)) + 1;
  const quotient = Math.floor(Math.random() * maxOperand) + 1;
  const dividend = divisor * quotient;
  const key = `${dividend}÷${divisor}`;
  return [`${dividend} ÷ ${divisor} = `, key];
}

function generateAddQuestion(bound) {
  const num1 = Math.floor(Math.random() * (bound - 1)) + 1;
  const num2 = Math.floor(Math.random() * (bound - 1)) + 1;
  const key = [num1, num2].sort().join("+");
  return [`${num1} + ${num2} = `, key];
}

function generateSubtractionQuestion(maxNumber) {
  let minuend, subtrahend;

  do {
    minuend = Math.floor(Math.random() * maxNumber) + 1;
    subtrahend = Math.floor(Math.random() * minuend) + 1;
  } while (minuend === subtrahend); // reject any equal pairs

  const key = `${minuend}-${subtrahend}`;
  return [`${minuend} - ${subtrahend} = `, key];
}
