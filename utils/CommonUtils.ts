import cryptoJs from 'crypto-js';

export default class CommonUtils {
    
    private secretKey: string;
    constructor() {
        // this.secretKey = process.env.SECRET_KEY? process.env.SECRET_KEY : 'Error: SecretKey is undefiened';
        if(process.env.SECRET_KEY) {
            this.secretKey = process.env.SECRET_KEY;
        }else {
            throw new Error('Error: SecretKey is undefined. Please set the SECRET_KEY environment variable.');
        }
    }
    /**
     * Encrypts a given string using AES encryption.
     * @param {string} text - The string to encrypt.
     * @returns {string} - The encrypted string in Base64 format.
     */
    public encrypt(data: string): string {
        
        const encrptedData= cryptoJs.AES.encrypt(data,this.secretKey).toString();
        console.log(`Encrypted Data: ${encrptedData}`);
        return encrptedData;
    }

    /**
     * Decrypts a given Base64 encoded string using AES decryption.
     * @param {string} encryptedData - The Base64 encoded string to decrypt.
     * @returns {string} - The decrypted string.
     */ 

    public decrypt(encryptedData: string): string {
        const bytes = cryptoJs.AES.decrypt(encryptedData, this.secretKey);
        const decryptedData = bytes.toString(cryptoJs.enc.Utf8);
        // console.log(`Decrypted Data: ${decryptedData}`);
        return decryptedData;
    }
}
