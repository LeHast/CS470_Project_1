// Json file require
const cs_schedule = require("./cs_prerequisites.json");


// preReq structure requirement:
// preReq = 
//   courses: [
//     {
//       "CS 315": {
//         catalog: "315",
//         min_grade: "C-",
//         subject: "CS",
//       },
//     },
//   ],
//   num_required: 1,
// }

// toCompareClass is a string, for the key. If the string is the preReq returns false.
// toCompareClass = "CS 315".

const CheckForRequirements = (preReq, toCompareClass) => {
    // Goes for every course in the array.
    for (let index = 0; index < preReq.length; index++) {
        if (!btakeConsecutive) // Base case.
            return;
        
        const element = preReq[index];
        if (element.courses[index] === undefined)
            return; 
        
        // Gets the keys and foreach key is going to call CheckForRequirements for a deep search.
        const arrayKeys = Object.keys(element.courses[index]);
        arrayKeys.forEach(
            inKey =>{ 
            const deepPreReq = cs_schedule.courses[inKey].course_pre_reqs;
            CheckForRequirements(deepPreReq, toCompareClass);
        });

        // Checks if toCompareClass is the preReq course from the element.
        // If there is a course in the list with the string toCompareClass returns false.
        for (let secIndex = 0; secIndex < element.courses.length; secIndex++) {
            if (element.courses[secIndex][toCompareClass] !== undefined){
                btakeConsecutive = false;
                return;
            }
            if (!btakeConsecutive)
            return;
        }
    }
}



// App starts here.
let btakeConsecutive = true;

// Gets only the arguments from the user, ex: 351 450.
if (process.argv.length < 4){
    console.log ("2 arguments need it");
    return;
}


const firstArg = process.argv[2]; 
const secondArg = process.argv[3]; 


// Adds 'CS ' to the numbers to complete the course name, ex: CS 315.
const section = 'CS '
const firstClass = section + firstArg;
const secondClass = section + secondArg;

// Check if the 2 arguments are valid
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

CheckForRequirements(firstPreReq, secondClass);
if (btakeConsecutive)
    CheckForRequirements(SecondPreReq, firstClass);

const output = btakeConsecutive ? (firstArg + ' and ' + secondArg + ' can be taken concurrently.') :
    (firstArg + ' and ' + secondArg + ' can not be taken concurrently.');

console.log(output);