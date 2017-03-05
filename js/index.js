$(function(){
    /*动态响应式轮播图*/
    banner();
});
/*动态响应式轮播图*/
function banner(){
    /*申明全局的变量  接受数据  缓存在内存当中*/
    var myData;
    /*1.获取后台的轮播路  图片数据 */
    var getData = function(callback){
        if(myData){
            callback && callback(myData);
            return false;
        }
        $.ajax({
            url:'js/index.json',
            data:{},
            type:'get',
            dataType:'json',
            success:function(data){
                myData  = data;
                callback && callback(myData);
            }
        });
    }
    var renderHtml = function(){
        /*获取到数据*/
        getData(function(data){
            /*当前屏幕的宽度*/
            var width = $(window).width();
            /*否是移动端*/
            var isMobile = false;
            if(width < 768 ){
                isMobile = true;/*当前的屏幕是移动端*/
            }
            /*点的模板对象*/
            var tempaltePoint = _.template($('#template_point').html());
            /*图片模板对象*/
            var templateImage = _.template($('#template_item').html());
            /*渲染成html字符  解析成html*/
            /*传入数据  根据模板解析  返回html字符*/
            var pointHtml = tempaltePoint({model:data});
            var imageData = {
                list:data,
                isMobile:isMobile
            };
            var imageHtml = templateImage({model:imageData});
            /*渲染页面*/
            $(".carousel-indicators").html(pointHtml);
            $(".carousel-inner").html(imageHtml);
        });
    }

    /*5.在屏幕尺寸改变的时候需要重新渲染页面 */
    $(window).on('resize',function(){
        renderHtml();
    }).trigger('resize');/*即时执行这个事件*/

    /*6.在移动端需要 通过手势来控制图片的轮播 左 next 右的 prev  滑动*/
    var startX = 0;
    var moveX =0;
    var distanceX = 0;
    var isMove = false;
    /*绑定事件*/
    $('.bb_banner').on('touchstart',function(e){
        startX = e.originalEvent.touches[0].clientX;
    });
    $('.bb_banner').on('touchmove',function(e){
        moveX = e.originalEvent.touches[0].clientX;
        distanceX = moveX-startX;
        isMove = true;
        console.log(distanceX);
    });
    $('.bb_banner').on('touchend',function(e){
        if(Math.abs(distanceX) > 50 && isMove){
            if(distanceX < 0){
                /*向左滑动  下一张*/
                $('.carousel').carousel('next');/*bootstrap*/
            }else{
                /*向右滑动  上一张*/
                $('.carousel').carousel('prev');/*bootstrap*/
            }
        }

        /*参数重置*/
        startX = 0;
        moveX = 0;
        distanceX = 0;
        isMove = false;
    });

}
