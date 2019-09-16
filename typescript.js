module.exports = {
  extends: ["./typescript-with-type", "./typescript-without-type"].map(
    require.resolve
  ),
};
