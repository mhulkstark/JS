
function Food(options){
    // options 是个对象

    options = options || {}; // 给options参数来个默认值，是个空对象，防止下面代码取值会报错。

    this.width = options.width || 20; // 给width来个默认值20
    this.height = options.height || 20;
    this.bgColor = options.bgColor || "green";
    this.x = options.x || 0;
    this.y = options.y || 0;
}

// 把食物的实例对象所需要的render方法添加到食物的原型上
// 好处： 
//   1. 可以减少内存浪费问题
//   2. 每个实例对象都可以访问到render
//   参数target： 是目的：将食物添加到谁身上去
Food.prototype.render = function(target){
    // 思路：
    // 1. 创建div元素来表示食物元素
    // 2. 按照食物的属性来给div设置样式（width、、、）
    // 3. 将div添加到地图上

    // 1. 
    var div = document.createElement("div");

    // 2.
    // this 指向 谁？？？？
    // 核心： this是哪个函数内的（render）
    //         render被谁调用了 （实例对象f）
    //  注意点：千万把落下了px单位
    // console.log(2, this);

    div.style.width = this.width + "px";
    div.style.height = this.height + "px";
    div.style.backgroundColor = this.bgColor;


    // 随机食物的位置（left/top）
    // 其实就是随机食物的坐标，有了随机的坐标，就可以根据坐标计算出left/top
    // 随机食物的坐标，区间范围是 0-39
    // 39的来源： 地图的宽度 / 食物的宽度 - 1
    // Math.random()  ==>  [0, 1)
    // map.offsetWidth / this.width   ===> 40
    this.x = parseInt(Math.random() * (target.offsetWidth / this.width));   // ==> [0, 39]
    this.y = parseInt(Math.random() * (target.offsetHeight / this.height))
    // console.log(this.x, this.y);

    // 根据随机的坐标去计算食物的位置
    // 注意点： 千万别落下div的定位，否则left、top无效
    div.style.position = "absolute";
    div.style.left = this.x * this.width + "px";
    div.style.top = this.y * this.height + "px";

    // 3.
    target.appendChild(div);
}
