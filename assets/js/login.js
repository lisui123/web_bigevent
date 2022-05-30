$(function(){
    // 点击去注册账号让 登录框隐藏，注册框显示
  $("#link_reg").click(() => {
    $(".login-box").hide();
    $(".reg-box").show();
  });
  // 点击去登录让 注册框隐藏，登录框显示
  $("#link_login").click(() => {
    $(".login-box").show();
    $(".reg-box").hide();
  });
// 从 LayUI 中获取 form 对象
  const form = layui.form
  const layer = layui.layer
// 通过 form.verify() 方法自定义校验规则
  form.verify({
    //   密码校验规则
      pwd:[/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    // 确认密码校验
      repwd: (value) =>{
        const pwd=$('#form_reg [name=password]').val()
        if(pwd!==value) return "两次密码不一致"
      }
  })

//   const baseUrl='http://www.liulongbin.top:3007'
  $('#form_reg').on('submit',function(e){
      e.preventDefault()
      $.ajax({
          type:'POST',
          url:"/api/reguser",
          data:{
              username:$('#form_reg [name=username]').val(),
              password:$('#form_reg [name=password]').val()
          },
          success:(res)=>{
            if(res.status!==0) return layer.msg('注册失败')
            layer.msg('注册成功')
            $('#link_login').click()
          }
      })
  })

  $('#form_login').on('submit',function(e){
      e.preventDefault()
      $.ajax({
          type:'POST',
          url:"/api/login",
          data:$(this).serialize(),
          success:(res)=>{
            if(res.status!==0) return layer.msg('登陆失败')
            layer.msg('登陆成功')
            localStorage.setItem('token',res.token)
            // console.log(res);
            location.href='/index.html'
          }
      })
  })

})