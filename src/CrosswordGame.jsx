import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const GRID_SIZE = 21;

const emptyGrid = () =>
  Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(""));

const CrosswordCreator = () => {
  const [entries, setEntries] = useState([{ word: "", clue: "" }]);
  const [grid, setGrid] = useState(emptyGrid());
  const [solutionGrid, setSolutionGrid] = useState(emptyGrid());
  const [cellUsed, setCellUsed] = useState(
    emptyGrid().map((row) => row.map(() => false))
  );
  const [showGrid, setShowGrid] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  const handleInputChange = (index, field, value) => {
    const updated = [...entries];
    updated[index][field] = value.toUpperCase();
    setEntries(updated);
  };

  const addEntry = () => {
    setEntries([...entries, { word: "", clue: "" }]);
  };

  const placeWord = (grid, used, word, startRow, startCol, direction) => {
    for (let i = 0; i < word.length; i++) {
      const r = direction === "across" ? startRow : startRow + i;
      const c = direction === "across" ? startCol + i : startCol;
      grid[r][c] = word[i];
      used[r][c] = true;
    }
  };

  const canPlace = (grid, word, row, col, direction) => {
    for (let i = 0; i < word.length; i++) {
      const r = direction === "across" ? row : row + i;
      const c = direction === "across" ? col + i : col;

      if (r < 0 || c < 0 || r >= GRID_SIZE || c >= GRID_SIZE) return false;

      const cell = grid[r][c];

      // OK if same letter (intersect), fail if conflict
      if (cell && cell !== word[i]) return false;

      // Check adjacent if this cell is empty (new placement)
      if (!cell) {
        // For across, avoid vertical neighbors
        if (direction === "across") {
          if (
            (r > 0 && grid[r - 1][c]) ||
            (r < GRID_SIZE - 1 && grid[r + 1][c])
          )
            return false;
        }
        // For down, avoid horizontal neighbors
        if (direction === "down") {
          if (
            (c > 0 && grid[r][c - 1]) ||
            (c < GRID_SIZE - 1 && grid[r][c + 1])
          )
            return false;
        }
      }
    }

    // Check the cells *before* and *after* the word
    const beforeR = direction === "across" ? row : row - 1;
    const beforeC = direction === "across" ? col - 1 : col;
    const afterR = direction === "across" ? row : row + word.length;
    const afterC = direction === "across" ? col + word.length : col;

    if (
      (beforeR >= 0 && beforeC >= 0 && grid[beforeR][beforeC]) ||
      (afterR < GRID_SIZE && afterC < GRID_SIZE && grid[afterR][afterC])
    )
      return false;

    return true;
  };

  const findIntersection = (grid, word) => {
    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        const cell = grid[r][c];
        if (cell) {
          for (let i = 0; i < word.length; i++) {
            if (word[i] === cell) {
              // Try vertical
              const startRow = r - i;
              if (canPlace(grid, word, startRow, c, "down")) {
                return { row: startRow, col: c, direction: "down" };
              }
              // Try horizontal
              const startCol = c - i;
              if (canPlace(grid, word, r, startCol, "across")) {
                return { row: r, col: startCol, direction: "across" };
              }
            }
          }
        }
      }
    }
    return null;
  };

  const maskGrid = (solutionGrid, usageGrid, revealRatio = 0.2) => {
    const masked = [];

    for (let r = 0; r < GRID_SIZE; r++) {
      const row = [];
      for (let c = 0; c < GRID_SIZE; c++) {
        const letter = solutionGrid[r][c];
        if (!letter) {
          row.push("");
        } else {
          row.push(Math.random() < revealRatio ? letter : "");
        }
      }
      masked.push(row);
    }

    return masked;
  };

  const generateGrid = () => {
    const newGrid = emptyGrid();
    const usageGrid = emptyGrid().map((row) => row.map(() => false));
    const center = Math.floor(GRID_SIZE / 2);

    const sortedEntries = entries
      .filter((e) => e.word)
      .sort((a, b) => b.word.length - a.word.length);

    if (!sortedEntries.length) return;

    const first = sortedEntries[0].word;
    const startCol = center - Math.floor(first.length / 2);
    placeWord(newGrid, usageGrid, first, center, startCol, "across");

    for (let i = 1; i < sortedEntries.length; i++) {
      const word = sortedEntries[i].word;
      const placement = findIntersection(newGrid, word);
      if (placement) {
        placeWord(
          newGrid,
          usageGrid,
          word,
          placement.row,
          placement.col,
          placement.direction
        );
      }
    }

    const masked = maskGrid(newGrid, usageGrid);
    setGrid(masked);
    setSolutionGrid(newGrid);
    setCellUsed(usageGrid);
    setShowGrid(true);
    setShowSolution(false);
  };

  const downloadPDF = async () => {
    const canvas = await html2canvas(document.getElementById("crossword-grid"));
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    pdf.addImage(imgData, "PNG", 10, 10, 180, 180);
    pdf.save("crossword.pdf");
  };

  return (
    <Box p={6}>
      <Heading mb={4}>Crossword Generator</Heading>

      <VStack spacing={4} align="stretch">
        {entries.map((entry, index) => (
          <Flex key={index} gap={4} flexWrap="wrap">
            <FormControl>
              <FormLabel>Word {index + 1}</FormLabel>
              <Input
                value={entry.word}
                onChange={(e) =>
                  handleInputChange(index, "word", e.target.value)
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel>Clue {index + 1}</FormLabel>
              <Input
                value={entry.clue}
                onChange={(e) =>
                  handleInputChange(index, "clue", e.target.value)
                }
              />
            </FormControl>
          </Flex>
        ))}
        <Button onClick={addEntry} colorScheme="teal">
          Add Another Word
        </Button>
        <Button onClick={generateGrid} colorScheme="blue">
          Generate Crossword
        </Button>
      </VStack>

      {showGrid && (
        <>
          <Box
            id="crossword-grid"
            mt={8}
            border="1px solid #ccc"
            p={4}
            overflow="auto"
          >
            <Grid templateColumns={`repeat(${GRID_SIZE}, 30px)`} gap={1}>
              {grid.map((row, rowIndex) =>
                row.map((cell, colIndex) => (
                  <GridItem
                    key={`${rowIndex}-${colIndex}`}
                    w="30px"
                    h="30px"
                    bg={cellUsed[rowIndex][colIndex] ? "gray.200" : "white"}
                    border="1px solid black"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Text fontWeight="bold">
                      {showSolution ? solutionGrid[rowIndex][colIndex] : cell}
                    </Text>
                  </GridItem>
                ))
              )}
            </Grid>
          </Box>
          <Button mt={4} colorScheme="green" onClick={downloadPDF}>
            Download PDF
          </Button>
          <Button
            mt={2}
            colorScheme="orange"
            onClick={() => setShowSolution(!showSolution)}
          >
            {showSolution ? "Hide Answer" : "Show Answer"}
          </Button>
        </>
      )}
    </Box>
  );
};

export default CrosswordCreator;
