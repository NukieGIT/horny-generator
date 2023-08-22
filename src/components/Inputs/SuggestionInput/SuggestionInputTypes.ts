export interface ISuggestionInputControls {
    up: string[];
    down: string[];
    autocomplete: string[],
    submit: string[];
    cancel: string[];
}

export class HighlightedPartialWord {
    readonly partialWord: string;

    constructor(letter: string) {
        this.partialWord = letter;
    }
}