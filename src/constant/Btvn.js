
// Bai 1
function Sum_divisors(n) {
  let arr = [];  // intialize array
  let Sum = 0;  // intialize sum = 0
  for (let i = 1; i <= n; i++) {  // loop from 1 to n
    if (n % i === 0) {   // if i is divisor of n
  // push i to array
      arr.push(i);
      // sum al the arr[i] elements
        Sum += i;
    }
  }
  return Sum;
}
// bai 2
function Product_divisor(n){
    let arr = []; // intialize array
    let Product = 1;  // intialize product = 1
    for (let i = 1; i <= n; i++) {
        if (n % i === 0) {  // if i is a divisor of n
        arr.push(i);  // push i to array
        // get product of all arr[i] elements
        Product *= i;
        }
    }
    return Product;
}
// bai 3
function Count_divisor(n){
    let count = 0; // intialize count =0
    for (let i = 1; i <= n; i++) {
        if (n % i === 0) {
            count++;  // increment count by 1
        }
    }
    return count;
}
// bai 4 
function Odd_divisor(n){
    let arr = []; // intialize array
    for (let i = 1; i <= n; i++) {  // loop from 1 to n
        if (n % i === 0) {  // if i is divisor of n
            if (i % 2 !== 0) { // if i is odd
                arr.push(i); // push i to array
            }
        }
    }
    return arr;
}
// bai 5
function Even_Divisor(n) {
    let arr = []; // intialize array
    for (let i = 1; i <= n; i++) {  // loop from 1 to n
        if (n % i === 0) {  // if i is divisor of n
            if (i % 2 === 0) { // if i is even
                arr.push(i); // push i to array
            }
        }
    }
    return arr;
}

// bai 6 
function Product_Odd_Divisor(n) {
    let arr = []; // intialize array
    let Product = 1;  // intialize product = 1
    for (let i = 1; i <= n; i++) {
        if (n % i === 0) {  // if i is divisor of n
            if (i % 2 !== 0) { // if i is odd
                arr.push(i); // push i to array
                // get product of all arr[i] elements
                Product *= i;
            }
        }
    }
    return Product;
}