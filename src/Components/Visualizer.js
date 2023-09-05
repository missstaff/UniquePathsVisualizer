import React, { useEffect, useState } from "react";
import Grid from "./Grid";
import { uniquePaths } from "../Utilities/uniquePaths";
import styles from "./Visualizer.module.css";


const Visualizer = () => {

    
    const [m, setM] = useState(3);
    const [n, setN] = useState(2);
    const [path, setPath] = useState([]);
    const [isVisualizing, setIsVisualizing] = useState(false);


    const handleVisualize = async () => {
        setIsVisualizing(true);

        const newPath = uniquePaths(m, n);
        setPath(newPath);

        setTimeout(() => {
            setIsVisualizing(false);
        }, 1000);
    };


    const buttonStyle = {
        marginLeft: "10px",
        backgroundColor: isVisualizing ? "#ccc" : "#007bff",
        color: "white",
        border: "none",
        padding: "5px 10px",
        cursor: isVisualizing ? "not-allowed" : "pointer",
    };

    useEffect(() => {
        // Remove the path when m or n changes
        setPath([]);
    }, [m, n]);


    return (
        <div className={styles.container}>
            <h2 className={styles.header}>Unique Paths Visualizer</h2>
            <div>
                <label className={styles.label}>
                    Rows:
                    <input
                        type="number"
                        value={isNaN(m) ? "" : m}
                        onChange={(e) => setM(parseInt(e.target.value))}
                        className={styles.input}
                    />

                </label>
                <label className={styles.label}>
                    Columns:
                    <input
                        type="number"
                        value={isNaN(n) ? "" : n}
                        onChange={(e) => setN(parseInt(e.target.value))}
                        className={styles.input}
                    />
                </label>
                <button
                    style={buttonStyle}
                    onClick={handleVisualize}
                    disabled={isVisualizing}
                >
                    {isVisualizing ? "Visualizing..." : "Visualize"}
                </button>
            </div>
            <div>{path.length > 0 && <Grid m={m} n={n} path={path} />}</div>
        </div>
    );
};

export default Visualizer;
