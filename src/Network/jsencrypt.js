import { sm4 } from "jxk";

// @ts-ignore
// const SM4Key = window.storageKey || 'b854a476bb97a0e9a9a4b214b2c6558a'
// sm4对字符串加密
export function encrypt(originalData, SM4Key) {
  if (originalData === '' || originalData === null || originalData === undefined) {
    return originalData
  }
  try {
    return SM4Key ? sm4.encrypt(originalData+'', SM4Key) : originalData;
  } catch (error) {
    return originalData;
  }
}

// sm4对字符串解密
export function decrypt(encryptedData, SM4Key) {
  if (encryptedData === '' || encryptedData === null || encryptedData === undefined) {
    return encryptedData
  }
  try {
    return SM4Key ? sm4.decrypt(encryptedData, SM4Key) : encryptedData;
  } catch (error) {
    return encryptedData;
  }
}

export const Z = Symbol.for('cleartext')






//  递归解密
/**
 * Recursively decrypts values within a given object or array.
 * @param data - The data to decrypt, can be an object, array, or primitive.
 * @param SM4Key - The decryption key.
 * @returns The decrypted data structure.
 */
export function deepLoopDecrypt(data, SM4Key) {
  if (isFormData(data)) {
    return data;
  } else if (isObject(data)) {
    return Object.fromEntries(
      // @ts-ignore
      Object.entries(data).map(([key, value]) => [key, deepLoopDecrypt(value, SM4Key)])
    );
  } else if (Array.isArray(data)) {
    return data.map(item => deepLoopDecrypt(item, SM4Key));
  } else {
    return decrypt(data, SM4Key); // Assuming decrypt expects a string
  }
}
/**
 * @param {Object} o
 * @returns Boolean
 */
export const isObject = (o) => {
  return Object.prototype.toString.call(o) === '[object Object]'
}

/**
 * @param {Object} o
 * @returns Boolean
 */
export const isFormData = (o) => {
  return Object.prototype.toString.call(o) === '[object FormData]'
}

/**
 * @param {Object} o
 * @returns Boolean
 */
export const isFile = (o) => {
  return Object.prototype.toString.call(o) === '[object File]'
}

// 不需要加密的api白名单列表
const apiWhiteList = [
  // 系统通用接口-获取部门名称
  // "/system/dept/getDeptByName"
]

/**
 * 需要对path入参的参数进行加密
 * eg: /getxxByPhone/13333333333
 * eg: /getxxByIdCard/1101001999xxxx
 */
const isEncryptionPath = (url) => {
  const idCardRegex = /(\d{15})|(\d{17}([0-9]|X))/
  const mobileRegex = /1(3|4|5|7|8)\d{9}/
  return idCardRegex.test(url) || mobileRegex.test(url)
}
