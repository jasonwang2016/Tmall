
var $formBox = $('#header').find('.form-box');
var $input = $formBox.find('input');
var $inputList = $formBox.find('.input-list');

$input.on('keyup',listDis);
$input.on('focus',listDis);
$input.on('blur',function () {
    $inputList.css('display','none');
});
$inputList.on('click',listClick);
function listDis(e) {
    var reg = /^\s*$/; // 匹配所有空
    if(!reg.test(this.value)){
        $inputList.css('display','block');
    }else{
        $inputList.css('display','none');
    }
}
function listClick(e) {
    if(e.target.nodeName == 'A' || e.target.nodeName == 'LI'){
        $input.val(e.target.innerText);
        this.style.display = 'none'; // 点击之后列表消失
    }
}

//banner
$('.banner').unslider({
    animation:'fade',
    autoplay:true,
    arrows:false,
    keys:false
});
var ml = -parseFloat($('.unslider-nav').css('width'))/2;
$('.unslider-nav').css('marginLeft',ml);

//left-list 鼠标移入移出
$('.left-nav').find('li').each(
    function (index,item) {
        $(item).on('mouseenter',function () {
            $(this).css('background','#fff');
            $('.left-list > div').eq(index).css('display','block');
        }).on('mouseleave',function () {
            $(this).css('background','transparent');
            $('.left-list > div').eq(index).css('display','none');
        });
    }
);
$('.left-listBox').each(function (index,item) {
    $(item).on('mouseenter',function (e) {
        $(this).css('display','block');
        $('.left-nav > li').eq(index).css('background','#fff')
    }).on('mouseleave',function () {
        $(this).css('display','none');
        $('.left-nav > li').eq(index).css('background','transparent')
    })
});

//小轮播图
;(function () {
    var $listBox = $('.live-list-box');
    var $list = $listBox.children('div');
    var $playImg = $('.live-play > img');
    var $playP = $('.live-cover > p');
    var $left = $('.live-left');
    var $right = $('.live-right');
    var $infoBox = $('.info-list-box');
    var step = 0;
    var step1 = 0;
    var timer = window.setInterval(autoGo,3000);
    window.setInterval(function () {
        step1++;
        if(step1 === 5){
            step1 = 0
        }
        $infoBox.stop().animate({marginTop:-40*step1+'px'},300);
    },3000);
    var dataP = ['# 都市新格调 教你正确穿衣','# 小豆豆的搭配','# 古筝零基础入门','# 花枝搭配宝典','# 园艺用品介绍 大咖带你玩绿植','# 把荷兰的春天带回家'];
    $('.live-list-box div:first-child').find('.live-item-cover').css('display','block');
    function autoGo() {
        step++;
        if (step === 6) {
            step = 0;
        }
        playChange();
        leftChange();
        listChange();
    }
    $list.on('mouseover',over);
    $list.on('mouseout',out);
    $left.on('click',left);
    $right.on('click',right);
    function left() {
        $list.stop().animate({left: 0}, 300);
        $right.css('display','block');
        $left.css('display','none');
    }
    function right() {
        $list.stop().animate({left: -488}, 300);
        $left.css('display','block');
        $right.css('display','none');
    }
    function over() {
        window.clearInterval(timer);
        var that = this;
        $list.each(function (index, item) {
            if(item === that){
                step = index;
            }
        });
        listChange();
        playChange();
    }
    function out() {
        timer = window.setInterval(autoGo,2000);
    }
    function playChange() {
        $playP.html(dataP[step]);
        $playImg.prop('src','images/live'+step+'.jpg');
    }
    function listChange() {
        $list.each(function (index,item) {
            if(index === step){
                $(item).find('.live-item-cover').css('display','block');
            }else{
                $(item).find('.live-item-cover').css('display','none');
            }
        })
    }
    function leftChange() {
        if (step === 3) {
            $list.stop().animate({left: -488}, 300);
            $left.css('display','block');
            $right.css('display','none');
        }
        if (step === 0) {
            $list.stop().animate({left: 0}, 300);
            $right.css('display','block');
            $left.css('display','none');
        }
    }
})();

//brand
;(function () {
    var $brandBox = $('.brand-box');
    var data = null;
    var flag = 1;
    $.ajax({
        type:'get',
        url:'data/brand_data.txt?_='+Math.random(),
        async:false,
        dataType:'json',
        success:function (res) {
            data = res;
        }
    });
    var str = '';
    if(data && data.length){
        for(var i=0;i<data.length;i++){
            str += '<li class="brand-item">';
            str += '<div class="brand-img">';
            str += '<img src="'+data[i].src+'">';
            str += '</div>';
            str += '<div class="brand-mask"><span>❤</span><div>优惠券 ￥100</div><div class="brand-enter">点击进入</div></div>';
            str += '</li>';
        }
    }
    $brandBox.html(str);
    var $brandBtn = $('.brand-btn');
    var $brands = $('.brand-item');
    $brandBtn.on('mouseenter',addAni);
    $brandBtn.on('mouseup',changeBrand);
    $brandBtn.on('mouseup',addAni2);
    //$brandBtn.on('mousedown',removeAni);//添加动画结束事件后，这条语句可省略，mouseup可以改为click
    //$brandBtn.on('mouseleave',removeAni);
    $brandBtn.on('animationend',removeAni);//css3动画结束监听事件，可以添加回调函数，解决鼠标移出动画就立即停止的bug
    function addAni() {
        $('.brand-btn-left').css('animation','rotate 500ms');
        $('.brand-btn-right').css('animation','rotate1 500ms');
        $('.brand-btn-down').css('animation','rotate 500ms');
    }
    function removeAni() {
        $('.brand-btn-left').removeAttr('style');
        $('.brand-btn-right').removeAttr('style');
        $('.brand-btn-down').removeAttr('style');
    }
    function changeBrand() {
        $brands.each(function (index,item) {
            if(flag === 1){
                $(item).stop().animate({opacity:0.1},500,function () {
                    $(this).find('img').prop('src','images/brand/brand'+(22-index)+'.jpg');
                });
                $(item).animate({opacity:1},500);
            }else{
                $(item).stop().animate({opacity:0.1},500,function () {
                    $(item).find('img').prop('src','images/brand/brand'+index+'.jpg');
                });
                $(item).animate({opacity:1},500);
            }
        });
        flag *= -1;
        $('.brand-btn-left').removeAttr('style');
        $('.brand-btn-right').removeAttr('style');
        $('.brand-btn-down').removeAttr('style');
    }
    function addAni2() {
        $('.brand-btn-left').css('animation','rotateTw 800ms');
        $('.brand-btn-right').css('animation','rotate1Tw 800ms');
        $('.brand-btn-down').css('animation','rotateTw 800ms');
    }
})();

