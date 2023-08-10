class RWebsite {
    #window: Window | null = null;

    constructor(){}

    public OpenWebsite(){
        this.#window = window.open("https://www.google.com/");
    }

    public CloseWebsite(){
        this.#window?.close();
    }
}

export { RWebsite }