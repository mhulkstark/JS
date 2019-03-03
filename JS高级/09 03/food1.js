function Food (options) {   //食物的属性
    options = options || {};
    this.width = options.width || 20;
    this.height = options.height || 20;
    this.backgroundColor = options.backgroundColor || 'green'
    this.x = options.x || 0;
    this.y = options.y || 0;
}
// 把食物的实例对象所需要的render方法添加到食物的原型上
Food.prototype.render = function(target) {
    // 思路：
    // 1. 创建div元素来表示食物元素
    // 2. 按照食物的属性来给div设置样式（width、、、）
    // 3. 将div添加到地图上

    // 1. 
    var div =document.createElement('div');
    // 核心： this是哪个函数内的（render）
    //         render被谁调用了 （实例对象f）
    //  注意点：千万把落下了px单位
    // console.log(2, this);
    div.style.width = this.width + 'px';
    div.style.height = this.height + 'px';
    div.style.backgroundColor = this.backgroundColor;


// 随机食物的位置（left/top）

   this.x = parseInt(Math.random () * (target.offsetWidth/this.width));
   this.y = parseInt(Math.random () * (target.offsetHeight/this.height));

// 根据随机的坐标去计算食物的位置
div.style.position = 'absolute';
div.style.left = this.x * this.width + 'px';
div.style.top = this.y * this.height + 'px';

target.appendChild(div)
}