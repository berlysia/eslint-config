module.exports = {
  extends: ["./typescript-with-type", "./typescript-without-type"].map((x) =>
    require.resolve(x)
  ),
};
