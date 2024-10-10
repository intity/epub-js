module.exports = (api) => {
    api.cache(false)

    const presets = [
        [
            "@babel/preset-env",
            {
                useBuiltIns: false
            }
        ]
    ];

    return { presets }
}