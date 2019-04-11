// 公共的js代码 这种loading动画每个页面都需要把这种公共js放到common.js里面写
// 公共的函数就是要变成全局变量全局函数


// 页面的loading动画函数
loading();
function loading() {
    var $ = {};

    $.Particle = function (opt) {
        this.radius = 7;
        this.x = opt.x;
        this.y = opt.y;
        this.angle = opt.angle;
        this.speed = opt.speed;
        this.accel = opt.accel;
        this.decay = 0.01;
        this.life = 1;
    };

    $.Particle.prototype.step = function (i) {
        this.speed += this.accel;
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        this.angle += $.PI / 64;
        this.accel *= 1.01;
        this.life -= this.decay;

        if (this.life <= 0) {
            $.particles.splice(i, 1);
        }
    };

    $.Particle.prototype.draw = function (i) {
        $.ctx.fillStyle = $.ctx.strokeStyle = 'hsla(' + ($.tick + (this.life * 120)) + ', 100%, 60%, ' + this
            .life + ')';
        $.ctx.beginPath();
        if ($.particles[i - 1]) {
            $.ctx.moveTo(this.x, this.y);
            $.ctx.lineTo($.particles[i - 1].x, $.particles[i - 1].y);
        }
        $.ctx.stroke();

        $.ctx.beginPath();
        $.ctx.arc(this.x, this.y, Math.max(0.001, this.life * this.radius), 0, $.TWO_PI);
        $.ctx.fill();

        var size = Math.random() * 1.25;
        $.ctx.fillRect(~~(this.x + ((Math.random() - 0.5) * 35) * this.life), ~~(this.y + ((Math.random() -
            0.5) * 35) * this.life), size, size);
    }

    $.step = function () {
        $.particles.push(new $.Particle({
            x: $.width / 2 + Math.cos($.tick / 20) * $.min / 2,
            y: $.height / 2 + Math.sin($.tick / 20) * $.min / 2,
            angle: $.globalRotation + $.globalAngle,
            speed: 0,
            accel: 0.01
        }));

        $.particles.forEach(function (elem, index) {
            elem.step(index);
        });

        $.globalRotation += $.PI / 6;
        $.globalAngle += $.PI / 6;
    };

    $.draw = function () {
        $.ctx.clearRect(0, 0, $.width, $.height);

        $.particles.forEach(function (elem, index) {
            elem.draw(index);
        });
    };

    $.init = function () {
        $.canvas = document.createElement('canvas');
        $.ctx = $.canvas.getContext('2d');
        $.width = 300;
        $.height = 300;
        $.canvas.width = $.width * window.devicePixelRatio;
        $.canvas.height = $.height * window.devicePixelRatio;
        $.canvas.style.width = $.width + 'px';
        $.canvas.style.height = $.height + 'px';
        $.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        $.min = $.width * 0.5;
        $.particles = [];
        $.globalAngle = 0;
        $.globalRotation = 0;
        $.tick = 0;
        $.PI = Math.PI;
        $.TWO_PI = $.PI * 2;
        $.ctx.globalCompositeOperation = 'lighter';
        // 渲染动画的地方 把canvas这个标签去渲染到.mask 遮罩层的容器里面
        document.querySelector('.mask').appendChild($.canvas);
        $.loop();
    };

    $.loop = function () {
        requestAnimationFrame($.loop);
        $.step();
        $.draw();
        $.tick++;
    };

    $.init();
}
// 使用正则匹配url参数 返回这个匹配成功的值 根据参数名获取参数的值
function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        console.log(r);
        // 别人之前使用unescape 方式解密  但是我们默认是encodeURI加密 使用 decodeURI 解密
        return decodeURI(r[2]);
    }
    return null;
}