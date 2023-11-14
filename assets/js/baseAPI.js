// 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，
// 会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function(options) {
  // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
  options.url = 'http://ajax.frontend.itheima.net' + options.url
  if (options.url.indexOf('/my/') !== -1) {
      options.headers = {
      Authorization: localStorage.getItem('token') || ''
      }
  }

  // 全局统一挂载 complete 回调函数
  options.complete = function(res) {
    // 调用jq的complete函数: 不论成功还是失败，最终都会调用 complete 回调函数
    if(res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败!") {
      // 强制清空token ,强制跳转到登录页
      localStorage.removeItem("token")
      location.href = '/login.html'
    }
  }
  
})
