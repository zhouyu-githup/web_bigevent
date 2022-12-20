$(function() {
    // 点击去注册账号
    $('#link_reg').on('click', function() {
            $('.login-box').hide()
            $('.reg-box').show()
        })
        // 点击去登录账号
    $('#link_login').on('click', function() {
            $('.login-box').show()
            $('.reg-box').hide()
        })
        /* 从layui获取form对象 */
    var form = layui.form //导入form对象
    var layer = layui.layer
        // form.verify()自定义校验
    form.verify({
        pwd: [ //自定义校验密码的规则
            /^[\S]{6,12}$/, '密码必须6到12位,且不能出现空格'
        ],
        // 校验2次密码是否一致的规则
        repwd: function(value) {
            var pwd = $('.reg-box [name=password]').val()
            if (pwd != value) {
                return '两次密码不一致'
            }
        }
    })

    // 监听注册表单的提交事件
    $('#form_reg').on('submit', function(e) {
        e.preventDefault();
        // 发起ajax的请求
        var data = { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() } //请求的参数对象
        $.post('http://www.liulongbin.top:3007/api/reguser', data, function(res) {
            if (res.status !== 0) {
                // return console.log(res.message);//传统方法
                return layer.msg() //layer内置的表单提示消息
            }
            layer.msg('注册成功,请登录')

            // 通过jq模拟人的点击行为
            $('#link_login').click()
        })
    })

    //监听登录表单的提交事件
    $('#form_login').submit(function(e) {
        e.preventDefault() //阻止表单的默认提交行为

        $.ajax({ //手动发起ajax请求
            url: 'http://ajax.frontend.itheima.net/api/login',
            method: 'POST',
            data: $(this).serialize(), //要提交的数据: 通过jq的serialize()方法获取表单数据
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败!')
                }
                layer.msg('登录成功')
                    // console.log(res.token);
                    // 将登录成功获取的token字符串数据存储到localStorage中
                localStorage.setItem('token', res.token)
                    // 登录成功,跳转到后台主页
                location.href = '/index.html'


            }
        })
    })
})