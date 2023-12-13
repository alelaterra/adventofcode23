function stringToMatrix(str) {
    return str.trim().split("\n").map((s) => s.trim());
}

const matrix = stringToMatrix(input);
let counter = 0;
let gearRatios = 0;
let gears = {};

for (let row in matrix) {
    const numbers = matrix[row].replace(/\./g, " ");
    for (const gear of numbers.matchAll(/\*/g)) {
        const gearKey = `${row}-${gear.index}`;
        if (!gears[gearKey]) {
            gears[gearKey] = [];
        }
    }
}

for (let row in matrix) {
    const numbers = matrix[row].replace(/\./g, " ");
    for (const number of numbers.matchAll(/\d+/g)) {
        const testString = searchBoundaries(
            number[0],
            parseInt(row),
            number.index,
            number[0].length
        );
        if (testString.some((x) => /[^0-9.]/.test(x))) {
            counter += parseInt(number[0]);
        } else {
            console.log("discarded " + number);
        }
    }
}

function searchBoundaries(number, x, y, length) {
    const subMatrix = [];
    const yEnd = y + length + 1 <= matrix[0].length ? y + length + 1 : y + length;
    y = y > 0 ? y - 1 : y;

    subMatrix.push((matrix[x - 1] ?? "").substring(y, yEnd));
    subMatrix.push(matrix[x].substring(y, yEnd));
    subMatrix.push((matrix[x + 1] ?? "").substring(y, yEnd));
    for (let row in subMatrix) {
        subMatrix[row].split("").forEach((char, i) => {
            if (char === "*") {
                const gearX = row === "0" ? x - 1 : row === "2" ? x + 1 : x;
                const gearY = y + i;
                const gearKey = `${gearX}-${gearY}`;
                if (!gears[gearKey]) {
                    gears[gearKey] = [];
                }
                gears[gearKey].push(number);
            }
        });
    }
    // contain all chars around the number
    const subMatrixString = subMatrix.join("").split("");

    return subMatrixString;
}

console.log(gears);
for (let gearKey in gears) {
    if (gears[gearKey].length > 1) {
        gearRatios += gears[gearKey].reduce((acc, current) => acc * parseInt(current, 10), 1);
    }
}
console.log("counter: " + counter);
console.log("gear ratios: " + gearRatios);
document.getElementById('sol1').innerHTML += ' ' + counter;
document.getElementById('sol2').innerHTML += ' ' + gearRatios;
