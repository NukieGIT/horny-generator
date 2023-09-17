import { CompareByValueMap } from "../utils/CompareByValueMap";
import Vector2D from "../utils/Vector2D";
import { GameSettings } from "./GameSettings";
import { MapNode } from "./MapNode";

export class BoardModel {
    
    private settings: GameSettings;

    private _map : CompareByValueMap<Vector2D, MapNode>;
    public get map() : CompareByValueMap<Vector2D, MapNode> {
        return this._map;
    }

    constructor(settings: GameSettings) {
        this._map = new CompareByValueMap<Vector2D, MapNode>();
        this.settings = settings;

        this.initMap();
    }

    private initMap(): void {
        for (let i = 0; i < this.settings.size.x; i++) {
            for (let j = 0; j < this.settings.size.y; j++) {
                this.map.set(new Vector2D(i, j), new MapNode(new Vector2D(i, j)));
            }
        }
    }

}