// 语法
$.ajaxPrefilter(function(options) {
    // 说明:
    // 1.options:为调用请求的配置对象{
    //     URL:'',
    //     method:'',
    //     ...
    // }
    // 2.函数执行时机:请求发起之前
    // 3. 作用 : 可以获取提供给ajax的配置对象

    console.log(options.url);
    options.url = 'http://www.liulongbin.top:3007' + options.url
})