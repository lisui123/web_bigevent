$(function(){
    // const layer = layui.layer;
    const form=layui.form
    form.verify({
        nickname:(val)=>{
            if(val.length>6) return '昵称长度必须在 1 ~ 6 个字符之间！'
        }
    })

    const initUser=()=>{
        $.ajax({
            type:'GET',
            url:'/my/userinfo',
            success:(res)=>{
                if(res.status!==0)return layer.msg('获取用户信息失败！')
                console.log(res);
                form.val('formUserInfo',res.data)
            }
        })
    }

    $('#btnReset').click((e)=>{
        e.preventDefault()
        initUser()
    })

    $('.layui-form').submit(function(e){
        e.preventDefault()
        $.ajax({
            type:'POST',
            url:'/my/userinfo',
            data:$(this).serialize(),
            success:res=>{
                if(res.status!==0)return layer.msg('获取用户信息失败！')
                layer.msg('获取用户信息成功！')
                window.parent.getUserInfo();
            }

        })
    })

    initUser()

})