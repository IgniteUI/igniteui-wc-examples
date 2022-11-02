import { HeatTileGeneratorWebWorker } from 'igniteui-webcomponents-core';

let worker: Worker = self as any;
if (typeof worker !== "undefined") {

    worker.onmessage = HeatTileGeneratorWebWorker.onmessage;

    HeatTileGeneratorWebWorker.postmessage = postMessageFunction;
    HeatTileGeneratorWebWorker.start();

    function postMessageFunction() {
        self.postMessage.apply(self, Array.prototype.slice.call(arguments) as any);
    }
}

export default {} as typeof Worker & (new () => Worker);
