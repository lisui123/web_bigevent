function getUserInfo(){
    $.ajax({
        type:'GET',
        url:'/my/userinfo',
        // headers:{
        //     Authorization: localStorage.getItem("token"),
        // },
        success:res=>{
            if(res.status !==0) return layer.msg('获取信息失败')
            layer.msg('获取信息成功')
            console.log(res);
            renderAvatar(res.data)
        }
    })
}

function renderAvatar(user){
    let uname=user.nickname || user.username
    $('#welcome').html(`欢迎 ${uname}`)
    if(user.user_pic!==null){
        $('.layui-nav-img').attr('src',user.user_pic)
        $('.text-avatar').hide()
    }else{
        $('.layui-nav-img').hide()
        $('.text-avatar').html(uname[0].toUpperCase())
    }
}

$('.btnout').click(()=>{
    layer.confirm('是否退出？',{icon:3,title:'提示'},function(index){
        localStorage.removeItem('token')
        location.href='/login.html'
    })
})


getUserInfo()