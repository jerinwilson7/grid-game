"use client";

import React, { Suspense, useState, useEffect } from "react";

function Home() {
  const [gridSize, setGridSize] = useState<number>(0);
  const [grid, setGrid] = useState<string[][]>([]);
  const [shouldShowGrid, setShouldShowGrid] = useState(false);
  const [errorWarning, setErrorWarning] = useState(false);

  const drawGrid = (size: number): string[][] => {
    return Array(size)
      .fill(null)
      .map(() => Array(size).fill("bg-yellow-400"));
  };

  useEffect(() => {
    if (gridSize >= 2 && gridSize <= 20) {
      setGrid(drawGrid(gridSize));
    }
  }, [gridSize]);

  const handleCellClick = (rowIndex: number, colIndex: number) => {
    if (
      grid[rowIndex][colIndex] === "bg-gray-400" ||
      grid[rowIndex][colIndex] === "bg-green-400"
    ) {
      return;
    }

    const newGrid = grid.map((row) => [...row]);

    for (let i = 0; i < gridSize; i++) {
      newGrid[rowIndex][i] = "bg-gray-400";
    }

    for (let i = 0; i < gridSize; i++) {
      newGrid[i][colIndex] = "bg-gray-400";
    }

    for (let i = 0; i < gridSize; i++) {
      if (rowIndex + i < gridSize && colIndex + i < gridSize) {
        newGrid[rowIndex + i][colIndex + i] = "bg-gray-400";
      }

      if (rowIndex + i < gridSize && colIndex - i >= 0) {
        newGrid[rowIndex + i][colIndex - i] = "bg-gray-400";
      }

      if (rowIndex - i >= 0 && colIndex + i < gridSize) {
        newGrid[rowIndex - i][colIndex + i] = "bg-gray-400";
      }

      if (rowIndex - i >= 0 && colIndex - i >= 0) {
        newGrid[rowIndex - i][colIndex - i] = "bg-gray-400";
      }
    }

    newGrid[rowIndex][colIndex] = "bg-green-400";
    setGrid(newGrid);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorWarning(false);
    if (gridSize < 2 || gridSize > 10) {
      setErrorWarning(true);
      return;
    }
    setGrid(drawGrid(gridSize));
    setShouldShowGrid(true);
  };

  const handleClose = () => {
    setShouldShowGrid(false);
    setGrid([]);
  };

  const handleResetGrid = () => {
    setGrid(drawGrid(gridSize));
  };

  return (
    <Suspense>
      <main className="h-screen bg-black flex justify-center items-center">
        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-col gap-2">
            <input
              type="number"
              onChange={(e) => setGridSize(Number(e.target.value))}
              placeholder="Enter the size of the grid"
              className="rounded-md px-3 py-3 w-72 md:w-[345px] bg-white border-white font-semibold text-black"
            />
            {errorWarning && (
              <span className="text-red-500 max-w-72 md:max-w-[345px]  font-semibold text-xs md:text-sm">
                The size of the grid should be greater than 1 and less than 10
              </span>
            )}
          </div>
          <button
            className="bg-yellow-500 h-10 w-[250px] text-black font-semibold rounded-md"
            onClick={handleSubmit}
          >
            Draw Grid
          </button>
        </div>

        {shouldShowGrid && (
          <div className="fixed inset-0 bg-black z-50 min-h-screen flex items-center justify-center">
            <div
              className="h-10 hover:cursor-pointer w-10 bg-red-400 text-white absolute top-3 right-3 text-center flex justify-center items-center font-bold text-lg"
              onClick={handleClose}
            >
              X
            </div>
            <div className="flex flex-col gap-4 items-center justify-center">
              <div>
                {grid.map((row, rowIndex) => (
                  <div key={rowIndex} className="flex">
                    {row.map((bgColor, colIndex) => (
                      <div
                        key={colIndex}
                        className={`${bgColor} border-black border-2 p-4 md:p-8 rounded-md ${bgColor === 'bg-yellow-400' ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                        onClick={() => handleCellClick(rowIndex, colIndex)}
                      ></div>
                    ))}
                  </div>
                ))}
              </div>
              <button
                className="bg-yellow-500 h-10 w-[250px] text-black font-semibold rounded-md"
                onClick={handleResetGrid}
              >
                Reset Grid
              </button>
            </div>
          </div>
        )}
      </main>
    </Suspense>
  );
}

export default Home;
