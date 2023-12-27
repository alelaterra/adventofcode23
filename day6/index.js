// const race = {
//   time:
//   record:
// }
const times = input.trim().split('\n')[0].split(':')[1].split(' ').map((w) => parseInt(w)).filter((w) => !isNaN(w))
const records = input.trim().split('\n')[1].split(':')[1].split(' ').map((w) => parseInt(w)).filter((w) => !isNaN(w))
const races = times.map((t,i) =>
{
  return {
    time: t,
    record: records[i]

  }
})
let result1 = 1;

for(const race of races){
  let results = [];
  for(let i = 0; i <= race.time; i++){
    const distance = i * (race.time - i)
    if(distance > race.record)
      results.push(distance)
  }
  result1 *= results.length
  
}
const races2 = {time: times.join(''), record: records.join('')}
console.log(races2)
//SLOW BUT WORK, Can speed up with binary search and after linear search :D 
let counter = 0
for(let i = 0; i <= races2.time; i++){
  const distance = i * (races2.time - i)
  if(distance > races2.record)
    counter++;
}
console.log(counter)

document.getElementById('sol1').innerHTML += ': ' + result1;

document.getElementById('sol2').innerHTML += ': ' + Math.min(...output)

