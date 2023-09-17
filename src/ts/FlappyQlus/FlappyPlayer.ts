import type Event from "../events/Event";
import EventArgs from "../events/EventArgs";
import EventDispatcher from "../events/EventDispatcher";
import Vector2D from "../utils/Vector2D";
import { BaseClass } from "./FlappyBaseClass";
import type { Pipe } from "./FlappyPipe";
import type { PipeController } from "./FlappyPipesController";
import { Time } from "./Time";

export class Player extends BaseClass {
    private _position: Vector2D;
    private _velocity: Vector2D;
    private _acceleration: Vector2D;

    private _flappyController: PipeController;

    private _onCollisionWithPipes: EventDispatcher<EventArgs> = new EventDispatcher<EventArgs>();
    private _onCollisionEnterWithPipes: EventDispatcher<EventArgs> = new EventDispatcher<EventArgs>();

    private _startedCollidingWithPipes: boolean = false;

    public get onCollisionWithPipes(): Event<EventArgs> {
        return this._onCollisionWithPipes.event;
    }

    public get onCollisionEnterWithPipes(): Event<EventArgs> {
        return this._onCollisionEnterWithPipes.event;
    }
    
    private _jumpForce : number;
    public get jumpForce() : number {
        return this._jumpForce;
    }
    public set jumpForce(v : number) {
        this._jumpForce = v;
    }
    
    
    private _gravityForce : number;
    public get gravityForce() : number {
        return this._gravityForce;
    }
    public set gravityForce(v : number) {
        this._gravityForce = v;
    }
    

    public get velocity(): Vector2D {
        return this._velocity;
    }

    public set velocity(v: Vector2D) {
        this._velocity = v;
    }

    public get acceleration(): Vector2D {
        return this._acceleration;
    }

    /**
     * use of this setter is not recommended
     * @see {@link applyForce}
     */
    public set acceleration(v: Vector2D) {
        this._acceleration = v;
    }

    public get position(): Vector2D {
        return this._position;
    }

    public set position(v: Vector2D) {
        this._position = v;
    }

    constructor(position: Vector2D, jumpForce = 5, gravityForce = 0.1, flappyController: PipeController) {
        super();
        this._position = position
        this._velocity = new Vector2D(0, 0);
        this._acceleration = new Vector2D(0, 0);

        this._jumpForce = jumpForce;
        this._gravityForce = gravityForce;

        this._flappyController = flappyController;
    }

    /**
     * applyForce
     */
    public applyForce(f: Vector2D) {
        this.acceleration = Vector2D.add(this.acceleration, f);
    }

    /**
     * jump
     */
    public jump() {
        const vel = this.velocity;
        vel.x = 0
        this.applyForce(Vector2D.add(Vector2D.reverse(vel), new Vector2D(0, -this.jumpForce)));
    }

    private gravity() {
        this.applyForce(Vector2D.multiply(new Vector2D(0, this.gravityForce), Time.deltaTime));
    }
        
    private physicsUpdate() {

        this.gravity();

        const acc = this.acceleration;
        this.velocity = Vector2D.add(this.velocity, acc);
        this.position = Vector2D.add(this.position, this.velocity);
        
        this.acceleration.zero()
    }

    /**
     * isCollidingWithPipes
     */
    public isCollidingWithPipes(pipe1: Pipe, pipe2: Pipe): boolean {
        return this.position.x + 50 > pipe1.position.x && this.position.x < pipe1.position.x + pipe1.size.x &&
            (this.position.y < pipe1.position.y + pipe1.size.y || this.position.y + 50 > pipe2.position.y);
    }

    private checkCollisionWithPipes(): void {
        if (!this.isCollidingWithPipes(this._flappyController.pipe1, this._flappyController.pipe2)) {
            this._startedCollidingWithPipes = false;
            return;
        }

        if (!this._startedCollidingWithPipes) {
            this._onCollisionEnterWithPipes.invoke(this, EventArgs.EMPTY);
            this._startedCollidingWithPipes = true;
        }

        this._onCollisionWithPipes.invoke(this, EventArgs.EMPTY);
    }    

    public update(): void {
        this.physicsUpdate();

        this.checkCollisionWithPipes();
    }

    public render(ctx: CanvasRenderingContext2D): void {

        ctx.beginPath();
        ctx.fillStyle = "red";
        ctx.rect(this.position.x, this.position.y, 50, 50);
        ctx.fill();
    }

}