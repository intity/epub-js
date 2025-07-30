module.exports = (api) => {
    api.cache(false)

    const presets = [
        [
            "@babel/preset-env", {}
        ]
    ]

    return { presets }
}