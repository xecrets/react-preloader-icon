interface Options {
    duration: number;
    delay?: number;
    update: (n: number) => void;
}
export declare type CancelHandler = () => void;
export default function loop(options: Options): CancelHandler;
export {};
