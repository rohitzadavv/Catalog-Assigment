const fs = require('fs');

function parseBaseValue(value, base) {
    return parseInt(value, base);
}

function calculateLagrange(points) {
    let result = 0;

    for (let i = 0; i < points.length; i++) {
        const { x: xi, y: yi } = points[i];
        let term = yi;

        for (let j = 0; j < points.length; j++) {
            if (i !== j) {
                const xj = points[j].x;
                term *= -xj / (xi - xj);
            }
        }

        result += term;
    }

    return Math.round(result);
}

function extractSecret(data) {
    const numPoints = data.keys.n;
    const requiredPoints = data.keys.k;

    const pointsArray = [];
    
    for (const [xStr, pointInfo] of Object.entries(data)) {
        if (xStr === "keys") continue;
        const x = parseInt(xStr);
        const base = parseInt(pointInfo.base);
        const encodedY = pointInfo.value;
        const y = parseBaseValue(encodedY, base);
        pointsArray.push({ x, y });
    }

    pointsArray.sort((a, b) => a.x - b.x);
    const selectedPoints = pointsArray.slice(0, requiredPoints);

    return calculateLagrange(selectedPoints);
}

console.log("Current Directory:", process.cwd());

let firstDataSet, secondDataSet;

try {
    firstDataSet = JSON.parse(fs.readFileSync('C:/Users/kumar/Downloads/data1.json'));
} catch (error) {
    console.error("Error reading data1.json:", error);
    return; 
}

try {
    secondDataSet = JSON.parse(fs.readFileSync('C:/Users/kumar/Downloads/data2.json'));
} catch (error) {
    console.error("Error reading data2.json:", error);
    return; 
}

const secret1 = extractSecret(firstDataSet);
const secret2 = extractSecret(secondDataSet);

console.log("The secret constant for Test Case 1 is:", secret1);
console.log("The secret constant for Test Case 2 is:", secret2);
