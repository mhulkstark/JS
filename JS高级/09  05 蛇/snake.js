// 写蛇对象
// 属性
//  1. width:    蛇一节的宽度
//  2. height：  蛇一节的高度
//  3. headBgc： 蛇头的颜色
//  4. bodyBgc： 蛇身体的颜色
//  5. body :    // 蛇的每一节坐标数据
// [
//     {x: 2, y:0},   // 蛇头的坐标
//     {x: 1, y:0},   // 蛇中间一节的坐标
//     {x: 0, y:0}    // 蛇尾的
// ]

// 方法
//    render:  渲染到地图上：  按照蛇对象的属性去创建蛇添加到地图上
//    move:    蛇移动，主要思路是修改body数据
//          1. 遍历每一节，让每一节发生改变，存在问题，影响性能（尤其蛇的节数太多了）
//          2. 复制当前的蛇头坐标，得到一个新的蛇头（newHead）， 然后根据蛇的移动方向决定newHead的坐标，此时蛇节多了一节newHead，需要把蛇尾给移除掉。


// 定义蛇构造函数
function Snake(options) {
    options = options || {};

    this.width = options.width || 20; // 和食物的大小保持一致
    this.height = options.height || 20;
    this.headBgc = options.headBgc || "green";
    this.bodyBgc = options.bodyBgc || "red";


    this.direction = options.direction || "right"; // 蛇移动的方向，默认朝右走

    // 蛇的每一节坐标数据
    this.body = options.body || [
        { x: 2, y: 0 }, // 蛇头的坐标
        { x: 1, y: 0 }, // 蛇中间一节的坐标
        { x: 0, y: 0 } // 蛇尾的
    ]
}

// 给原型添加render方法
// target参数就是地图元素
Snake.prototype.render = function(target) {
    // 1. 
    // this 指向的就是实例对象s
    for (var i = 0; i < this.body.length; i++) {
        var span = document.createElement("span");
        var item = this.body[i]; // 当前遍历的每一节蛇对象

        span.style.width = this.width + "px";
        span.style.height = this.height + "px";

        // 蛇头的颜色和蛇身体的颜色不一样
        // 优化
        span.style.backgroundColor = i === 0 ? this.headBgc : this.bodyBgc

        // 设置位置 -- 根据蛇的每一节的坐标
        span.style.position = "absolute";
        span.style.left = item.x * this.width + "px";
        span.style.top = item.y * this.height + "px";

        // 添加到地图上
        target.appendChild(span);
    }
}


// 给原型添加move方法
Snake.prototype.move = function(target) {
    // 采取第二种方式
    // 思路：
    // 1. 复制当前蛇头的坐标，得到新的蛇头，newHead
    // 2. 根据蛇移动方向来决定newHead的坐标
    // 3. 将newHead添加到蛇数据里面（body），添加（unshift）
    // 4. 移除掉蛇尾


    // 1.
    // 新建一个对象，这样会和蛇头的坐标没关系，当修改newHead的时候，不会影响到原来的蛇头。
    var newHead = {
        x: this.body[0].x, // 蛇头的x坐标
        y: this.body[0].y // 蛇头的y坐标
    }
    // console.log(newHead);

    // 千万别这么干；
    // var newHead = this.body[0];


    // 2. 
    switch (this.direction) {
        case "up": // 上
            newHead.y--;
            break;
        case "down": // 下
            newHead.y++;
            break;
        case "left": // 左
            newHead.x--;
            break;
        case "right": // 右
            newHead.x++;
            break;
    };

    // 3. 将newHead添加到body中，作为第一项（第一项才是蛇头）
    this.body.unshift(newHead);

    // 4. 把body中的最后一项（蛇尾）给移除出
    this.body.pop();

    // console.log(this.body);

    // 渲染之前把地图上已经存在的span给移除掉
    var spans = target.querySelectorAll("span");
    // 遍历删除蛇的每一节
    for (var i = 0; i < spans.length; i++) {
        target.removeChild(spans[i]);
    }

    // 这里已经是body数据修改后的最新数据，按照body的最新数据重新去渲染添加到地图上
    // this  指向的是实例对象s
    this.render(target);
}