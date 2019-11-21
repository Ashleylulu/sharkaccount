/*
* 公用方法
* */
var config = {};
config.pagesize = 15; //页容量
config.pagenumber = 1; //页码
config.successCode = '000'; //请求成功
config.request = (request,url,data) => {
    const promise = new Promise((resolve,reject) => {
        axios({
            method: request,
            url: url,
            data: data,
        }).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    })
    return promise
}
