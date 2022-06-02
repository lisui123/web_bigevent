$(function(){
    const initArtCateList =()=>{
        $.ajax({
            type:'GET',
            url:'/my/article/cates',
            success:res=>{
                console.log(res);
                const htmlStr=template('tpl-table',res)
                $('tbody').empty().html(htmlStr)
            }

        })
    }
    initArtCateList()
    // 新增文章
    let indexAdd=null
    $('#btnAddCate').click(()=>{
      indexAdd = layer.open({
            type: 1,
            area: ["500px", "250px"],
            title: "添加文章分类",
            content: $('#dialog-add').html(),

        });
    })

    $('body').on('submit','#form-add',function(e){
        e.preventDefault()
        $.ajax({
            type:'POST',
            url:'/my/article/addcates',
            data:$(this).serialize(),
            success:(res)=>{
                if(res.status!==0)return layer.msg('新增文章失败')
                layer.msg('新增文章成功')
                initArtCateList()
                layer.close(indexAdd)
            }
        })
    })

    let indexEdit=null
    $('tbody').on('click','.btn-edit',function(){
       indexEdit= layer.open({
            type:1,
            area:['500px','250px'],
            title: "修改文章分类",
            content: $("#dialog-edit").html(),
        })
        const id = $(this).attr('data-id')
        $.ajax({
            type:'GET',
            url:'/my/article/cates/'+id,
            success:(res)=>{
                console.log(res);
                layui.form.val('form-edit',res.data)
            }
        })
    })

    $('body').on('submit','#form-edit',function(e){
        e.preventDefault()
        $.ajax({
            type:'POST',
            url:'/my/article/updatecate',
            data:$(this).serialize(),
            success:(res)=>{
                // console.log(res);
                if(res.status!==0)return layer.msg('跟新数据失败')
                layer.msg('更新数据成功')
                initArtCateList()
                layer.close(indexEdit)
            }
        })
    })

    $('tbody').on('click','.btn-del',function(){
        const id=$(this).attr('data-id')
        layer.confirm("确定删除吗？", { icon: 3, title: "提示" }, function (index){
            $.ajax({
                type:'GET',
                url:'/my/article/deletecate/'+id,
                success:res=>{
                    if(res.status!==0)return layer.msg('删除文章分类失败')
                    layer.msg('删除文章分类成功')
                    initArtCateList()
                    layer.close(index);
                }
            })
       
        })
    })
})