const autoPrefixer = require('autoprefixer');
module.exports = {
    plugins: [
        autoPrefixer({
            "overrideBrowserslist":["last 2 versions",">1%"]
        })
    ]
}