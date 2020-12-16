const { exec } = require("child_process");
const { stdout } = require("process");
var process = require("process");
const inquirer = require("inquirer");
const chalk = require("chalk");
const emoji = require("node-emoji");

inquirer
  .prompt([
    {
      type: "input",
      message: "Enter the directory (absolute-path)",
      name: "directory",
    },
  ])
  .then((answers) => {
    let path = "";
    if (answers.directory) path = answers.directory;
    else path = "./";
    inquirer
      .prompt([
        {
          type: "input",
          message: "Enter dependencies (space-separated)",
          name: "dependencies",
        },
      ])
      .then((answers) => {
        dependencies = answers.dependencies;
        inquirer
          .prompt([
            {
              type: "confirm",
              message: "Do you wish to continue",
              name: "confirmation",
            },
          ])
          .then((answers) => {
            if (answers.confirmation) {
              exec(
                `mkdir ${path}/test-fullstack`,
                async (err, stdout, stderr) => {
                  if (stderr) {
                    console.log();
                    console.log(chalk.red("Operation Failed"));
                    console.log();
                    console.log("Error: ", stderr);
                    return;
                  }
                  process.chdir(`${path}/test-fullstack`);
                  exec("mkdir Frontend");
                  exec("mkdir Backend");
                  exec("npm init -y");
                  var child = exec("npm install express " + dependencies);
                  child.on("exit", () => {
                    console.clear();
                    console.log("Goto: " + path + "/test-fullstack");
                    console.log(chalk.blue("Happy Working!"));
                    console.log(emoji.emojify("Made by Siddhant :smile:"));
                    console.log(
                      emoji.emojify(
                        "Drop a :star: in: https://github.com/sid370/cli-fullstack"
                      )
                    );
                    console.log();
                  });
                }
              );
            } else {
              console.log();
              console.log(chalk.red("Operation is cancelled by the User"));
            }
          });
      });
  });
