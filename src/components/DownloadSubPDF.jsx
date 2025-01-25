import React from "react";
import { jsPDF } from "jspdf";

const DownloadSubPDF = ({ bound }) => {
  const handleDownload = () => {
    const doc = new jsPDF();

    // Add title and tester information at the top
    doc.setFontSize(18);
    doc.text(
      "Grade 4 Math Quiz - Subtraction Only",
      105,
      20,
      null,
      null,
      "center"
    ); // Centered Title
    doc.setFontSize(12);
    doc.text("Name: ____________", 10, 30);
    doc.text("Date: ____________", 140, 30);
    doc.text("Score: ____________", 10, 40);

    doc.setFontSize(14);

    // Generating random subtraction questions
    const generateMathQuestions = (bound) => {
      const questions = [];
      for (let i = 0; i < 100; i++) {
        const num1 = Math.floor(Math.random() * (bound - 1)) + 1;
        const num2 = Math.floor(Math.random() * (bound - 1)) + 1;
        const larger = Math.max(num1, num2);
        const smaller = Math.min(num1, num2);
        questions.push(`${larger} - ${smaller} =`);
      }
      return questions;
    };

    const questions = generateMathQuestions(bound);
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

    doc.save("math-quiz.pdf");
  };

  return <button onClick={handleDownload}>Download Sub PDF</button>;
};

export default DownloadSubPDF;
