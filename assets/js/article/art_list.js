$(function(){
    const q={
        pagenum: 1, // 页码值，默认请求第一页的数据
        pagesize: 2, // 每页显示几条数据，默认每页显示2条
        cate_id: "", // 文章分类的 Id
        state: "", // 文章的发布状态
    }
    // 获取表格数据
    const initTable=()=>{
        $.ajax({
            type:'GET',
            url:'/my/article/list',
            data:q,
            success:(res)=>{
                if(res.status!==0)return layer.msg('获取失败')
                const htmlStr=template('tpl-table',res)
                $('tbody').html(htmlStr)
                renderPage(res.total)
            }
        })
    }
    initTable()

    // 文章分类数据
    const form=layui.form
    const initCate=()=>{
        $.ajax({
            method:'GET',
            url:'/my/article/cates',
            success:(res)=>{
                // console.log(res);
                if(res.status!==0)return layer.msg('失败')
                const htmlStr=template('tpl-cate',res)
                $('[name=cate_id]').html(htmlStr)
                // 通过 layui 重新渲染表单区域的UI结构
                form.render();
            }
        })
    }
    $('#form-search').submit((e)=>{
        e.preventDefault();
        q.cate_id=$('[name=cate_id]').val()
        q.state=$('[name=state]').val()

        initTable()
    })
    const laypage=layui.laypage
    function renderPage(total){
        laypage.render({
            elem: 'pageBox', // 分页容器的 Id
            count: total, // 总数据条数
            limit: q.pagesize, // 每页显示几条数据
            curr: q.pagenum ,// 设置默认被选中的分页
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],// 每页展示多少条

             // 分页发生切换的时候，触发 jump 回调
            jump:(obj,first)=>{
                console.log(obj);
                console.log(first);
                // 把最新的页码值，赋值到 q 这个查询参数对象中
                q.pagenum=obj.curr
                q.pagesize=obj.limit
                
                if(!first){
                    initTable()
                }
            }
        })
    }

    // 删除
    $('tbody').on('click','.btn-delete', function(){
        const length=$('.btn-delete').length
        console.log(length);
        const id= $(this).attr('data-id')
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
        $.ajax({
            type:'GET',
            url:'/my/article/delete/'+id,
            success: function(res){
                if(res.status!==0)return layer.msg('失败')
                layer.msg('成功')
                if(length===1){
                    q.pagenum=q.pagenum===1?1 : q.pagenum-1
                }
                initTable()
                layer.close(index)
                }
            })
        })
    })

    initCate()

    // 定义美化时间的过滤器
    template.defaults.imports.dataFormat = function(date) {
        const dt = new Date(date)

        var y = dt.getFullYear()
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())

        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())

        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }

    // 定义补零的函数
    function padZero(n) {
        return n > 9 ? n : '0' + n
    }
})