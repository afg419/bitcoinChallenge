
//development env
module.exports = {
    name: 'Bitcoin Challenge DB',
    version: '1.0.0',
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    mongo: {
        url: process.env.MONGODB_URI || 'mongodb://localhost/bitcoinChallenge'
    }
};