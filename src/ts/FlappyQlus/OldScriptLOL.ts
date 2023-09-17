// import Vector2D from "../utils/Vector2D";
// import { getRandomArbitrary } from "../utils/utilityFuncs";

// interface IDrawable {
//     draw(): void;
// }

// interface IObjectWithPosition {
//     position: Vector2D;
// }

// class GameRenderer {
//     private _requestAnimationFrameID: number | undefined;
//     private _drawables: IDrawable[];

//     constructor(drawables: IDrawable[]) {
//         this._drawables = drawables;
//     }

//     /**
//      * stop
//      */
//     public stop() {
//         if (this._requestAnimationFrameID === undefined) return
//         cancelAnimationFrame(this._requestAnimationFrameID);
//     }

//     public render(): void {
//         ctx.value?.clearRect(0, 0, CANVAS_SIZE.value.x, CANVAS_SIZE.value.y)
//         for (let i = 0; i < this._drawables.length; i++) {
//             const element = this._drawables[i];
//             element.draw();
//         }
//         this._requestAnimationFrameID = requestAnimationFrame(() => this.render());
//     }
// }

// class DebugText implements IObjectWithPosition, IDrawable {

//     // private _textToDraw: string;
//     // public get textToDraw(): string {
//     //     return this._textToDraw;
//     // }
//     // public set textToDraw(v: string) {
//     //     this._textToDraw = v;
//     // }
//     // private get textToDrawSplit(): string[] {
//     //     return this.textToDraw.split("\n");
//     // }

//     private _position: Vector2D;

//     private _target: IObjectWithPosition;

//     public get position(): Vector2D {
//         return this._position;
//     }

//     public set position(v: Vector2D) {
//         this._position = v;
//     }

//     constructor(target: IObjectWithPosition) {
//         this._target = target;
//         this._position = target.position;
//     }


//     draw(): void {
//         if (ctx.value === undefined || ctx.value === null) return

//         this.position = this._target.position;
//         ctx.value.fillStyle = "white";
//         ctx.value.font = "15px Arial";
//         ctx.value.fillText(`position: ${this._target.position.x}, ${this._target.position.y}`, this.position.x, this.position.y);

//     }
// }

// class Qlus implements IObjectWithPosition, IDrawable {
//     private _position: Vector2D;
//     private _velocity: Vector2D;
//     private _acceleration: Vector2D;

    
//     private _jumpForce : number;
//     public get jumpForce() : number {
//         return this._jumpForce;
//     }
//     public set jumpForce(v : number) {
//         this._jumpForce = v;
//     }
    
    
//     private _gravityForce : number;
//     public get gravityForce() : number {
//         return this._gravityForce;
//     }
//     public set gravityForce(v : number) {
//         this._gravityForce = v;
//     }
    

//     public get velocity(): Vector2D {
//         return this._velocity;
//     }

//     public set velocity(v: Vector2D) {
//         this._velocity = v;
//     }

//     public get acceleration(): Vector2D {
//         return this._acceleration;
//     }

//     public set acceleration(v: Vector2D) {
//         this._acceleration = v;
//     }

//     public get position(): Vector2D {
//         return this._position;
//     }

//     public set position(v: Vector2D) {
//         this._position = v;
//     }

//     constructor(position: Vector2D, jumpForce = 5, gravityForce = 0.1) {
//         this._position = position
//         this._velocity = new Vector2D(0, 0);
//         this._acceleration = new Vector2D(0, 0);

//         this._jumpForce = jumpForce;
//         this._gravityForce = gravityForce;
//     }

//     /**
//      * applyForce
//      */
//     public applyForce(f: Vector2D) {
//         this.acceleration = Vector2D.add(this.acceleration, f);
//     }

//     /**
//      * isCollidingWithPipes
//      */
//     public isCollidingWithPipes(pipeBundle: PipeMeDaddy): boolean {
//         const pipe1 = pipeBundle.bundle[0];
//         const pipe2 = pipeBundle.bundle[1];

