export function generateMultAndDivMathQuestions(
  numQuestions = 100,
  maxOperand = 20
) {
  const questions = [];

  for (let i = 0; i < numQuestions; i++) {
    // Randomly choose between multiplication and division
    const isMultiplication = Math.random() < 0.5;
    let question = "";
    if (isMultiplication) {
      question = generateMultiplicationQuestion(maxOperand);
    } else {
      question = generateDivisionQuestion(maxOperand);
    }

    questions.push({ question });
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
    questions.push({ question });
  }

  return questions;
}

export function generateDivMathQuestions(numQuestions = 100, maxOperand = 20) {
  const questions = [];

  for (let i = 0; i < numQuestions; i++) {
    const question = generateDivisionQuestion(maxOperand);
    questions.push({ question });
  }

  return questions;
}

export function generateAddMathQuestions(numQuestions = 100, maxOperand = 20) {
  const questions = [];

  for (let i = 0; i < numQuestions; i++) {
    const question = generateAddQuestion(maxOperand);
    questions.push({ question });
  }
  return questions;
}

export function generateSubMathQuestions(numQuestions = 100, maxOperand = 20) {
  const questions = [];

  for (let i = 0; i < numQuestions; i++) {
    const question = generateSubtractionQuestion(maxOperand);
    questions.push({ question });
  }
  return questions;
}

export function generateAddAndSubMathQuestions(
  numQuestions = 100,
  maxOperand = 20
) {
  const questions = [];

  for (let i = 0; i < numQuestions; i++) {
    // Randomly choose between multiplication and division
    const isAdd = Math.random() < 0.5;
    let question = "";
    if (isAdd) {
      question = generateAddQuestion(maxOperand);
    } else {
      question = generateSubtractionQuestion(maxOperand);
    }

    questions.push({ question });
  }

  return questions;
}

function generateDivisionQuestion(maxOperand = 20) {
  // Generate a random divisor (1 to maxOperand)
  const divisor = Math.floor(Math.random() * maxOperand) + 1;

  // Generate a random quotient (1 to maxOperand)
  const quotient = Math.floor(Math.random() * maxOperand) + 1;

  // Calculate dividend to ensure clean division
  const dividend = divisor * quotient;

  // Create question and store answer
  return `${dividend} ÷ ${divisor} = ?`;
}

function generateMultiplicationQuestion(maxOperand = 20) {
  // Generate two random operands within the bound (1 to maxOperand)
  const operand1 = Math.floor(Math.random() * maxOperand) + 1;
  const operand2 = Math.floor(Math.random() * maxOperand) + 1;

  // Format the question
  const question = `${operand1} × ${operand2} = `;

  return { question };
}

function generateAddQuestion(bound) {
  const num1 = Math.floor(Math.random() * (bound - 1)) + 1;
  const num2 = Math.floor(Math.random() * (bound - 1)) + 1;
  return `${num1} + ${num2} =`;
}

function generateSubtractionQuestion(maxNumber) {
  // Generate two random numbers within the bound (1 to maxNumber)
  const minuend = Math.floor(Math.random() * maxNumber) + 1;
  // Ensure subtrahend is less than or equal to minuend for non-negative result
  const subtrahend = Math.floor(Math.random() * minuend) + 1;

  // Calculate the answer
  const answer = minuend - subtrahend;

  // Format the question
  const question = `${minuend} - ${subtrahend} = ?`;

  return question;
}
