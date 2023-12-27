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



document.getElementById('sol1').innerHTML += ': ' + result1;

document.getElementById('sol2').innerHTML += ': ' + Math.min(...output)

