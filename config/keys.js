if (true){
    module.exports = require('./prod');
} else {
    module.exports = require('./dev');
}

// process.env.NODE_ENV === 'production'