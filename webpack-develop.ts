// @ts-nocheck

import dotenv from "dotenv";
import electronReload from "electron-reload-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import * as path from "path";
import {
  DefinePlugin
} from "webpack";
import merge from "webpack-merge";
import externals from "webpack-node-externals";


dotenv.config({path: "./variable.env"});

const electronReloadPlugin = electronReload({
  path: path.join(__dirname, "dist", "index.js"),
  stopOnClose: true,
  logLevel: 0
});

export const commonMain = {
  target: "electron-main",
  entry: {
    index: "./main/index.ts",
    preload: "./main/preload.ts"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js"
  },
  node: {
    __dirname: false,
    __filename: false
  },
  module: {
    rules: [
      {
        test: /.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader"
        }
      },
      {
        test: /\.node$/,
        loader: "node-loader",
      },
    ]
  },
  resolve: {
    extensions: [".ts", ".js", ".node"]
  }
};

export const commonRenderer = {
  target: "electron-renderer",
  entry: ["./renderer/index.tsx"],
  output: {
    path: path.join(__dirname, "dist"),
    filename: "./script/bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader"
        }
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.js$/,
        enforce: "pre",
        use: {
          loader: "source-map-loader"
        }
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {url: false}
          },
          {
            loader: "sass-loader"
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".scss"]
  },
  plugins: [
    new DefinePlugin({
      "process.env": {},
      "process.env.WEATHER_KEY": JSON.stringify(process.env["WEATHER_KEY"]),
      "global": "globalThis"
    }),
    new HtmlWebpackPlugin({
      template: "./renderer/public/index.html"
    })
  ]
};

export const commonServer = {
  target: "node",
  entry: ["./server/index.ts"],
  output: {
    path: path.join(__dirname, "dist"),
    filename: "server.js"
  },
  externals: [externals()],
  module: {
    rules: [
      {
        test: /.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader"
        }
      },
      {
        test: /\.node$/,
        loader: "node-loader",
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js", ".node"]
  }
};

const main = merge(commonMain, {
  mode: "development",
  devtool: "source-map",
  plugins: [
    electronReloadPlugin()
  ]
});

const renderer = merge(commonRenderer, {
  mode: "development",
  devtool: "source-map",
  plugins: [
    electronReloadPlugin()
  ]
});

const server = merge(commonServer, {
  mode: "development",
  devtool: "source-map"
});

export default [main, renderer, server];