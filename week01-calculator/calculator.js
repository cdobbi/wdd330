let calculator = {
  add: function (a, b) {
    return a + b;
  },
  subtract: function (a, b) {
    return a - b;
  },
  multiply: function (a, b) {
    return a * b;
  },
};

console.log(calculator.add(2, 3)); // output: 5
console.log(calculator.subtract(5, 2)); // output: 3
console.log(calculator.multiply(3, 4)); // output: 12
