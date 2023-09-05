import React, { useEffect, useState } from "react";
import { valueToColorMap } from "../constants/colorMap";
import styles from "./Grid.module.css";


const Grid = ({ m, n, path }) => {

    const [cellVisibility, setCellVisibility] = useState([]);

    useEffect(() => {

        if (m && n && path) {
            
            // Generate an array with the initial visibility state of the grid cells
            const initialVisibility = Array(m * n).fill(false);
            setCellVisibility(initialVisibility);

            // Animate the cells with CSS animations
            const animateCells = async () => {
                const cellArray = [];

                for (let i = 0; i < m; i++) {
                    for (let j = 0; j < n; j++) {
                        const isPath = path[i][j];
                        const numericValue = isPath ? path[i][j] : 0;
                        cellArray.push({
                            position: i * n + j,
                            numericValue,
                        });
                    }
                }

                // Sort the cells by numeric value
                cellArray.sort((a, b) => a.numericValue - b.numericValue);

                for (const cell of cellArray) {
                    await new Promise((resolve) => setTimeout(resolve, 100));
                    setCellVisibility((prevVisibility) => {
                        const updatedVisibility = [...prevVisibility];
                        updatedVisibility[cell.position] = true;
                        return updatedVisibility;
                    });
                }
            };

            animateCells();
        }
    }, [m, n, path]);

    if (!path || path.length !== m || path[0].length !== n) {
        // Path is not ready or has invalid dimensions, don't render the grid
        return null;
    }

    const rows = [];
    for (let i = 0; i < m; i++) {
        const cells = [];

        for (let j = 0; j < n; j++) {
            const isPath = path[i][j];
            const numericValue = isPath ? path[i][j] : 0;
            const cellColor = valueToColorMap[numericValue];
            const isVisible = cellVisibility[i * n + j];
            const cellStyle = {
                backgroundColor: cellColor,
                opacity: isVisible ? 1 : 0,
                transition: "opacity 0.5s ease-in-out",
            };

            cells.push(
                <div
                    key={`cell-${i}-${j}`}
                    className={`${styles.cell} ${isPath ? styles.path : ""}`}
                    style={cellStyle}
                >
                    {numericValue}
                </div>
            );
        }

        rows.push(
            <div key={`row-${i}`} className={styles.row}>
                {cells}
            </div>
        );
    };

    return (
        <div className={styles["grid-container"]}>
            <div
                className={styles.grid}
                style={{ gridTemplateColumns: `repeat(${m}, 40px)` }}
            >
                {rows}
            </div>
        </div>
    );
};

export default Grid;
