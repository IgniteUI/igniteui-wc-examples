import { IgcBulletGraphModule } from 'igniteui-webcomponents-gauges';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(IgcBulletGraphModule);

export class BulletGraphBackground {

    constructor() {
    }

}

export function initialize() {
  return new BulletGraphBackground();
}