//         const condition1 = this.position.x > pipe1.position.x - pipe1.Width * 0.5;
//         const condition2 = this.position.x < pipe1.position.x + pipe1.Width * 0.5;
//         const condition3 = this.position.y > pipe1.position.y - pipe1.Height * 0.5;
//         const condition4 = this.position.y < pipe1.position.y + pipe1.Height * 0.5;

//         const condition5 = this.position.x > pipe2.position.x - pipe2.Width * 0.5;
//         const condition6 = this.position.x < pipe2.position.x + pipe2.Width * 0.5;
//         const condition7 = this.position.y > pipe2.position.y - pipe2.Height * 0.5;
//         const condition8 = this.position.y < pipe2.position.y + pipe2.Height * 0.5;

//         return (condition1 && condition2 && condition3 && condition4) || (condition5 && condition6 && condition7 && condition8);
//     }

//     /**
//      * jump
//      */
//     public jump() {
//         const vel = this.velocity;
//         vel.x = 0
//         this.applyForce(Vector2D.add(Vector2D.reverse(vel), new Vector2D(0, -this.jumpForce)));
//     }

//     private gravity() {
//         this.applyForce(new Vector2D(0, this.gravityForce));
//     }
        
//     private physicsUpdate() {
//         this.velocity = Vector2D.add(this.velocity, this.acceleration);
//         this.position = Vector2D.add(this.position, this.velocity);
//         this.acceleration.zero()
//     }

//     draw(): void {
//         if (ctx.value === undefined || ctx.value === null) return;
        
//         this.gravity();
//         this.physicsUpdate();

//         ctx.value.beginPath();
//         ctx.value.fillStyle = "red";
//         ctx.value.rect(this.position.x, this.position.y, 50, 50);
//         ctx.value.fill();
//     }

// }

// class Pipe implements IObjectWithPosition, IDrawable {
//     private _position: Vector2D = new Vector2D(CANVAS_SIZE.value.x, 0);
//     private _velocity: Vector2D;
//     private _speed: number;
//     private _width: number;
//     private _height: number;

//     public set position(pos: Vector2D) {
//         this._position = pos;
//     }
//     public set Velocity(vel: Vector2D) {
//         this._velocity = vel;
//     }
//     public set Speed(speed: number) {
//         this._speed = speed;
//     }
//     public set Width(width: number) {
//         this._width = width;
//     }
//     public set Height(height: number) {
//         this._height = height;
//     }
//     public get position(): Vector2D {
//         return this._position;
//     }
//     public get Velocity(): Vector2D {
//         return this._velocity;
//     }
//     public get Speed(): number {
//         return this._speed;
//     }
//     public get Width(): number {
//         return this._width;
//     }
//     public get Height(): number {
//         return this._height;
//     }

//     constructor(position: Vector2D) {
//         this._position = position;
//         this._velocity = new Vector2D(0, 0);
//         this._speed = 5;
//         this._width = 75;
//         this._height = CANVAS_SIZE.value.y;
//     }

//     draw(): void {
//         if (ctx.value === undefined || ctx.value === null) return;

//         ctx.value.beginPath();
//         ctx.value.fillStyle = "green";
//         ctx.value.rect(this.position.x - this.Width * 0.5, this.position.y - this.Height * 0.5, this._width, this._height);
//         ctx.value.strokeStyle = "black";
//         ctx.value.lineWidth = 10;
//         ctx.value.stroke()
//         ctx.value.fill();
//     }
// }


// type PipeBundle = readonly [Pipe, Pipe];

// class PipeMeDaddy implements IObjectWithPosition, IDrawable {

//     private _bundle: PipeBundle;
//     private _gap = 100 + CANVAS_SIZE.value.y / 2;

//     private flag = false;
//     private coun: number = 1000

//     public get bundle(): PipeBundle {
//         return this._bundle;
//     }

//     constructor(position: Vector2D) {
//         this._position = position;

//         this._bundle = [new Pipe(Vector2D.subtract(this.position, new Vector2D(0, this._gap))), new Pipe(Vector2D.add(this.position, new Vector2D(0, this._gap)))];
//     }

//     private updatePositions() {
//         const pipe1 = this._bundle[0];
//         const pipe2 = this._bundle[1];

