function stringToMatrix(str) {
    return str.trim().split("\n").map((s) => s.trim());
}

const matrix = stringToMatrix(input);
let counter1 = 0;
let counter2 = 0;
const copiesArray = Array(matrix.length).fill(1);
for(row in matrix){
    let rowCounter = 0;
    const winning = matrix[row].split(':')[1].split('|')[0].trim().split(' ').map((w) => parseInt(w));
    const numbers = matrix[row].split(':')[1].split('|')[1].trim().split(' ').map((w) => parseInt(w));
    let countWin = 0;
    for(number of numbers){
        if (winning.indexOf(number) !== -1) {
            countWin++;
            if(rowCounter === 0){
                rowCounter = 1;
            }else{
                rowCounter *= 2
            }
        }
    }
    for(let j = parseInt(row) + 1; j <= parseInt(row) + countWin; j++){
        copiesArray[j] += copiesArray[parseInt(row)];
    }
    counter1 += rowCounter;
}
counter2 = copiesArray.reduce((a, x) => a + x, 0);
console.log(counter1);
console.log(counter2);
document.getElementById('sol1').innerHTML += ' ' + counter1;
document.getElementById('sol2').innerHTML += ' ' + counter2;

