// @ts-nocheck

import merge from "webpack-merge";
import {commonMain, commonRenderer, commonServer} from "./webpack-develop";


const main = merge(commonMain, {
  mode: "production"
});

const renderer = merge(commonRenderer, {
  mode: "production"
});

const server = merge(commonServer, {
  mode: "production"
});

export default [main, renderer];