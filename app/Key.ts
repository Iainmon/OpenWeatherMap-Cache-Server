import Thread from 'async-threading';

export default class Key {

    public value: string;

    public isValid: boolean = true;

    constructor(value: string) {
        this.value = value;
    }

    public failed() {

        this.isValid = false;

        Thread.spawn( () => {
            this.isValid = true;
        }, 1000 * 60 ); // After one minute, re-validate key.
    }

}