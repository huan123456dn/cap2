let today = new Date(); //"2021-11-12"

export const createDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

export const createHours = today.getHours() + ':' +today.getMinutes() +':'+today.getSeconds()