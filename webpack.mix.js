const mix = require('laravel-mix')
const path = require('path')
const s3Plugin = require('webpack-s3-plugin')

let webpackPlugins = []
if (mix.inProduction() && process.env.ASSET_CDN) {
    webpackPlugins = [
        new s3Plugin({
          include: /.*\.(css|js|eot|ttf|woff|woff2)$/,
          s3Options: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: process.env.AWS_DEFAULT_REGION,
          },
          s3UploadOptions: {
            Bucket: process.env.ASSET_CDN_BUCKET,
            CacheControl: 'public, max-age=31536000'
          },
          basePath: 'app',
          directory: 'public'
        })
    ]
}

mix.js('resources/js/app.js', 'public/js')
   .sass('resources/sass/app.scss', 'public/css')
   .webpackConfig({
     output: { chunkFilename: 'js/[name].js?id=[chunkhash]' },
     resolve: {
       alias: {
         'vue$': 'vue/dist/vue.runtime.esm.js',
         '@': path.resolve('resources/js'),
       },
     },
     plugins: webpackPlugins
   })
   .babelConfig({
       plugins: ['@babel/plugin-syntax-dynamic-import']
   })
   .version()

mix.copyDirectory
