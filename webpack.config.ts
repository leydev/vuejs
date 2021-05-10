import type { Configuration, WebpackPluginInstance } from 'webpack';
import { VueLoaderPlugin } from 'vue-loader';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

function canExtractCss(env: string){
  if (env === 'production') return MiniCssExtractPlugin.loader;
  return 'vue-style-loader';
}

const config: Configuration = {
  entry: 'src/main.ts',
  watchOptions: {
    ignored: [
      'node_modules',
      '*.log',
      'tsconfig.json',
      'package.json',
    ],
  },
  optimization: {
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          priority: -10,
          chunks: 'all',
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/],
        }
      },
      { 
        test: /\.vue$/, 
        loader: 'vue-loader'
      },
      {
        test: /\.(png|jpe?g|gif|webm|mp4|svg)$/,
        loader: 'file-loader',
        options: {
          outputPath: 'assets',
          esModule: false,
        },
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(eot|ttf|woff|woff2)(\?\S*)?$/,
        loader: 'file-loader',
        options: {
          name: '[name][contenthash:8].[ext]',
        },
      },
      {
        test: /\.css$/,
        use: [
          canExtractCss(process.env.NODE_ENV as string),
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    // make sure to include the plugin for the magic
    new VueLoaderPlugin() as WebpackPluginInstance,
    new HtmlWebpackPlugin({ template: './public/index.html' }),
    new MiniCssExtractPlugin({ filename: 'style.css' })
  ]
}

export default config;
