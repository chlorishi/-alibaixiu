template.defaults.imports.dateFormat = formatDate;
//格式化日期
function formatDate(date) {
    date = new Date(date);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
};
//随即推荐数据
$.ajax({
    url: '/posts/random',
    type: 'get',
    success: function(response) {
        var randomTpl = `   
        {{each data}}
        <li>
        <a href="detail.html?id={{$value._id}}">
            <p class="title">{{$value.title}}</p>
            <p class="reading">阅读({{$value.meta.views}})</p>
            <div class="pic">
                <img src="{{$value.thumbnail}}" alt="">
            </div>
        </a>
    </li>
    {{/each}}`
        var html = template.render(randomTpl, {
            data: response
        });
        $('#randomBox').html(html);
    }
});
//最新评论数据
$.ajax({
    url: '/comments/lasted',
    type: 'get',
    success: function(response) {
        var commentsTpl = `   
        {{each data}}
        <li>
         <a href="javascript:;">
             <div class="avatar">
                 <img src="{{$value.author.avatar}}" alt="">
             </div>
             <div class="txt">
                 <p>
                     <span>{{$value.author.nickName}}</span>{{dateFormat($value.createAt)}}说:
                 </p>
                 <p>{{$value.content}}</p>
             </div>
         </a>
     </li>
    {{/each}}`
        var html = template.render(commentsTpl, {
            data: response
        });
        $('#commentsBox').html(html);
    }
});

//文章分类列表数据
$.ajax({
    url: '/categories',
    type: 'get',
    success: function(response) {
        var navTpl = `   
        {{each data}}
        <li><a href="list.html?categoryId={{$value._id}}">
        <i class="fa {{$value.className}}">
        </i>{{$value.title}}
        </a>
        </li>
    {{/each}}`
        var html = template.render(navTpl, {
            data: response
        });
        $('#navBox').html(html);
        $('#topNavBox').html(html);
    }
});

//从浏览器获取修改参数
function getUrlParam(name) {
    var arr = location.search.substr(1).split('&');
    for (var i = 0; i < arr.length; i++) {
        var tmp = arr[i].split('=');
        if (tmp[0] == name) {
            return tmp[1];
        }
    }
    return -1;
};


//搜索
$('.search form').on('submit', function() {
    var keys = $(this).find('.keys').val();
    location.href = '/search.html?key=' + keys;
    return false;
})