function stringToMatrix(str) {
    return str.trim().split("\n").map((s) => s.trim());
}

const matrix = stringToMatrix(input);

for(row in matrix){
    const winningStr = matrix[row].split(':')[1].split('|')[0].trim();
    const numbersStr = matrix[row].split(':')[1].split('|')[1].trim();
    const card = { winning: winningStr, numbers: numbersStr}
    console.log(card)
}