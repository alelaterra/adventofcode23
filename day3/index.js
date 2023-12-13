function stringToMatrix(str) {
    return str.trim().split("\n").map((s)=>s.trim());
}
const matrix = stringToMatrix(input);
let counter = 0;
let gearRatios = 0;
const stats = []
for(row in matrix){
    const numbers = matrix[row].replace(/\./g, " ");
    for (const gear of numbers.matchAll('*')) {
            console.log(gear)
        // const testString = searchBoundaries(number[0],parseInt(row),number.index,number[0].length)
        // if(testString.some(x => /[^0-9.]/.test(x))){
        //     gearRatios += parseInt(number)
        // }else{
        //     console.log("discarded " + number)
        // }
    }
    for (const number of numbers.matchAll(/\d+/g)) {
        const testString = searchBoundaries(number[0],parseInt(row),number.index,number[0].length)
        if(testString.some(x => /[^0-9.]/.test(x))){
            counter += parseInt(number)
        }else{
            console.log("discarded " + number)
        }
    }

}

function searchBoundaries(number,x,y,length){
    const subMatrix = []
    const yEnd = y+length+1 <= matrix[0].length?y+length+1: y+length;
    y =  y>0?y-=1:y
    subMatrix.push((matrix[x - 1] ?? "").substring(y,yEnd))
    subMatrix.push(matrix[x].substring(y,yEnd))
    subMatrix.push((matrix[x + 1] ?? "").substring(y,yEnd))
    
    //contain all chars around the number
    return subMatrix.join('').split('')
}
console.log("counter: " +counter)
console.log("counter: " +gearRatios)
document.getElementById('sol1').innerHTML += ' '+counter

