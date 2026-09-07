module.exports = (api) => {
  api.cache(false);

  const presets = [
    ["@babel/preset-env", {
      "modules": "commonjs"
    }]
  ];

  return { presets };
};
