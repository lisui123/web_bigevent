$.ajaxPrefilter((option)=>{
    console.log(option);
    option.url='http://www.liulongbin.top:3007'+option.url
    if(option.url.includes('/my/')){
        option.headers={
            Authorization:localStorage.getItem('token')
        }
    }

    option.complete=res=>{
        if(res.responseJSON.status===1&&res.response&&JSON.message==="身份认证失败！"){
            localStorage.removeItem('token')
            location.href='/login.html'
        }
    }
})