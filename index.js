#! /usr/bin/env node
import chalk from "chalk";
import inquirer from "inquirer";
let todos = [];
let while_condition = true;
while (while_condition === true) {
    // ---------------------------------- Options --------------------------------------
    let option = await inquirer.prompt([
        {
            type: "list",
            name: "user_option",
            message: ("Select an option"),
            choices: ["Add", "Delete", "Update", "Read",],
        }
    ]);
    // ---------------------------------- Add --------------------------------------
    if (option.user_option === "Add") {
        let ans = await inquirer.prompt([
            {
                type: "input",
                name: "user_ans",
                message: ("Write Somthing to Add in your Todo List"),
            },
        ]);
        if (ans.user_ans !== "") {
            todos.push(ans.user_ans);
            console.log(todos);
        }
        else {
            console.log(chalk.bgRed("Please Write Something To Add !!!"));
        }
    }
    // ---------------------------------- Delete --------------------------------------
    else if (option.user_option === "Delete") {
        let removeChoice = await inquirer.prompt([
            {
                type: "list",
                name: "remove_item",
                message: chalk.bgRed("Select item to remove"),
                choices: todos,
            }
        ]);
        let index_to_remove = todos.indexOf(removeChoice.remove_item);
        if (index_to_remove >= 0) {
            todos.splice(index_to_remove, 1);
            console.log(`You Deleted : ${removeChoice.remove_item}`);
            console.log(todos);
        }
    }
    // ---------------------------------- Update --------------------------------------
    else if (option.user_option === "Update") {
        let { select_item, updated_item } = await inquirer.prompt([
            {
                type: "list",
                name: "select_item",
                message: "Select item to update",
                choices: todos,
            },
            {
                type: "input",
                name: "updated_item",
                message: "Enter updated item",
            },
        ]);
        let index_to_update = todos.indexOf(select_item);
        if (index_to_update >= 0) {
            todos[index_to_update] = updated_item;
            console.log(`You Updated : ${select_item} to ${updated_item}`);
            console.log(todos);
        }
        else {
            console.log(chalk.bgRed("Item not found !!!"));
        }
        ;
        if (updated_item === "") {
            console.log(chalk.bgRed("Please Write Something To Update !!!"));
        }
    }
    // ---------------------------------- Read --------------------------------------
    else if (option.user_option === "Read") {
        console.log(todos);
    }
    ;
    // ----------------------------------Exit --------------------------------------
    let user_ans = await inquirer.prompt([
        {
            type: "confirm",
            name: "selection",
            message: "Do You Want To Continue ?",
            default: true,
        }
    ]);
    if (user_ans.selection === false) {
        while_condition = false;
    }
    ;
}
;
