import CryptoJS from "crypto-js";

const secretKey = process.env.REACT_APP_SECRET_KEY ?? "secretKey";

const secret = () => {
  const encryptData = (data: string): string | null => {
    try {
      return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
    } catch (error) {
      return null;
    }
  };

  const decryptData = (encryptedData: string): string | null => {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
      return bytes.toString(CryptoJS.enc.Utf8);
    } catch (error) {
      return null;
    }
  };

  return { encryptData, decryptData };
};

export { secret };
