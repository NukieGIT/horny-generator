import { CompareByValueMap } from "../utils/CompareByValueMap";
import Vector2D from "../utils/Vector2D";
import type { Player } from "./Player";

export class MapNode {
    
    private static _DIRECTIONS = [
        () => new Vector2D(0, 1), // up
        () => new Vector2D(1, 0), // right
        () => new Vector2D(0, -1), // down
        () => new Vector2D(-1, 0), // left
        () => new Vector2D(1, 1), // up-right
        () => new Vector2D(1, -1), // down-right
        () => new Vector2D(-1, -1), // down-left
        () => new Vector2D(-1, 1), // up-left
    ] as const;

    public static get DIRECTIONS(): readonly (() => Vector2D)[] {
        return this._DIRECTIONS;
    }

    private _position : Vector2D;
    public get position() : Vector2D {
        return this._position;
    }

    private _player : Player | null = null;
    public get player() : Player | null {
        return this._player;
    }
    public set player(v : Player | null) {
        this._player = v;
    }

    private _adjacentNodes: CompareByValueMap<Vector2D, MapNode> = new CompareByValueMap<Vector2D, MapNode>();

    public getAdjacentNode(direction: Vector2D): MapNode | null {
        const adjacentPosition = Vector2D.add(this.position, direction);
        return this._adjacentNodes.get(adjacentPosition) ?? null;
    }

    public hasAdjacentNode(direction: Vector2D): boolean {
        return this.getAdjacentNode(direction) !== null;
    }

    public setAdjNodes(map: CompareByValueMap<Vector2D, MapNode>): void {
        this._adjacentNodes = map
    }

    constructor(position: Vector2D) {
        this._position = position;
    }
    
}