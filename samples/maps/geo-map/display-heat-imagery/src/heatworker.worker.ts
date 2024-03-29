import { HeatTileGeneratorWebWorker } from 'igniteui-webcomponents-core';

let worker: Worker = self as any;

worker.onmessage = HeatTileGeneratorWebWorker.onmessage;

HeatTileGeneratorWebWorker.postmessage = postMessageFunction;
HeatTileGeneratorWebWorker.start();

function postMessageFunction() {
    self.postMessage.apply(self, Array.prototype.slice.call(arguments) as any);
}

export default {} as typeof Worker & (new () => Worker);
