const path = require('path');

const PATHS = {
    app: [
        path.join(__dirname, 'bower_components/jquery/dist/jquery.min.js'),
        path.join(__dirname, 'bower_components/bootstrap/dist/js/bootstrap.min.js')
    ],
    build: path.join(__dirname, 'web/bundle/js/')
};

module.exports = {
    entry: PATHS.app,
    output: {
        path: PATHS.build,
        filename: 'bundle.js'
    },
    watch: true
}