"use strict";

var generateColor = function generateColor() {
  return Math.floor(Math.random() * 255) + 1;
};

console.log("RGB(".concat(generateColor(), ", ").concat(generateColor(), ", ").concat(generateColor(), ")"), 'Hi there');