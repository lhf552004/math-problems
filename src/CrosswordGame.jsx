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
  const [numbersGrid, setNumbersGrid] = useState(
    emptyGrid().map((row) => row.map(() => ""))
  );
  const [clues, setClues] = useState([]);
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

  const placeWord = (
    grid,
    used,
    numbers,
    word,
    startRow,
    startCol,
    direction,
    number
  ) => {
    numbers[startRow][startCol] = number;
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
      if (cell && cell !== word[i]) return false;
      if (!cell) {
        if (direction === "across") {
          if (
            (r > 0 && grid[r - 1][c]) ||
            (r < GRID_SIZE - 1 && grid[r + 1][c])
          )
            return false;
        }
        if (direction === "down") {
          if (
            (c > 0 && grid[r][c - 1]) ||
            (c < GRID_SIZE - 1 && grid[r][c + 1])
          )
            return false;
        }
      }
    }
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
              const startRow = r - i;
              if (canPlace(grid, word, startRow, c, "down")) {
                return { row: startRow, col: c, direction: "down" };
              }
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

  const maskGrid = (solutionGrid, usageGrid) => {
    const masked = [];
    for (let r = 0; r < GRID_SIZE; r++) {
      const row = [];
      for (let c = 0; c < GRID_SIZE; c++) {
        const letter = solutionGrid[r][c];
        row.push(letter ? "" : ""); // always blank
      }
      masked.push(row);
    }
    return masked;
  };

  const generateGrid = () => {
    const newGrid = emptyGrid();
    const usageGrid = emptyGrid().map((row) => row.map(() => false));
    const numberGrid = emptyGrid().map((row) => row.map(() => ""));
    const center = Math.floor(GRID_SIZE / 2);

    const sortedEntries = entries
      .filter((e) => e.word)
      .sort((a, b) => b.word.length - a.word.length);
    if (!sortedEntries.length) return;

    let clueNumber = 1;
    const clueList = [];

    const first = sortedEntries[0];
    const startCol = center - Math.floor(first.word.length / 2);
    placeWord(
      newGrid,
      usageGrid,
      numberGrid,
      first.word,
      center,
      startCol,
      "across",
      clueNumber
    );
    clueList.push(`${clueNumber}. (across) ${first.clue}`);
    clueNumber++;

    for (let i = 1; i < sortedEntries.length; i++) {
      const word = sortedEntries[i].word;
      const clue = sortedEntries[i].clue;
      const placement = findIntersection(newGrid, word);
      if (placement) {
        placeWord(
          newGrid,
          usageGrid,
          numberGrid,
          word,
          placement.row,
          placement.col,
          placement.direction,
          clueNumber
        );
        clueList.push(`${clueNumber}. (${placement.direction}) ${clue}`);
        clueNumber++;
      }
    }

    setGrid(maskGrid(newGrid, usageGrid));
    setSolutionGrid(newGrid);
    setCellUsed(usageGrid);
    setNumbersGrid(numberGrid);
    setClues(clueList);
    setShowGrid(true);
    setShowSolution(false);
  };

  const downloadPDF = async () => {
    const canvas = await html2canvas(document.getElementById("crossword-grid"));
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    pdf.addImage(imgData, "PNG", 10, 10, 180, 180);

    let y = 200;
    pdf.setFontSize(10);
    clues.forEach((clue) => {
      if (y > 280) {
        pdf.addPage();
        y = 20;
      }
      pdf.text(clue, 10, y);
      y += 6;
    });

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
            maxW="fit-content"
            maxH="80vh"
            mx="auto"
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
                    position="relative"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Text
                      fontWeight="bold"
                      fontSize="xs"
                      position="absolute"
                      top="1px"
                      left="2px"
                    >
                      {numbersGrid[rowIndex][colIndex]}
                    </Text>
                    <Text fontWeight="bold">
                      {/* No letters shown in user view */}
                      {showSolution ? solutionGrid[rowIndex][colIndex] : ""}
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
