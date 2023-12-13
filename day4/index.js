function stringToMatrix(str) {
    return str.trim().split("\n").map((s) => s.trim());
}

const matrix = stringToMatrix(input);
let counter = 0;
for(row in matrix){
    let rowCounter = 0;
    const winning = matrix[row].split(':')[1].split('|')[0].trim().split(' ').map((w) => parseInt(w));
    const numbers = matrix[row].split(':')[1].split('|')[1].trim().split(' ').map((w) => parseInt(w));
    const card = { winning: winning, numbers: numbers}
    let countWin = 0;
    for(number of numbers){
        if (winning.indexOf(number) !== -1) {
            if(rowCounter === 0){
                rowCounter = 1;
            }else{
                rowCounter *= 2
            }
        }
    }
    counter += rowCounter;
    // console.log(card)
}
console.log(counter);