import { RWebsite } from "@/ts/radziuScript/RGeneric/RWebsiteMethods";
class RSystem {
    constructor() {}

    Website = new RWebsite();

    public Log(logger: any): void {
        console.log(logger);
    }
}

export { RSystem }