const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { endianness } = require("os");

const team = [];

const questions = [
  "Would you like to build a team?",
  "Would you like to add a team member?",
  "Which team member would you like to add?",

  {
    standardQuestions: [
      "What is their name?",
      "What is their Id number?",
      "What is their email address?",
    ],
  },

  {
    Engineer: "What is your engineer's Github name?",
  },

  {
    Manager: "What is your manager's office number?",
  },

  {
    Intern: "What school is your intern from?",
  },
];

engineerQuestions = [
  {
    type: "input",
    message: questions[3].standardQuestions[0],
    name: "name",
  },
  {
    type: "input",
    message: questions[3].standardQuestions[1],
    name: "id",
  },
  {
    type: "input",
    message: questions[3].standardQuestions[2],
    name: "email",
  },
  {
    type: "input",
    message: questions[4].Engineer,
    name: "github",
  },
];

managerQuestions = [
  {
    type: "input",
    message: questions[3].standardQuestions[0],
    name: "name",
  },
  {
    type: "input",
    message: questions[3].standardQuestions[1],
    name: "id",
  },
  {
    type: "input",
    message: questions[3].standardQuestions[2],
    name: "email",
  },
  {
    type: "input",
    message: questions[5].Manager,
    name: "officeNumber",
  },
];

internQuestions = [
  {
    type: "input",
    message: questions[3].standardQuestions[0],
    name: "name",
  },
  {
    type: "input",
    message: questions[3].standardQuestions[1],
    name: "id",
  },
  {
    type: "input",
    message: questions[3].standardQuestions[2],
    name: "email",
  },
  {
    type: "input",
    message: questions[6].Intern,
    name: "school",
  },
];

// request an additional team member
function newMember() {
  inquirer
    .prompt([
      {
        type: "confirm",
        message: questions[1],
        name: "newMember",
      },
    ])
    .then(function (data) {
      if (data.newMember) {
        memType();
      } else {
        renderAll();
      }
    });
}
// Choose which team member you want
function memType() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Which member of your team would you like to add?",
        choices: ["Engineer", "Intern", "Manager"],
        name: "memberType",
      },
    ])
    .then(function (data) {
      if (data.memberType === "Engineer") {
        newEngineer();
      } else if (data.memberType === "Manager") {
        newManager();
      } else if (data.memberType === "Intern") {
        newIntern();
      }
    });
}

// Builds Html Page
function renderAll() {
  console.log("Getting the monkeys to build the page...");
  fs.writeFile(outputPath, render(team), function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Wow they completed the task!");
    }
  });
}

// Engineer Promise
function newEngineer() {
  inquirer.prompt(engineerQuestions).then(function (engineer) {
    let newEngineer = new Engineer(
      engineer.name,
      engineer.id,
      engineer.email,
      engineer.github
    );
    team.push(newEngineer);
    newMember();
  });
}

// Manager Promise
function newManager() {
  inquirer.prompt(managerQuestions).then(function (manager) {
    let newManager = new Manager(
      manager.name,
      manager.id,
      manager.email,
      manager.officeNumber
    );
    team.push(newManager);
    newMember();
  });
}

// Intern Promise
function newIntern() {
  inquirer.prompt(internQuestions).then(function (intern) {
    let newIntern = new Intern(
      intern.name,
      intern.id,
      intern.email,
      intern.school
    );
    team.push(newIntern);
    newMember();
  });
}

// Calling of Promises
async function buildTeam() {
  try {
    let willBuild = await inquirer.prompt([
      {
        type: "confirm",
        message: questions[0],
        name: "yesOrNo",
      },
    ]);

    if (willBuild === false) {
      console.log("Sorry to hear. Good luck with your project!");
    } else {
      memType();
    }
  } catch (err) {
    console.log("Oops something went wrong");
    console.log(err);
  }
}

// Starting team build app
buildTeam();
