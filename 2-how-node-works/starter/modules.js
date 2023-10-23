const C = require("./test-module-1");

const calc1 = new C();
console.log(calc1.add(10, 20));

const { multiply } = require("./test-module-2");
console.log(multiply(2, 40));
