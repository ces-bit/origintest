$(function() {

    $('.zhuce').on('click', function() {
        $('.login').hide();
        $('.relogin').show();
    })
    $('.denglu').on('click', function() {
        $('.login').show();
        $('.relogin').hide();
    })
    var form = layui.form;
    var layer = layui.layer;

    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function(value) {
            var pas = $('.relogin [name=password]').val();
            if (pas !== value) {
                layer.msg('两次密码不一样');

            }
        }
    })
    $('#form-reg').on('submit', function(e) {
            e.preventDefault();
            var data = { uername: $('#form-reg input[name=username]').val(), password: $('#form-reg input[name=password]').val() };
            $.post('/api/reguser', data, function(res) {
                if (res.status !== 0) return layer.msg(res.message);
                layer.msg('注册成功');
            })
        })
        // 监听登录表单的提交事件
    $('#form_login').submit(function(e) {
        // 阻止默认提交行为
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            // 快速获取表单中的数据
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功！')
                    // 将登录成功得到的 token 字符串，保存到 localStorage 中
                localStorage.setItem('token', res.token)
                    // 跳转到后台主页
                location.href = '/index.html'
            }
        })
    })



})