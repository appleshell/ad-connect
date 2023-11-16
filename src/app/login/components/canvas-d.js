/**
 * 透明度变化到0消失
 * 半径小于1消失
 * */
/**
 * 获取随机数
 * */
function getRandom(a, b) {
  return Math.random() * (b - a) + a;
}

function getZ(num) {
  let rounded;
  rounded = (0.5 + num) | 0;
  // A double bitwise not.
  rounded = ~~(0.5 + num);
  // Finally, a left bitwise shift.
  rounded = (0.5 + num) << 0;
  return rounded;
}

export function ballCanvas() {
  const RAF = (function () {
    if (typeof window === "undefined") return function (callback) {
      window.setTimeout(callback, 1000 / 60);
    }; 
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) {
        window.setTimeout(callback, 1000 / 60);
      }
    );
  })();
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");
  const borderWidth = 16;
  const Balls = [];
  const oStepInit = 0.001;
  const rStepInit = 0.1;
  // UI固定颜色 透明度随机生成
  const colors = [
    "rgba(255,182,74,",
    "rgba(255,182,74,",
    "rgba(255,90,123,",

    "rgba(255,90,123,",
    "rgba(62,91,242,",
    "rgba(76,132,255,",
  ];

  function ball(x, y, vx, vy, r, colorIndex, opacityProperty, sequence) {
    this.x = x; // 坐标x
    this.y = y; // 坐标y
    this.vx = vx; // 移动随机
    this.vy = vy; // 移动随机
    this.r = r; // 半径
    this.sequence = sequence; //
    this.colorIndex = colorIndex; //
    this.opacityProperty = opacityProperty; //
    this.oStep = oStepInit;
    this.rStep = rStepInit;
    this.paint(ctx);
  }

  ball.prototype = {
    paint(ctx) {
      // 开始一个新的绘制路径
      ctx.beginPath();
      // 设置弧线的颜色为蓝色
      const color = `${colors[this.colorIndex] + this.opacityProperty})`;
      ctx.strokeStyle = color;
      ctx.lineWidth = borderWidth;
      // 沿着坐标点(100,100)为圆心、半径为50px的圆的逆时针方向绘制弧线
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      // 按照指定的路径绘制弧线
      ctx.stroke();
    },
    /**
     * 位置变化
     * 透明度变化
     * */
    move() {
      if (this.opacityProperty <= 0) {
        // 消失了,生成一个
        Balls[this.sequence] = BallManager.newBall(
          undefined,
          undefined,
          getRandom(2, 50),
          getZ(getRandom(1, 7)),
          this.sequence
        );
        this.paint(ctx);
        return;
      }
      if (this.r < 1) {
        // 消失了,生成一个
        Balls[this.sequence] = BallManager.newBall(
          undefined,
          undefined,
          getRandom(2, 50),
          getZ(getRandom(1, 7)),
          this.sequence
        );
        this.paint(ctx);
        return;
      }
      this.x += this.vx;
      this.y += this.vy;
      this.opacityProperty += this.oStep;
      this.r += this.rStep;
      if (this.opacityProperty >= 1) {
        this.opacityProperty = 1;
        this.oStep = -oStepInit;
      }
      if (this.r >= 500) {
        this.r = 500;
        this.rStep = -rStepInit;
      }
      if (this.x > canvas.width - this.r || this.x < 0) {
        this.x = this.x < 0 ? 0 : canvas.width - this.r;
        this.vx = -this.vx;
      }
      if (this.y > canvas.height - this.r || this.y < 0) {
        this.y = this.y < 0 ? 0 : canvas.height - this.r;
        this.vy = -this.vy;
      }
      this.paint(ctx);
    },
  };
  let BallManager = {
    init(num) {
      for (let i = 0; i < num; i++) {
        // 半径为1 ，序号固定，其他随机，
        Balls.push(this.newBall(undefined, undefined, 2, undefined, i));
      }
    },
    newBall(x, y, r, c, sequence) {
      return new ball(
        x || getRandom(0, canvas.width),
        y || getRandom(0, canvas.height),
        getRandom(-1, 1),
        getRandom(-1, 1),
        r || getRandom(20, 200),
        c || getZ(getRandom(1, 7)),
        parseInt(getRandom(-1, 1) * 1000) / 1000,
        sequence
      );
    },
    update() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < Balls.length; i++) {
        Balls[i].move();
      }
    },
    loop() {
      const _this = this;
      this.update();
      RAF(() => {
        _this.loop();
      });
    },
    start(num) {
      this.init(num);
      this.loop();
    },
  };
  return BallManager;
}
