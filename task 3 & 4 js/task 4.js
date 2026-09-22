const products = [
	{
		id: 1,
		name: "Wireless Headphones",
		category: "Electronics",
		price: 59.99,
		inStock: true
	},
	{
		id: 2,
		name: "Coffee Mug",
		category: "Home",
		price: 12.5,
		inStock: true
	},
	{
		id: 3,
		name: "Running Shoes",
		category: "Clothing",
		price: 84.99,
		inStock: false
	},
	{
		id: 4,
		name: "Backpack",
		category: "Accessories",
		price: 45,
		inStock: true
	},
	{
		id: 5,
		name: "Notebook",
		category: "Stationery",
		price: 6.75,
		inStock: true
	}
];

console.log("First product:", products[0].name);
console.log("Last product:", products[products.length - 1].name);
console.log("Number of products:", products.length);

for (const product of products) {
	console.log(`${product.name} - ${product.category} - $${product.price} - In stock: ${product.inStock}`);
}

const categories = new Set();
categories.add("Electronics");
categories.add("Home");
categories.add("Clothing");
categories.add("Electronics");

console.log("Selected categories:", categories);
console.log("Selected category count:", categories.size);
console.log("Is Electronics selected?", categories.has("Electronics"));

const currentUser = {
	id: 101,
	name: "Samir Hassanin",
	email: "samira@example.com",
	address: {
		street: "el dawly Street",
		city: "Kafr El Sheikh",
		country: "Egypt"
	}
};

console.log("User city:", currentUser.address.city);

const cartquan = new Map();
cartquan.set(1, 2);
cartquan.set(2, 1);
cartquan.set(4, 3);

console.log("Quantity for product 1:", cartquan.get(1));
console.log("Does product 3 exist in the cart?", cartquan.has(3));
console.log("Cart item count:", cartquan.size);

function calTotal(products, cartquan) {
	let total = 0;

	for (const product of products) {
		const quantity = cartquan.get(product.id) || 0;
		total += product.price * quantity;
	}

	return total;
}

console.log("Cart total:", calTotal(products, cartquan));
