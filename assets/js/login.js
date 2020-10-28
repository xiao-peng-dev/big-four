$(function() {
    $('.link-reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('.link-login').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 注册
    // 验证表单
    var form = layui.form
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        // 确认密码添加规则
        repwd: function(value) {
            var pwd = $('.reg-box input[name=password]').val()
            if (value !== pwd)
                return '两次输入的密码不一致,请重试!'
        }
    })
    $('#reg-form').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: {
                username: $('.reg-box [name=username]').val(),
                password: $('.reg-box [name=password]').val()
            },
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg(res.message)
                $('.link-login').click()
                $('#reg-form')[0].reset()
            }
        })
    })

    // 登录
    $('#login-form').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg(res.message)
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })
    })

})