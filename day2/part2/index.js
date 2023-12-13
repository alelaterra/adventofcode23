// import {input} from './input'
const games = input.trim().split(/[\r\n]+/);
let counter = 0;
let power = 0;
function isPossible(set){
  const limits = { red: 12, green: 13, blue: 14 };
  const colors = countColors(set)
  for (const color in colors) {
        if (colors[color] > limits[color]) {
            return false;
        }
    }
  return true;
}

function countColors(inputString) {
    const colorArray = inputString.trim().split(", ");
let colorObject = {};

colorArray.forEach(pair => {
    const [count, color] = pair.split(" ");
    colorObject[color] = parseInt(count);
});
  return colorObject
}

const validGames = []
for(game of games){
  const gamej = { id: parseInt(game.split(":")[0].replace("Game ", '')), sets: game.split(":")[1].trim().split(";") }
    const tmp = gamej.sets.map((v) => (isPossible(v)))
      gamej['valid'] = tmp.reduce((accumulator, currentValue) => accumulator && currentValue, true)
      gamej['maxColor'] = gamej.sets.map((v) => (countColors(v))).reduce((accumulator, currentObject) => {
    for (const color in currentObject) {
        if (!accumulator[color] || currentObject[color] > accumulator[color]) {
            accumulator[color] = currentObject[color];
        }
    }
    return accumulator;
}, {});
  console.log(gamej)
  power += gamej.maxColor.red * gamej.maxColor.green * gamej.maxColor.blue 
  if(gamej.valid){
    validGames.push(gamej)
    counter += gamej.id
  }
    
}
console.log(power)
document.getElementById("sol1").innerHTML += ": " + counter;
document.getElementById("sol2").innerHTML += ": " + power;