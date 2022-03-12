const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const team = [];
// select employee role or create html
function promptEmployee() {
    return inquirer 
  .prompt([
    {
    type: "list",
    message: "Select the role of your employee or create HTML if you are done",
    name: "name",
    choices: ["Manager", "Engineer", "Intern", "Create HTML"],
    },
    ])
    .then(val => {
        if (val.name === "Manager") {
            promptManager();
        } else if (val.name === "Engineer") {
            promptEngineer()
        } else if (val.name === "Intern") {
            promptIntern();
        } else if (val.name === "Create HTML") {
            writeHtml(team);
        };
    }); 
};

// create engineer profile
function promptEngineer() {
    return inquirer
    .prompt([
        {
            type : 'text',
            name: 'name',
            message: 'Enter your Employee Name?'
        },
        {
            type: 'text',
            name: 'id',
            message: 'Enter Employee ID?'
        },
        {
            type: 'text',
            name : 'email',
            message : 'Enter Employee email address?'
        },
        {
            type: 'input',
            name: 'github',
            message: "Please enter the engineer's github username."
        }
    ])
    .then(function(answer) {
        let engineer = new Engineer(answer.name, answer.id, answer.email, answer.github)
        team.push(engineer);
        promptEmployee();
    })
};
// create intern profile
function promptIntern() {
    return inquirer
    .prompt([
        {
            type : 'text',
            name: 'name',
            message: 'Enter your Employee Name?'
        },
        {
            type: 'text',
            name: 'id',
            message: 'Enter Employee ID?'
        },
        {
            type: 'text',
            name : 'email',
            message : 'Enter Employee email address?'
        },
        {
            type:'text',
            name:'school',
            message: "What is the Intern's school?"
        },
    ])
    .then(function(answer) {
        const intern = new Intern(answer.name, answer.id, answer.email, answer.school);
        team.push(intern);
        promptEmployee();
    })
};
// create manager profile
function promptManager() {
    return inquirer
    .prompt([
        {
            type : 'text',
            name: 'name',
            message: 'Enter your Employee Name?'
        },
        {
            type: 'text',
            name: 'id',
            message: 'Enter Employee ID?'
        },
        {
            type: 'text',
            name : 'email',
            message : 'Enter Employee email address?'
        },
        {
            type:'text',
            name: 'office',
            message:"What is the Manager's office number?"
        },
    ])
    .then(function(answer) {
        const manager = new Manager(answer.name, answer.id, answer.email, answer.office);
        team.push(manager);
        return promptEmployee();
    })
};

function writeHtml(team) {
    fs.writeFile("./dist/team.html", render(team), err => {
        if (err) {
            console.log(err)
        }else {
            console.log(`Team Profiles Created! in /dist folder.`)
        }
    });
};

promptEmployee();