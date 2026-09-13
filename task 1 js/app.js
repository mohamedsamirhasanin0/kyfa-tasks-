let original_name = "   Sara   ";
let cleaned_name = original_name.trim();
let customer_name = cleaned_name;

console.log(`Original Name: "${original_name}"`);
console.log(`Cleaned Name: "${cleaned_name}"`);

let book_title = "JavaScript Basics";
let unit_price = 150;
let quantity = "3";
let price_delivery = 30;


let numeric_quantity = Number(quantity);


console.log(`Original Quantity: "${quantity}", Type: ${typeof quantity}`);
console.log(`Numeric Quantity: ${numeric_quantity}, Type: ${typeof numeric_quantity}`);



let subtotal = unit_price * numeric_quantity;
let total = subtotal + price_delivery;
let receipt = `
           BOOK ORDER RECEIPT           
Customer Name : ${cleaned_name}
Book Title    : ${book_title}
Unit Price    : $${unit_price.toFixed(2)}
Quantity      : ${numeric_quantity}
Subtotal      : $${subtotal.toFixed(2)}
Shipping      : $${price_delivery.toFixed(2)}
Total         : $${total.toFixed(2)}
`;

console.log(receipt);
