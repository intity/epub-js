module.exports = {
    bail: true,
    spec: ["test/**/*.spec.js"],
    color: true,
    reporter: "spec",
    require: [
        "@babel/register",
        "setup.cjs"
    ],
    exit: true
}