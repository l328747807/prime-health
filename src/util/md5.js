import md5 from 'js-md5'
//将字符串进行md5加密
function str2Md5(str){
    return md5(md5(str).split('').reverse().join(''))
}
export {
    str2Md5
}