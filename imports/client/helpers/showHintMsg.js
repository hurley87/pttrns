// TODO: add pttrn's hints for each possible question and find a way to refactor
export default function showHintMsg(state) {
	switch(state.operator) {
		case '+':
			for(var i = 1; i <= 9; i++) {
				for(var n = 1; n <= i; n++) {
					if(state.num1 == i && state.num2 == n) {
						return i + n <= 10 ? countOn(i, n) : anchor10(i, n);
					}
				}
			}
		default:
			return "Opps, that wasn't the right answer. Try that one again."
	}
}

function countOn(i, n) {
	return 'Use Count-On. Start with ' + i + ' and say "' + countOnWords(countOnArr(i , n)) + '".'
}

function anchor10(i, n) {
	const sum = i + n;
	let remainder = 10 - i;
	let decomp = n - remainder;
	return 'Use Anchor10. Start with ' + integerToWord(i) + '. Recognize that ' + n + ' is ' + remainder + '+' + decomp + '.' +
		" So think of " + i + '+' + n + " as " + i + "+" + remainder + '+' + decomp + " = 10+" + decomp + " = " + sum;
}

function countOnWords(arr) {
	return arr.map( i => integerToWord(i)).join(', ');
}

function countOnArr(i , n) {
	const sum = i + n;
	let arr = [];
	for(var x = i; x <= sum; x++) {
		arr.push(x);
	}
	return arr;
}

function integerToWord(num) {
	switch(num) {
		case 1:
			return 'one';
		case 2:
			return 'two';
		case 3: 
			return 'three';
		case 4:
			return 'four';
		case 5: 
			return 'five';
		case 6:
			return 'six';
		case 7:
			return 'seven';
		case 8:
			return 'eight';
		case 9:
			return 'nine';
		case 10:
			return 'ten';
		default:
			return 'zero';
	}
}
