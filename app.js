const { exec } = require("child_process");
const { stdout } = require("process");
var process = require("process");
const inquirer = require("inquirer");
const chalk = require("chalk");
const emoji = require("node-emoji");
const fs = require('fs')

let serverCode = `const express = require ("express")
const app = express()

const port = 3000 || process.env.port

app.get("/",(req,res)=>{
    res.send("<h1>Server Working</h1>")
})

app.listen(port,()=>{
    console.log("Server running at "+ port)
})`


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
    let name = ""
    
    inquirer.prompt([{
      type: "input",
      message: "Enter name of the project",
      name: "name"
    }]).then(answers=>{
      if (answers.name) name=answers.name
      else name = "cli-fullstack"

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
                `mkdir ${path}/${name}`,
                async (err, stdout, stderr) => {
                  if (stderr) {
                    console.log();
                    console.log(chalk.red("Operation Failed"));
                    console.log();
                    console.log("Error: ", stderr);
                    return;
                  }
                  process.chdir(`${path}/${name}`);
                  exec("mkdir Frontend");
                  exec("mkdir Backend");
                  exec("npm init -y");
                  exec("touch ./Backend/server.js")
                  fs.writeFile("./Backend/server.js",serverCode,(err)=>{
                    if (err) console.log(chalk.red("Server Code Writing Unsuccessful"))
                    return
                  })
                  var child = exec("npm install express " + dependencies);      
                  child.on("exit", () => {
                    console.clear();
                    console.log()
                    console.log("Code : "+path+"test-fullstack")        
                    console.log(chalk.blue("Happy Coding!"));
                    console.log()
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
    })
  });
