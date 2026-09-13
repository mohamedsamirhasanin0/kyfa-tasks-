const ageInput = "20";

const hasTicket = true;

const isMember = false;

const ticketType = "vip";

let availableSeats = 5;

const age = parseInt(ageInput);

let isAdult = age >= 18;

console.log(age);

console.log(typeof age);

console.log(isAdult);

let user_access;
if (age >= 18 && hasTicket == true && availableSeats > 0) {
    user_access = "can enter";
    console.log(user_access);
    
} else {
    user_access = "cannot enter";
    console.log(user_access);
}
 
let ticket_price;
if (user_access == "can enter") {
    
   if (ticketType == "vip") {
        ticket_price = 500;
    }
    else if (ticketType == "regular") {
        ticket_price = 200;
    }
    else if (ticketType == "student") {
        ticket_price = 150;
    }
    else {
     console.log("unknown ticket type");    
    } 
    availableSeats = availableSeats - 1;
} 
else {
    console.log("user is not allowed to enter");    
}

if (isMember == true) {
    ticket_price = ticket_price - 50;
    console.log("your ticket price after discount" + ticket_price);
}
   
console.log("age = " + age);
console.log("is adult : " + isAdult);
console.log("has ticket : " + hasTicket);
console.log("available seats = " + availableSeats);
console.log(user_access);
console.log("ticket type : " + ticketType);
console.log("is member : " + isMember);
console.log("final price = " + ticket_price);

/*Debugging Challenge
This program has a logic problem:
const acceptedTerms = "false";
if (acceptedTerms) {
console.log("Terms accepted");
} else {
console.log("Terms not accepted");
}*/


//there are 2 solves


/*1:
const acceptedTerms = false;
if (acceptedTerms) {
console.log("Terms accepted");
} else {
console.log("Terms not accepted");
}*/


/*2:
const acceptedTerms = "false";
if (acceptedTerms == "true") {
    console.log("Terms accepted");
} else {
    console.log("Terms not accepted");
}*/

    



    
