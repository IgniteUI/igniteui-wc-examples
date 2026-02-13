import { IgcBulletGraphModule } from 'igniteui-webcomponents-gauges';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(IgcBulletGraphModule);

export class BulletGraphRanges {

    constructor() {
    }

}

export function initialize() {
  return new BulletGraphRanges();
}