//         pipe1.position = Vector2D.subtract(this.position, new Vector2D(0, this._gap));
//         pipe2.position = Vector2D.add(this.position, new Vector2D(0, this._gap));

//     }

//     private _position: Vector2D;

//     public get position(): Vector2D {
//         return this._position;
//     }

//     public set position(v: Vector2D) {
//         this._position = v;
//     }

//     private updateThisPosition() {
//         if (this.position.x < -this._bundle[0].Width) {
//             this.position.x = CANVAS_SIZE.value.x;
//             this.position.y = getRandomArbitrary(this._gap / 3, CANVAS_SIZE.value.y - (this._gap / 3));
//         }
//     }

//     draw(): void {
//         if (ctx.value === undefined || ctx.value === null) return;

//         this.updatePositions();
//         this.updateThisPosition();

//         this.position.x -= pipeBundle._bundle[0].Speed;

//         for (let i = 0; i < this._bundle.length; i++) {
//             const pipe = this._bundle[i];
//             pipe.draw();

//             ctx.value.beginPath();
//             ctx.value.fillStyle = "white";
//             ctx.value.rect(this.position.x + 5, this.position.y - 5, 10, 10);
//             ctx.value.fill();
//         }

//         if (q.isCollidingWithPipes(this)) {
//             this.flag = true;
//         }   
        
//         if (this.flag) {
//             ctx.value.beginPath();
//             ctx.value.fillStyle = "white";
//             ctx.value.font = "50px Arial";
//             ctx.value.fillText(`HAHAHAHAA YOU BALD CUBNT EBNJOY`, 10, CANVAS_SIZE.value.y / 2);
//             ctx.value.fillText(`hell: ${this.coun -= 2.3}`, 10, CANVAS_SIZE.value.y / 2 + 50);
//             setTimeout(() => {
//                 window.location.href = helloFriend
//             }, 1000);
//             // ctx.value.fillText(`Game Over`, CANVAS_SIZE.value.x / 2 - 100, CANVAS_SIZE.value.y / 2);
//             // ctx.value.fillText(`Score: ${points.score}`, CANVAS_SIZE.value.x / 2 - 100, CANVAS_SIZE.value.y / 2 + 50);
//         }

//     }
// }

// function asdas(s: string) {
    
// }

// asdas("asdsadsaas")

// class Points implements IDrawable {
//     private _count: number;

//     public get score(): number {
//         return this._count;
//     }
//     public set score(v: number) {
//         this._count = v;
//     }
//     constructor() {
//         this._count = 0;
//     }
//     public addScore(player: Qlus, bundle: PipeMeDaddy) {
//         let condition1 = player.position.x > bundle.position.x;
//         let condition2 = player.position.x < bundle.position.x + 10;


//         if (condition1 && condition2) this._count += 1;
//     }

//     draw(): void {
//         if (ctx.value === undefined || ctx.value === null) return;
//         ctx.value.beginPath();
//         ctx.value.fillStyle = "white";
//         ctx.value.font = "20px Arial";
//         ctx.value.fillText(`Score: ${this._count}`, CANVAS_SIZE.value.x / 40, CANVAS_SIZE.value.y / 20);
//         this.addScore(q, pipeBundle)
//     }


// }


// // const gm: GameManager = new GameManager();

// const q: Qlus = new Qlus(new Vector2D(100, 100));
// const points: Points = new Points();
// // const player: Qlus = new Qlus(new Vector2D(100, 100));

// // const pipe: Pipe = new Pipe(new Vector2D());
// // const pipe2: Pipe = new Pipe(new Vector2D(pipe.position.x, pipe.position.y + pipe.Height + 200));

// const pipeBundle: PipeMeDaddy = new PipeMeDaddy(new Vector2D(CANVAS_SIZE.value.x, CANVAS_SIZE.value.y / 2));

// // const tx = new DebugText(pipeBundle);

// const objects: IDrawable[] = [
//     q,
//     pipeBundle,
//     points
// ];


// const gr: GameRenderer = new GameRenderer(objects);

// gr.render();

// const helloFriend = "https://bitly.com/98K8eH";