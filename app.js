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
    message: questions[4].Manager,
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
    message: questions[4].Intern,
    name: "school",
  },
];

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
      if (data.newMember === true) {
        willBuild === true;
      } else {
          renderAll();
      }
    });
}

function renderAll() {
    console.log("Getting the monkeys to build the page...");
    fs.writeFile(outputPath, render(team), function (err) {
        if (err) {
            console.log(err);
        }
        console.log("Wow they completed the task!");
    })
}




// Calling of Promises
async function buildTeam() {
  try {
    const willBuild = await inquirer.prompt([
      {
        type: "confirm",
        message: questions[0],
        name: "yesOrNo",
      },
    ]);

    if (willBuild === false) {
      console.log("Sorry to hear. Good luck with your project!");
    } else {
      const { memberType } = await inquirer.prompt([
        {
          type: "list",
          message: "Which member of your team would you like to add?",
          choices: ["Engineer", "Intern", "Manager"],
          name: "memberType",
        },
      ]);

      if (memberType === "Engineer") {
        const engineer = await inquirer.prompt(engineerQuestions);
        let newEngineer = new Engineer(
          engineer.name,
          engineer.id,
          engineer.email,
          engineer.github
        );
        team.push(newEngineer);
        newMember();
      } else if (memberType === "Manager") {
        const manager = await inquirer.prompt(engineerQuestions);
        let newManager = new Manager(
          manager.name,
          manager.id,
          manager.email,
          manager.officeNumber
        );
        team.push(newManager);
        newMember();
      } else if (memberType === "Intern") {
        const intern = await inquirer.prompt(engineerQuestions);
        let newIntern = new Intern(
          intern.name,
          intern.id,
          intern.email,
          intern.github
        );
        team.push(newIntern);
        newMember();
      }
    }
  } catch (err) {
    console.log("Oops something went wrong");
    console.log(err);
  }
}

// Starting team build app
buildTeam();

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
