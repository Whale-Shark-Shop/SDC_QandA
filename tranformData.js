var fs = require ('fs');

const stream = fs.createReadStream("./questionsSample.csv");
const reader = require("readline").createInterface({ input: stream })

let result = [];

// reader.on('data', function(chunk) {
//   console.log(chunk.toString());
//   result.push(chunk.toString());
//   console.log(result);
//   // return chunk;
// })

// reader.on('line', function(chunk) {
//   result.push(chunk);
//   console.log(result);
// })

let count = 0;
let lengthCheck = [];
reader.on('line', function(chunk, splitRow = (result) => {
  // result.map(el => {
  //   return el.split(',');
  // })
  console.log(result);
  console.log('this is the length', result.length);
  lengthCheck.push(result.length);
}) {
    result.push(chunk.split(','));
    count++;
    splitRow(result);
  }
)

setTimeout(() => {console.log(count)}, 2000);
setTimeout(() => {console.log('this is the length', lengthCheck)}, 2000);
// console.log(result);