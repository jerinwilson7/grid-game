import { useState } from "react";

export default function Home() {
  const [size, setSize] = useState(8); // default grid size 8x8
  const [grid, setGrid] = useState(generateGrid(size));

  // Function to generate initial grid with colors
  function generateGrid(size) {
    return Array(size)
      .fill(null)
      .map(() => Array(size).fill("white")); // 'white' indicates empty boxes
  }

  // Handle box click
  const handleClick = (row, col) => {
    // Copy the grid and apply the logic to change colors
    const newGrid = grid.map((r) => [...r]);

    // Set the clicked box to green
    newGrid[row][col] = "green";

    // Update the entire row and column to gray
    for (let i = 0; i < size; i++) {
      newGrid[row][i] = "gray"; // Row to gray
      newGrid[i][col] = "gray"; // Column to gray
    }

    // Update the diagonals to gray if they exist
    for (let i = 0; i < size; i++) {
      if (row + i < size && col + i < size) {
        newGrid[row + i][col + i] = "gray"; // Diagonal top-left to bottom-right
      }
      if (row - i >= 0 && col + i < size) {
        newGrid[row - i][col + i] = "gray"; // Diagonal bottom-left to top-right
      }
    }

    setGrid(newGrid);
  };

  // Create grid UI
  const createGrid = () => {
    return grid.map((row, rowIndex) => (
      <div key={rowIndex} style={{ display: "flex" }}>
        {row.map((color, colIndex) => (
          <div
            key={colIndex}
            onClick={() => handleClick(rowIndex, colIndex)}
            style={{
              width: "40px",
              height: "40px",
              backgroundColor: color,
              border: "1px solid black",
              cursor: "pointer",
            }}
          ></div>
        ))}
      </div>
    ));
  };

  return (
    <div>
      <h1>Interactive Grid</h1>
      <input
        type="number"
        value={size}
        onChange={(e) => {
          const newSize = parseInt(e.target.value);
          setSize(newSize);
          setGrid(generateGrid(newSize)); // Regenerate grid for the new size
        }}
        min="2"
        max="20"
        style={{ marginBottom: "20px", padding: "5px" }}
      />
      <div>{createGrid()}</div>
    </div>
  );
}



    // for (let i = 0; i < gridSize; i++) {
    //   if (rowIndex + i < gridSize && colIndex + i < gridSize) {
    //     newGrid[rowIndex + i][colIndex + i] = "bg-white";
    //     newGrid[rowIndex + i][colIndex - i] = "bg-white";
    //   }
    //   if (rowIndex - i >= 0 && colIndex + i < gridSize) {
    //     newGrid[rowIndex - i][colIndex + i] = "bg-white";
    //     newGrid[rowIndex - i][colIndex - i] = "bg-white";
    //   }
    // }