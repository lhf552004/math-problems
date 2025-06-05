import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Box, Flex, Heading, Button } from "@chakra-ui/react";
import MathQuiz from "./MathQuiz";
import CrosswordGame from "./CrosswordGame";

const App = () => {
  return (
    <Router>
      <Box>
        <Flex as="nav" bg="teal.500" p={4} justify="center" align="center">
          <Heading as="h1" size="md" color="white" mr={8}>
            Puzzle Generator
          </Heading>
          <Flex>
            <Button
              as={Link}
              to="/"
              colorScheme="teal"
              variant="ghost"
              color="white"
              mr={4}
            >
              Math Quiz
            </Button>
            <Button
              as={Link}
              to="/crossword"
              colorScheme="teal"
              variant="ghost"
              color="white"
            >
              Crossword Puzzle
            </Button>
          </Flex>
        </Flex>
        <Routes>
          <Route path="/" element={<MathQuiz />} />
          <Route path="/crossword" element={<CrosswordGame />} />
        </Routes>
      </Box>
    </Router>
  );
};

export default App;
