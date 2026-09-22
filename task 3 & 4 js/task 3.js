function analyzeRange(start, end) {
	if (start > end) {
		return "Invalid range";
	}

	let evenCount = 0;
	let oddCount = 0;
	let evenSum = 0;
	let totalSum = 0;

	for (let currentNumber = start; currentNumber <= end; currentNumber++) {
		totalSum += currentNumber;

		if (currentNumber % 2 === 0) {
			evenCount++;
			evenSum += currentNumber;
		} else {
			oddCount++;
		}
	}

	return `Even numbers: ${evenCount}, Odd numbers: ${oddCount}, Even sum: ${evenSum}, Total sum: ${totalSum}`;
}

function countMultiples(start, end, divisor) {
	if (start > end || divisor === 0) {
		return 0;
	}

	let multipleCount = 0;

	for (let currentNumber = start; currentNumber <= end; currentNumber++) {
		if (currentNumber % divisor === 0) {
			multipleCount++;
		}
	}

	return multipleCount;
}

const rangeResult = analyzeRange(1, 10);
console.log(rangeResult);

const multiplesResult = countMultiples(1, 20, 3);
console.log(`Count of multiples of 3 between 1 and 20: ${multiplesResult}`);