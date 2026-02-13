import 'igniteui-webcomponents-grids/grids/combined';
import { IgcDefaultMergeStrategy, IgcGridComponent, IgcGridMergeStrategy } from 'igniteui-webcomponents-grids/grids';
import 'igniteui-webcomponents-grids/grids/themes/light/bootstrap.css';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import { defineAllComponents } from 'igniteui-webcomponents';

defineAllComponents();

import './index.css';

type RecordType = {
  ActionID: string;
  ProjectName: string;
  ActionName: string;
  Type: string;
  Priority: string;
  Status: string;
  Created: Date;
  LastEdit: Date;
};

class PerProjectMergeStrategy extends IgcDefaultMergeStrategy {
  public comparer(prevRecord: RecordType, record: RecordType, field: string): boolean {
    const a = (prevRecord as any)[field];
    const b = (record as any)[field];
    const projA = prevRecord.ProjectName;
    const projB = record.ProjectName;
    return a === b && projA === projB;
  }
}

export class Sample {
  private grid: IgcGridComponent;

  constructor() {
    this.grid = document.getElementById('grid') as IgcGridComponent;

    this.grid.data = this.data;
    (this.grid as any).mergeStrategy = new PerProjectMergeStrategy();
    this.grid.cellMergeMode = 'always';
  }

  private _data: RecordType[] | null = null;
  public get data(): RecordType[] {
    if (!this._data) {
      this._data = [
        { ActionID: '1', ProjectName: 'IOT Switch Project', ActionName: 'Data Import', Type: 'Request', Priority: 'Low', Status: 'New', Created: new Date('2017-03-25'), LastEdit: new Date('2017-05-08') },
        { ActionID: '2', ProjectName: 'IOT Switch Project', ActionName: 'Reports', Type: 'Request', Priority: 'Low', Status: 'New', Created: new Date('2017-03-14'), LastEdit: new Date('2017-03-15') },
        { ActionID: '4', ProjectName: 'IOT Switch Project', ActionName: 'Multiple Settings', Type: 'Request', Priority: 'Low', Status: 'Rejected', Created: new Date('2017-04-05'), LastEdit: new Date('2017-04-30') },
        { ActionID: '3', ProjectName: 'IOT Switch Project', ActionName: 'Data Archiving', Type: 'Request', Priority: 'Medium', Status: 'New', Created: new Date('2017-08-21'), LastEdit: new Date('2017-09-08') },
        { ActionID: '5', ProjectName: 'IOT Switch Project', ActionName: 'Main Menu: Return Button', Type: 'Bug', Priority: 'Medium', Status: 'Fixed', Created: new Date('2017-06-17'), LastEdit: new Date('2017-07-03') },
        { ActionID: '6', ProjectName: 'IOT Switch Project', ActionName: 'Auto Turn Off', Type: 'Bug', Priority: 'Medium', Status: 'New', Created: new Date('2017-04-12'), LastEdit: new Date('2017-05-27') },
        { ActionID: '7', ProjectName: 'VR Device', ActionName: 'Higher DRI', Type: 'Request', Priority: 'Medium', Status: 'New', Created: new Date('2016-08-11'), LastEdit: new Date('2016-08-11') },
        { ActionID: '8', ProjectName: 'VR Device', ActionName: 'Accessible Power Button', Type: 'Request', Priority: 'Medium', Status: 'New', Created: new Date('2016-07-13'), LastEdit: new Date('2016-07-14') },
        { ActionID: '9', ProjectName: 'VR Device', ActionName: 'Additional options', Type: 'Request', Priority: 'High', Status: 'Rejected', Created: new Date('2016-09-02'), LastEdit: new Date('2016-09-08') },
        { ActionID: '10', ProjectName: 'VR Device', ActionName: 'Data Log', Type: 'Request', Priority: 'High', Status: 'New', Created: new Date('2017-03-25'), LastEdit: new Date('2017-05-08') },
        { ActionID: '12', ProjectName: 'VR Device', ActionName: 'Motion Blur', Type: 'Bug', Priority: 'High', Status: 'New', Created: new Date('2017-03-25'), LastEdit: new Date('2017-05-08') },
        { ActionID: '11', ProjectName: 'VR Device', ActionName: 'Left Sensors Delay', Type: 'Bug', Priority: 'High', Status: 'Fixed', Created: new Date('2017-03-25'), LastEdit: new Date('2017-05-08') },
      ];
    }
    return this._data;
  }
}

export function initialize() {
  return new Sample();
}