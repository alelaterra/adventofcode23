function stringToMatrix(str) {
    return str.trim().split("\n\n").map((s) => s.trim());
}

function translationMap(destination, source, range){
    for (const [destination, source, range] of maps[index]) {
        if (source <= value && value < source + range) return translate(index + 1, destination + value - source);
    }
}


const matrix = stringToMatrix(input);
const counter1 = 0;
const counter2 = 0;
const initSeeds = matrix[0].split(": ")[1].split(" ").map(x => parseInt(x));
const maps = matrix.slice(1).map(x => x.split("\n").slice(1).map(y => y.split(" ").map(z => parseInt(z))));

let res1 = []
let res2 = []
function translationMap(index, value){
    if (index == maps.length) return value;
    for(const [destination, source, range] of maps[index]){
        if(source <= value && value <= source + range){
            return translationMap(index + 1, destination + value - source);
        }
    }
    return translationMap(index + 1, value)
}
for(const seed of initSeeds){
  res1.push(translationMap(0,seed))
}
let seedsRanges = [];
let mappings = [];

for(let i=0; i<initSeeds.length; i +=2){
  const obj = {start: initSeeds[i], end: initSeeds[i]+initSeeds[i+1]-1}
  seedsRanges.push(obj)
}
for(const index in maps){

  const offsetRange = maps[index].map(([destination, source, range])=>({
      start: source,
      end: source + range -1,
      offset: destination - source
    }));
    let sorted = offsetRange.toSorted((a,b)=>a.start-b.start);
  mappings.push(sorted)
}

for(mi of mappings){
  const first = mi[0]
  if(first.start !== 0){
    mi.unshift({
      start: 0,
      end: first.start -1,
      offset: 0
    })
  }
}
for(mi of mappings){
  for(let i =0; i<mi.length -1; i++){
    const current = mi[i]
    const next = mi[i+1]
      if(current.end +1 !== next.start){
      mi.splice(i+1,0,{
        start: current.end+1,
        end: next.start -1,
        offset: 0
      })
    }
  }
}
for(mi of mappings){
  const last = mi[mi.length-1]
  mi.push({
      start: last.end +1,
      end: Number.MAX_SAFE_INTEGER,
      offset: 0
    })
}
const processMapperInterval = (seed, mapper)=>{
  const current = {...seed};
  const result = [];
  for(mapping of mapper){
    if(mapping.end < current.start){
      continue;
    }
    const end = Math.min(mapping.end, current.end);
    result.push([{
      start: current.start,
      end: end
    },{
      start: current.start + mapping.offset,
      end: end + mapping.offset
    }])
    current.start = end +1;
    if(current.start > current.end){break;}
  } 
  return result.map(([_,mapped])=>mapped)
}

const processSeedIntervals = (seed, mappers) =>{
  let result = [seed];
  for(const mapper of mappers){
    const newResult = [];
    for(const interval of result){
      newResult.push(...processMapperInterval(interval, mapper))
    }
    result = newResult;

  }
  return result
}
const output = seedsRanges.flatMap((s)=>processSeedIntervals(s,mappings)).map((i) => i.start)
console.log("OUT", Math.min(...output))



document.getElementById('sol1').innerHTML += ' ' + res1.sort((a, b) =>{
    return a - b; // Compare function for ascending order
  })[0];
document.getElementById('sol2').innerHTML += ' ' + Math.min(...output)

