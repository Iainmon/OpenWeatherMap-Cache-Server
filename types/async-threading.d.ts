export = index;
declare class index {
    static spawn(execute: any, dtime: number): void;
    constructor(execute: any, dtime: number, startNow: boolean);
    execute: any;
    dtime: number;
    stop: boolean;
    fireTimes: number;
    kill(): void;
    main(): void;
    toggle(): void;
}
