const crypto = require('crypto');
const ENC_PASS = process.env.PASSWORD_ENC;

module.exports = {
    encryption: function(p){
        const cipher = crypto.createCipher('aes192', ENC_PASS);
        cipher.update(p, 'utf8', 'hex');
        return cipher.final('hex');
    },
    decryption: function(c){
        const decipher = crypto.createDecipher('aes192', ENC_PASS);
        decipher = update(c, 'hex', 'utf8');
        return decipher.final('utf8');
    }
};
