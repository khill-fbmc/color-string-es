import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

/** @type {import('rollup').RollupOptions} */
export default {
	input: "./src/index.js",
	output: {
		format: "esm",
		file: "./dist/index.js",
		generatedCode: "es2015",
	},
	plugins: [nodeResolve(), commonjs()],
};
