#! /usr/bin/env node


import inquirer from 'inquirer'; // inquirer module ko import karna


let myPin = 255244; // Hamara set kiya gaya PIN
let myBalance = 9999999999999; // Hamara account balance


// PIN enter karne ka prompt
let pinNumber = await inquirer.prompt([
    {
        name: 'pinChecker', // Prompt ka naam
        message: 'Apna PIN darj karein', // User ko dikhaya jane wala message
        type: 'number' // Input ka type number hai
    }
]);



// Check karte hain agar entered PIN sahi hai
if (pinNumber.pinChecker === myPin) {
    console.log('Aapka password sahi hai'); // Agar PIN sahi hai
} else {
    console.log('Sahi password darj karein'); // Agar PIN ghalat hai
    process.exit(); // PIN ghalat hone par program exit kar jata hai
}




// Operation select karne ka prompt
let operators = await inquirer.prompt([
    {
        name: 'operator', // Prompt ka naam
        message: 'Aap kya karna chahte hain?', // User ko dikhaya jane wala message
        type: 'list', // Input ka type list hai
        choices: ['Balance Inquiry', 'Cash Withdrawal', 'PIN Change'] // Available choices
    }
]);


if (operators.operator === 'Balance Inquiry') {
    console.log(`Aapka balance hai ${myBalance}`); // Balance inquiry ke liye message



} else if (operators.operator === 'Cash Withdrawal') {
    let userAmount = await inquirer.prompt([
        {
            name: 'selectYourAmount', // Prompt ka naam
            message: 'Apni rakam darj karein', // User ko dikhaya jane wala message
            type: 'list', // Input ka type list hai
            choices: ["1000", '5000', '10000', '50000', 'Other Amount'] // Available amounts
        }
    ]);


    let withdrawalAmount;

    // Agar user 'Other Amount' select kare to prompt karein
    if (userAmount.selectYourAmount === 'Other Amount') {
        let otherAmount = await inquirer.prompt([
            {
                name: 'otherAmount', // Prompt ka naam
                message: 'Aap kitni rakam nikalna chahte hain', // User ko dikhaya jane wala message
                type: 'number' // Input ka type number hai
            }
        ]);


        withdrawalAmount = otherAmount.otherAmount; // User ka entered amount
    } else {
        withdrawalAmount = parseInt(userAmount.selectYourAmount); // Selected amount ko integer mein convert karna
    }



    // Check karte hain agar withdrawal amount balance se zyada na ho
    if (withdrawalAmount > myBalance) {
        console.log('Aapka balance kaafi nahi hai. Choti rakam chunein.'); // Agar balance kaafi nahi hai
    } 
    
    else {
        myBalance -= withdrawalAmount; // Balance se withdrawal amount subtract karna
        console.log(`Aapne successfully ${withdrawalAmount} withdraw kiya. Aapka naya balance hai ${myBalance}.`); // Success message
    }


} else if (operators.operator === 'PIN Change') {
    let newPin = await inquirer.prompt([
        {
            name: 'newPin', // Prompt ka naam
            message: 'Apna naya PIN darj karein', // User ko dikhaya jane wala message
            type: 'number' // Input ka type number hai
        }
    ]);
    myPin = newPin.newPin; // Naya PIN set karna
    console.log('Aapka PIN successfully change ho gaya hai.'); // Success message
}
