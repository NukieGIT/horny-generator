import type { CompareByValueMap } from "../utils/CompareByValueMap";
import type Vector2D from "../utils/Vector2D";
import type { GameSettings } from "./GameSettings";
import type { MapNode } from "./MapNode";
import type { Player } from "./Player";

export class WinCheck {

    private settings: GameSettings;
    
    constructor(settings: GameSettings) {
        this.settings = settings;
    }

    /**
     * WinnerCheck
     */
    public WinnerCheck(map: CompareByValueMap<Vector2D, MapNode>): Player | null {
        const toWin: number = this.settings.toWin;

        for (const [key, value] of map) {
            console.log(key, value);
        }

        return null;
    }
}