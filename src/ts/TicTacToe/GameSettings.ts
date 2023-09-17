import type Vector2D from "../utils/Vector2D";
import type { Player } from "./Player";

export class GameSettings {
    
    private _size : Vector2D;
    public get size() : Vector2D {
        return this._size;
    }

    private _players : Player[];
    public get players() : Player[] {
        return this._players;
    }
    
    private _toWin : number;
    public get toWin() : number {
        return this._toWin;
    }

    constructor(size: Vector2D, players: Player[], toWin: number) {
        this._size = size;
        this._players = players;
        this._toWin = toWin;
    }

}