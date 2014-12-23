var path = require('path');
module.exports = config = {
    root: path.resolve(__dirname),

    env: process.env.NODE_ENV || 'development',

    app: {
        host: 'localhost',
        port: process.env.PORT || 3000,
        cdn: '',
        legacyIntegration: false
    },

    api_proxy: {
        target: 'https://hotpads.com:433',
        port: 3001
    },

    compass: {
        source: 'scss/layouts/**/*.scss',
        sass: 'scss/',
        style: 'nested',
        comments: true,
        output: 'public/generated/css'
    },

    browserify: {
        source: 'browser/**/*.js',
        debug: true,
        transform: 'hbsfy',
        output: 'public/generated/js'
    },


    express_handlebars: {
        defaultLayout: 'main',
        extname: '.hbs',
        layoutsDir: 'templates/layouts',
        partialsDir: 'templates/partials'
    },

    hotpads: {
        hostname: 'hotpads.com',
        port: 80,
        apiPath: '/api/v1/'
    }

};