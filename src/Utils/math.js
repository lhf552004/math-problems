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

export function generateMultiMathQuestions(
  numQuestions = 100,
  maxOperand = 20,
  minOperand = 10
) {
  // Calculate maximum unique ordered pairs
  const maxPossibleQuestions = (maxOperand - minOperand + 1) ** 2; // 11 * 11 = 121
  if (numQuestions > maxPossibleQuestions) {
    throw new Error(
      `Cannot generate ${numQuestions} unique questions. Maximum possible is ${maxPossibleQuestions}.`
    );
  }

  // Generate all possible operand pairs
  const allPairs = [];
  for (let i = minOperand; i <= maxOperand; i++) {
    for (let j = minOperand; j <= maxOperand; j++) {
      allPairs.push([i, j]);
    }
  }

  // Shuffle the pairs to randomize (optional)
  for (let i = allPairs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allPairs[i], allPairs[j]] = [allPairs[j], allPairs[i]]; // Swap
  }

  // Take the first `numQuestions` pairs and format as questions
  const result = allPairs.slice(0, numQuestions).map(([a, b]) => {
    const question = `${a} × ${b} = `;
    return question;
  });

  return result;
}

export function generateAdditionsGreaterThan11(count = 100) {
  const results = [];
  const candidates = [];

  for (let i = 1; i <= 9; i++) {
    for (let j = 1; j <= 9; j++) {
      if (i + j > 11) {
        candidates.push([i, j]);
      }
    }
  }

  for (let k = 0; k < count; k++) {
    const [i, j] = candidates[Math.floor(Math.random() * candidates.length)];
    results.push(`${i} + ${j} = `);
  }

  return results;
}

export function generateSubtractionsFromAdditions(count = 100) {
  const results = [];
  const sums = [];

  // 构造所有 1~9 + 1~9 中和大于11的组合，记录其和
  for (let i = 1; i <= 9; i++) {
    for (let j = 1; j <= 9; j++) {
      const sum = i + j;
      if (sum > 11) {
        sums.push(sum);
      }
    }
  }

  // 随机选 count 个和，生成减法表达式
  for (let k = 0; k < count; k++) {
    const total = sums[Math.floor(Math.random() * sums.length)];

    // 减数要小于 total，结果为正整数
    const subtrahend = Math.floor(Math.random() * (total - 1)) + 1;

    results.push(`${total} - ${subtrahend} = `);
  }

  return results;
}

// ------------------ Updated helper functions ------------------ //

function generateMultiplicationQuestion(maxOperand, minOperand) {
  const op1 =
    Math.floor(Math.random() * (maxOperand - minOperand + 1)) + minOperand;
  const op2 =
    Math.floor(Math.random() * (maxOperand - minOperand + 1)) + minOperand;
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

export function getSimpleMultiplicationTable() {
  const questions = [];
  for (let i = 1; i <= 9; i++) {
    let row = "";
    for (let j = 1; j <= i; j++) {
      row += `${j}×${i}= \t`;
      questions.push(row);
    }
  }
  return questions;
}

export function generateMultiplicationTableNo1(count = 81) {
  const pool = [];
  for (let i = 2; i <= 9; i++) {
    for (let j = 2; j <= 9; j++) {
      pool.push(`${i} × ${j} =`);
    }
  }
  return shuffleAndSlice(pool, count);
}

export function generateDivisionTableNo1(count = 81) {
  const pool = [];
  for (let i = 2; i <= 9; i++) {
    for (let j = 2; j <= 9; j++) {
      pool.push(`${i * j} ÷ ${j} =`);
    }
  }
  return shuffleAndSlice(pool, count);
}

function shuffleAndSlice(arr, count) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
