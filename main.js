// Json file require
const cs_schedule = require("./cs_prerequisites.json");


let btakeConsecutive = true;

const firstArg = process.argv[2]; 
const secondArg = process.argv[3]; 

const section = 'CS '

const firstClass = section + firstArg;
const secondClass = section + secondArg;

if (cs_schedule.courses[firstClass] === undefined){    
    console.log(firstClass + ' Is Not Valid');
    return
}
if (cs_schedule.courses[secondClass] === undefined){   
    console.log(secondClass + ' Is Not Valid');
    return;
}

const firstPreReq = cs_schedule.courses[firstClass].course_pre_reqs;
const SecondPreReq = cs_schedule.courses[secondClass].course_pre_reqs;

// Check for first class
for (let index = 0; index < firstPreReq.length; index++) {
    const element = firstPreReq[index];

    for (let secIndex = 0; secIndex < element.courses.length; secIndex++) {
        if (element.courses[secIndex][secondClass] !== undefined){
            btakeConsecutive = false;
            break;
        }
    }
}

// Check for second class
for (let index = 0; index < SecondPreReq.length; index++) {
    const element = SecondPreReq[index];

    for (let secIndex = 0; secIndex < element.courses.length; secIndex++) {
        if (element.courses[secIndex][firstClass] !== undefined){
            btakeConsecutive = false;
            break;
        }
    }
}


const output = btakeConsecutive ? (firstArg + ' and ' + secondArg + ' can be taken concurrently.') :
    (firstArg + ' and ' + secondArg + ' can not be taken concurrently.');

console.log(output);