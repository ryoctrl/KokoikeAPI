const crypto = require('crypto');
const ENC_PASS = process.env.PASSWORD_ENC;

module.exports = {
    encryption: function(p){
        const cipher = crypto.createCipher('aes192', ENC_PASS);
        let result = cipher.update(p, 'utf-8', 'hex');
        result += cipher.final('hex');
        return result;
    },
    decryption: function(c){
        const decipher = crypto.createDecipher('aes192', ENC_PASS);
        let result = decipher.update(c, 'hex', 'utf8');
        result += decipher.final('utf-8');
        return result;
    },
    generateToken: function(c) {
        const bytes = crypto.randomBytes(32);
        return bytes.toString('hex');
    }
};
