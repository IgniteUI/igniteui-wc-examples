

/* tslint:disable:prefer-const */

import { Style } from 'igniteui-webcomponents-core';

export class SantaShapeStyling {
  public defaultStroke = 'black';
  public defaultFill = 'gray';
  public defaultThickness = 0.5;
  public defaultOpacity = 1.0;
  public defaultStyle = new Style();

  public itemMemberPath = '';
  public itemMappings: SantaShapeInfo[] = [];

  constructor() {
    this.defaultStyle = new Style();
    this.defaultStyle.stroke = this.defaultStroke;
    this.defaultStyle.fill = this.defaultFill;
    this.defaultStyle.opacity = this.defaultOpacity;
    this.defaultStyle.strokeThickness = this.defaultThickness;
  }

  public getValue(itemMemberPath: string, item: any): any {
    let itemValue = null;

    if (item.fieldValues !== undefined) { // .hasOwnProperty("fieldValues")) {
      if (item.fieldsNames.indexOf(itemMemberPath) >= 0) {
        itemValue = item.fieldValues[itemMemberPath];
      } else {
        console.log('WARNING: ShapefileRecord does not have ' + itemMemberPath + ' in fieldValues property');
      }
    } else if (item.hasOwnProperty(itemMemberPath)) {
      itemValue = item[itemMemberPath];
    } else {
      console.log('WARNING: Shape data item does not have "' + itemMemberPath + '" property');
    }
    return itemValue;
  }

  public generate(record: any): Style {

    let itemValue = this.getValue(this.itemMemberPath, record);
    if (itemValue === null || itemValue === "") {
      // console.log(this.defaultStyle);
      return this.defaultStyle;
    }

    for (const mapping of this.itemMappings) {
      if (mapping.itemValue === itemValue) {
        const shapeStyle = new Style();
        shapeStyle.opacity = mapping.opacity || this.defaultOpacity;
        shapeStyle.fill    = mapping.fill || this.defaultFill;
        shapeStyle.stroke  = mapping.stroke || this.defaultStroke;
        shapeStyle.strokeThickness = mapping.thickness || this.defaultThickness;
        return shapeStyle;
      }
    }

    return this.defaultStyle;
  }
}

export class SantaShapeInfo {
  public itemValue: any = null;

  public opacity?: number = 0.5;
  public fill: string = "gray";
  public stroke?: string= "black";
  public thickness?: number;
}
