module.exports = {
  default: {
    requireModule: ["ts-node/register"],
    require: [
      "features/step_definitions/**/*.ts",
      "test-base.ts"
    ]
  }
};