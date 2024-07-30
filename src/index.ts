#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
const apiLink =
  "https://opentdb.com/api.php?amount=5&category=18&difficulty=easy&type=multiple";

async function main() {
  console.log(chalk.yellowBright.bold("=".repeat(60)));
  console.log(
    chalk.yellowBright.bold("        **BilalCode - Quiz Project**          ")
  );
  console.log(chalk.yellowBright.bold("=".repeat(60)));
}
await main();
let fetchData = async (data: string) => {
  let fetchQuiz: any = await fetch(data);
  let res = await fetchQuiz.json();
  return res.results;
};

let data = await fetchData(apiLink);

function totlecaseName(name:string) {
  return name.replace(/\b\w/g, (char) => char.toUpperCase());
}

let startQuiz = async () => {
  let scoreNum = 0;
  //for username
  let name = await inquirer.prompt([
    {
      name: "fname",
      type: "input",
      message: chalk.bold.black(`What is your name?`),
      validate: (fname) => {
        if (!isNaN(fname)) {
          return chalk.red.bold(`Please enter valid name`);
        } else {
          return true;
        }
      },
    },
  ]);
  //for loop
  for (let i = 0; i < data.length; i++) {
    let answers = [...data[i].incorrect_answers, data[i].correct_answer];

    let ans = await inquirer.prompt([
      {
        name: "quiz",
        type: "list",
        message: data[i].question,
        choices: answers.map((val: any) => val),
      },
    ]);
    if (ans.quiz == data[i].correct_answer) {
      ++scoreNum;
      console.log(`${chalk.bold.italic.blue("Correct")}`);
    } else {
      console.log(
        `Correct Answer ${chalk.bold.italic.red(data[i].correct_answer)}`
      );
    }
  }

  console.log(
    `Dear ${chalk.bold.italic.underline.blue(
      totlecaseName(name.fname)
    )} \nYour Score ${chalk.green.bold(scoreNum)} out of ${chalk.red.bold(
      data.length
    )}`
  );
};
startQuiz();

//! Quiz link
//https://opentdb.com/api_config.php
