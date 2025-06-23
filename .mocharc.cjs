module.exports = {
    bail: true,
    color: true,
    reporter: "spec",
    require: [
        "@babel/register",
        "setup.js"
    ],
    exit: true
}