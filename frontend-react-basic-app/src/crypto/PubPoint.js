module.exports =class PubPoint{

    #X_AXIS
    #YAXIS

    constructor(X_AXIS,YAXIS) {
        this.#X_AXIS=X_AXIS;
        this.#YAXIS=YAXIS;
    }

    get geX_AXIS() {
        return this.#X_AXIS;
    }

    get getYAXIS() {
        return this.#YAXIS;
    }
}