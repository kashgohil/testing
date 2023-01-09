import CommonJsPlugin from "@rollup/plugin-commonjs";
import ResolvePlugin from "@rollup/plugin-node-resolve";
import TypescriptPlugin from "@rollup/plugin-typescript";
import DTSPlugin from "rollup-plugin-dts";
import ExternalPeerDepsPlugin from "rollup-plugin-peer-deps-external";
import PostCSSPlugin from "rollup-plugin-postcss";
import SCSSPlugin from "rollup-plugin-scss";
import { terser as TerserPlugin } from "rollup-plugin-terser";

const packageJson = require("./package.json");

export default [
  {
    input: "src/index.tsx",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
        name: "components",
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      ExternalPeerDepsPlugin(),
      ResolvePlugin(),
      CommonJsPlugin(),
      TypescriptPlugin({
        tsconfig: "./tsconfig.json",
      }),
      PostCSSPlugin(),
      TerserPlugin(),
      SCSSPlugin(),
    ],
  },
  {
    input: "build/esm/types/index.d.ts",
    output: [{ file: "build/index.d.ts", format: "esm" }],
    external: [/\.css$/],
    plugins: [DTSPlugin.default()],
  },
];
