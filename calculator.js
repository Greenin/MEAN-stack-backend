'use strict'

var aParams = process.argv.slice(2);

var nNumber1 = parseFloat(aParams[0]);
var nNumber2 = parseFloat(aParams[1]);

var sTemplate = `
Addition is: ${nNumber1 + nNumber2}
Subtraction is: ${nNumber1 - nNumber2}
Multiplication is: ${nNumber1*nNumber2}
Division is: ${nNumber1/nNumber2}
`;

console.log(sTemplate);
console.log(nNumber1);
console.log(nNumber2);
//console.log(aParams);
console.log("hello world with NodeJS");