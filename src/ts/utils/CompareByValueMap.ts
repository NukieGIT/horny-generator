import isEqual from "lodash/isEqual";

export class CompareByValueMap<K, V> extends Map<K, V> {

    private _instanceKeys: K[] = [];

    private compareInInstanceKeys(key: K): K | null {
        for (const instanceKey of this._instanceKeys) {
            if (isEqual(instanceKey, key)) {
                return instanceKey;
            }
        }
        return null;
    }

    private compareAndAddInInstanceKeys(key: K): K {
        for (const instanceKey of this._instanceKeys) {
            if (isEqual(instanceKey, key)) {
                return instanceKey;
            }
        }
        this._instanceKeys.push(key);
        return key;
    }
        
    constructor(entries?: readonly (readonly [K, V])[] | null) {
        super();
        if (entries !== null && entries !== undefined) {
            for (let i = 0; i < entries.length; i++) {
                const element = entries[i];
                this.set(element[0], element[1]);
            }
        }
    }

    set(key: K, value: V): this {
        key = this.compareAndAddInInstanceKeys(key);
        return super.set(key, value);
    }

    
    get(key: K): V | undefined {
        const instanceKey = this.compareInInstanceKeys(key);
        if (instanceKey !== null) {
            return super.get(instanceKey);
        }
        return undefined;
    }

    has(key: K): boolean {
        const instanceKey = this.compareInInstanceKeys(key);
        if (instanceKey !== null) {
            return super.has(instanceKey);
        }
        return false;
    }
}