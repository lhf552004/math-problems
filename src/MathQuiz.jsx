import { useState } from "react";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  Input,
  Button,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { jsPDF } from "jspdf";
import {
  generateAddAndSubMathQuestions,
  generateAddMathQuestions,
  generateSubMathQuestions,
  generateMultAndDivMathQuestions,
  generateMultiMathQuestions,
  generateDivMathQuestions,
} from "./Utils/math";

const MathQuiz = () => {
  const [operation, setOperation] = useState("addition");
  const [maxBound, setMaxBound] = useState(20);
  const [questionCount, setQuestionCount] = useState(100);
  const toast = useToast();

  // Generate questions based on operation type
  const generateQuestions = () => {
    const count = parseInt(questionCount);
    const bound = parseInt(maxBound);

    if (!bound || bound <= 0 || !count || count <= 0) {
      toast({
        title: "Invalid Input",
        description:
          "Please enter positive numbers for bound and question count.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return [];
    }

    let questions = [];
    if (operation === "addition") {
      questions = generateAddMathQuestions(count, bound);
    } else if (operation === "subtraction") {
      questions = generateSubMathQuestions(count, bound);
    } else if (operation === "add-sub") {
      questions = generateAddAndSubMathQuestions(count, bound);
    } else if (operation === "multiplication") {
      questions = generateMultiMathQuestions(count, bound);
    } else if (operation === "division") {
      questions = generateDivMathQuestions(count, bound);
    } else if (operation === "mult-div") {
      questions = generateMultAndDivMathQuestions(count, bound);
    }
    return questions;
  };

  // Handle download
  const handleDownload = () => {
    const questions = generateQuestions();
    if (questions.length === 0) return;

    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Math Quiz", 105, 20, null, null, "center");
    doc.setFontSize(12);
    doc.text("Name:  ____________", 10, 30);
    doc.text("Date:  ____________", 140, 30);
    doc.text("Score: ____________", 10, 40);

    doc.setFontSize(14);

    const columns = 5;
    const rows = 20;

    let x = 10;
    let y = 60;
    const lineHeight = 10;
    const colWidth = 40;

    questions.forEach((question, index) => {
      doc.text(question, x, y);
      if ((index + 1) % rows === 0) {
        x += colWidth;
        y = 60;
      } else {
        y += lineHeight;
      }
    });

    doc.save(`${operation}-math-quiz.pdf`);

    toast({
      title: "Success",
      description: "Math problems downloaded successfully!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box
      maxW="600px"
      mx="auto"
      p={6}
      borderWidth={1}
      borderRadius="lg"
      boxShadow="md"
      mt={8}
    >
      <Heading as="h1" size="lg" textAlign="center" mb={6}>
        Generate Math Problems
      </Heading>
      <VStack spacing={6} align="stretch">
        <FormControl as="fieldset">
          <FormLabel as="legend" fontWeight="bold">
            olimp Select Operation
          </FormLabel>
          <RadioGroup value={operation} onChange={setOperation}>
            <VStack align="start" spacing={2}>
              <Radio value="addition">Addition</Radio>
              <Radio value="subtraction">Subtraction</Radio>
              <Radio value="add-sub">Addition + Subtraction</Radio>
              <Radio value="multiplication">Multiplication</Radio>
              <Radio value="division">Division</Radio>
              <Radio value="mult-div">Multiplication + Division</Radio>
            </VStack>
          </RadioGroup>
        </FormControl>

        <FormControl>
          <FormLabel fontWeight="bold">Maximum Bound for Numbers</FormLabel>
          <Input
            type="number"
            value={maxBound}
            onChange={(e) => setMaxBound(e.target.value)}
            placeholder="e.g., 20"
            min={1}
          />
        </FormControl>

        <FormControl>
          <FormLabel fontWeight="bold">Number of Questions</FormLabel>
          <Input
            type="number"
            value={questionCount}
            onChange={(e) => setQuestionCount(e.target.value)}
            placeholder="e.g., 10"
            min={1}
          />
        </FormControl>

        <Button
          colorScheme="teal"
          size="lg"
          onClick={handleDownload}
          isDisabled={!maxBound || !questionCount}
        >
          Generate & Download
        </Button>
      </VStack>
    </Box>
  );
};

export default MathQuiz;
