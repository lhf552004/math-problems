export function generateMultAndDivMathQuestions(
  numQuestions = 100,
  maxOperand = 20
) {
  const questions = [];
  for (let i = 0; i < numQuestions; i++) {
    const isMultiplication = Math.random() < 0.5;
    const question = isMultiplication
      ? generateMultiplicationQuestion(maxOperand)
      : generateDivisionQuestions(maxOperand);
    questions.push(question);
  }
  return questions;
}

export function generateMultiMathQuestions(
  numQuestions = 100,
  maxOperand = 20
) {
  const questions = [];
  for (let i = 0; i < numQuestions; i++) {
    const question = generateMultiplicationQuestion(maxOperand);
    questions.push(question);
  }
  return questions;
}

export function generateDivMathQuestions(numQuestions = 100, maxOperand = 20) {
  const questions = [];
  for (let i = 0; i < numQuestions; i++) {
    const question = generateDivisionQuestions(maxOperand);
    questions.push(question);
  }
  return questions;
}

export function generateAddMathQuestions(numQuestions = 100, maxOperand = 20) {
  const questions = [];
  for (let i = 0; i < numQuestions; i++) {
    const question = generateAddQuestion(maxOperand);
    questions.push(question);
  }
  return questions;
}

export function generateSubMathQuestions(numQuestions = 100, maxOperand = 20) {
  const questions = [];
  for (let i = 0; i < numQuestions; i++) {
    const question = generateSubtractionQuestion(maxOperand);
    questions.push(question);
  }
  return questions;
}

export function generateAddAndSubMathQuestions(
  numQuestions = 100,
  maxOperand = 20
) {
  const questions = [];
  for (let i = 0; i < numQuestions; i++) {
    const isAdd = Math.random() < 0.5;
    const question = isAdd
      ? generateAddQuestion(maxOperand)
      : generateSubtractionQuestion(maxOperand);
    questions.push(question);
  }
  return questions;
}

function generateDivisionQuestions(maxOperand = 20) {
  const divisor = Math.floor(Math.random() * Math.min(maxOperand, 10)) + 1;
  const quotient = Math.floor(Math.random() * maxOperand) + 1;
  const dividend = divisor * quotient;
  const question = `${dividend} ÷ ${divisor} = `;
  return question;
}

function generateMultiplicationQuestion(maxOperand = 20) {
  const operand1 = Math.floor(Math.random() * maxOperand) + 1;
  const operand2 = Math.floor(Math.random() * maxOperand) + 1;
  const question = `${operand1} × ${operand2} = `;
  return question;
}

function generateAddQuestion(bound) {
  const num1 = Math.floor(Math.random() * (bound - 1)) + 1;
  const num2 = Math.floor(Math.random() * (bound - 1)) + 1;
  const question = `${num1} + ${num2} = `;
  return question;
}

function generateSubtractionQuestion(maxNumber) {
  const minuend = Math.floor(Math.random() * maxNumber) + 1;
  const subtrahend = Math.floor(Math.random() * minuend) + 1;
  const question = `${minuend} - ${subtrahend} = `;
  return question;
}
