const cs_schedule = require('./courses_departmentView_2223_ComputerScience.json');
const top = require('./top.js');
const bottom = require('./bottom');

const courseObjectToArrayOfCourseObjects = (courseObject) => {
    return Object.keys(courseObject).sort()
        .filter(key => !key.match(/CS-101/))
        .map(key => cs_schedule[key]);
}

const multiRowDataForCourse = (course) => {
    const subject_catalog = (course) => `${course['subject']} ${course['catalog']}`;
    const title = course => course['course_title'];
    const units = course => course['units'];

    const numComponents = course['components'].length;

    return [subject_catalog, title, units].map(func => `<td rowspan=${numComponents}>${func(course)}</td>`);
}

const rowDataForComponent = (componentObject) => {

    const section = () => componentObject['section'];
    const componentName = () => componentObject['component'];

    const instructor = () => {
        const firstInstructor = componentObject['instructors'][0];
        return `${firstInstructor['instructor_lName']}, ${firstInstructor['instructor_fName']}`;
    }

    const meeting_pattern = () => componentObject['meeting_pattern'][0]['meeting_pattern'] ?
        componentObject['meeting_pattern'][0]['meeting_pattern'] :
        "";

    const start_time = () => componentObject['meeting_pattern'][0]['start_time'] ?
        componentObject['meeting_pattern'][0]['start_time'] : "";
    const end_time = () => componentObject['meeting_pattern'][0]['start_time'] ?
        componentObject['meeting_pattern'][0]['start_time'] : "";
    const classroom = () => componentObject['meeting_pattern'][0]['facility_name'];

    const componentFunctions = [section, componentName, instructor, meeting_pattern, start_time, end_time, classroom];
    return componentFunctions.map(func => `<td>${func()}</td>`);

}

const printRowDataForCourse = (course) => {
    const multiLineValues = multiRowDataForCourse(course);
    for(let idx = 0; idx < course['components'].length; idx += 1) {
        console.log('<tr>')
        let rowData = rowDataForComponent(course[course['components'][idx]]);
        if( idx === 0 )
            rowData = [...multiLineValues, ...rowData];
        console.log(rowData.join(""));
        console.log('</tr>');
    }
}

const arrayOfObjects = courseObjectToArrayOfCourseObjects(cs_schedule);
console.log(top());
console.log('<table>');
for(let courseIdx = 0; courseIdx < arrayOfObjects.length; courseIdx += 1)
    for(let idx = 0; idx < arrayOfObjects[courseIdx].length; idx += 1) {
        const course = arrayOfObjects[courseIdx][idx];
        printRowDataForCourse(course);
    }
console.log('</table>');
console.log(bottom());
