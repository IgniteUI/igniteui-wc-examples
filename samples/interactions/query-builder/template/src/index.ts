import 'igniteui-webcomponents-grids/grids/combined';
import 'igniteui-webcomponents-grids/grids/themes/light/material.css';
import './index.css';
import {
  IgcExpressionTree,
  IgcFilteringExpressionsTree,
  FilteringLogic,
  IgcQueryBuilderComponent,
  IgcQueryBuilderSearchValueContext,
  IgcStringFilteringOperand
} from 'igniteui-webcomponents-grids/grids';
import {
  defineComponents,
  IgcDatePickerComponent,
  IgcDateTimeInputComponent,
  IgcSelectComponent,
  IgcSelectItemComponent,
  IgcRadioGroupComponent,
  IgcRadioComponent,
  IgcInputComponent,
  IgcIconComponent,
  registerIconFromText
} from 'igniteui-webcomponents';
import { html } from 'lit-html';

defineComponents(
  IgcDatePickerComponent,
  IgcDateTimeInputComponent,
  IgcSelectComponent,
  IgcSelectItemComponent,
  IgcRadioGroupComponent,
  IgcRadioComponent,
  IgcInputComponent,
  IgcIconComponent
);

export class QueryBuilderTemplate {
  private queryBuilder: IgcQueryBuilderComponent;
  private expressionOutput: HTMLElement | null;

  public entities: any[] = [];
  public ordersFields: any[] = [];
  public expressionTree!: IgcExpressionTree;

  public regionOptions = [
    { text: 'Central North America', value: 'CNA' },
    { text: 'Central Europe', value: 'CEU' },
    { text: 'Mediterranean region', value: 'MED' },
    { text: 'Central Asia', value: 'CAS' },
    { text: 'South Asia', value: 'SAS' },
    { text: 'Western Africa', value: 'WAF' },
    { text: 'Amazonia', value: 'AMZ' },
    { text: 'Southern Africa', value: 'SAF' },
    { text: 'Northern Australia', value: 'NAU' }
  ];

  public statusOptions = [
    { text: 'New', value: 1 },
    { text: 'Shipped', value: 2 },
    { text: 'Done', value: 3 }
  ];

  constructor() {
    this.expressionOutput = document.getElementById('expressionOutput');
    this.queryBuilder = document.getElementById('queryBuilder') as IgcQueryBuilderComponent;

    this.registerIcons();
    this.initFields();
    this.configureQueryBuilder();
    this.renderExpressionTree();
  }

  private initFields(): void {
    this.ordersFields = [
      { field: 'CompanyID', dataType: 'string' },
      { field: 'OrderID', dataType: 'number' },
      { field: 'Freight', dataType: 'number' },
      { field: 'ShipCountry', dataType: 'string' },
      { field: 'IsRushOrder', dataType: 'boolean' },
      {
        field: 'RequiredTime',
        dataType: 'time',
        formatter: (value: any) => value.toLocaleTimeString(this.queryBuilder?.locale, {
          hour: '2-digit',
          minute: '2-digit'
        })
      },
      { 
        field: 'OrderDate',
        dataType: 'date',
        formatter: (value: any) => value.toLocaleDateString(this.queryBuilder?.locale, { month: 'short', day: 'numeric', year: 'numeric' })
      },
      {
        field: 'Region',
        dataType: 'string',
        formatter: (value: any) => value?.text ?? value?.value ?? value
      },
      {
        field: 'OrderStatus',
        dataType: 'number',
        formatter: (value: number) => this.statusOptions.find(option => option.value === value)?.text ?? value
      }
    ];

    this.entities = [
      {
        name: 'Orders',
        fields: this.ordersFields
      }
    ];

    const tree = new IgcFilteringExpressionsTree();
    tree.operator = FilteringLogic.And;
    tree.entity = 'Orders';
    tree.returnFields = ['*'];
    tree.filteringOperands.push({
      fieldName: 'Region',
      condition: IgcStringFilteringOperand.instance().condition('equals'),
      conditionName: 'equals',
      searchVal: this.regionOptions[0]
    });
    tree.filteringOperands.push({
      fieldName: 'OrderStatus',
      condition: IgcStringFilteringOperand.instance().condition('equals'),
      conditionName: 'equals',
      searchVal: this.statusOptions[0].value
    });

    this.expressionTree = tree;
  }

  private configureQueryBuilder(): void {
    if (!this.queryBuilder) {
      return;
    }

    this.queryBuilder.entities = this.entities as any;
    this.queryBuilder.expressionTree = this.expressionTree;
    this.queryBuilder.searchValueTemplate = (ctx: IgcQueryBuilderSearchValueContext) => this.buildSearchValueTemplate(ctx);

    this.queryBuilder.addEventListener('expressionTreeChange', (e: CustomEvent<IgcExpressionTree>) => {
      this.expressionTree = e.detail;
      this.renderExpressionTree();
    });
  }

  private buildSearchValueTemplate(ctx: IgcQueryBuilderSearchValueContext) {
    const field = ctx.selectedField?.field;
    const condition = ctx.selectedCondition;
    const matchesEqualityCondition = condition === 'equals' || condition === 'doesNotEqual';

    if (!ctx.implicit) {
      ctx.implicit = { value: null };
    }

    if (field === 'Region' && matchesEqualityCondition) {
      return this.buildRegionSelect(ctx);
    }

    if (field === 'OrderStatus' && matchesEqualityCondition) {
      return this.buildStatusRadios(ctx);
    }

    if (ctx.selectedField?.dataType === 'date') {
      return this.buildDatePicker(ctx);
    }

    if (ctx.selectedField?.dataType === 'time') {
      return this.buildTimeInput(ctx);
    }

    return this.buildDefaultInput(ctx, matchesEqualityCondition);
  }

  private buildRegionSelect(ctx: IgcQueryBuilderSearchValueContext) {
    const currentValue = ctx?.implicit?.value?.value ?? '';

    return html`
      <igc-select
        placeholder="Region"
        .value=${currentValue}
        @igcChange=${(event: CustomEvent<{ value: string }>) => this.onRegionChange(ctx, event)}>
        ${this.regionOptions.map(option => html`
          <igc-select-item value=${option.value}>${option.text}</igc-select-item>
        `)}
      </igc-select>
    `;
  }

  private onRegionChange(ctx: IgcQueryBuilderSearchValueContext, event: CustomEvent<{ value: string }>) {
    const value = event.detail?.value;
    const currentKey = ctx?.implicit?.value?.value ?? '';

    if (!value || value === currentKey) {
      return;
    }

    ctx.implicit.value = this.regionOptions.find(option => option.value === value) ?? null;
  }

  private buildStatusRadios(ctx: IgcQueryBuilderSearchValueContext) {
    const implicitValue = ctx.implicit?.value;
    const currentValue = implicitValue === null ? '' : implicitValue.toString();

    return html`
      <igc-radio-group
        style="gap: 5px;"
        .alignment=${"horizontal"}
        .value=${currentValue}
        @igcChange=${(event: CustomEvent<{ value: string }>) => this.onStatusChange(ctx, event)}>
        ${this.statusOptions.map(option => html`
          <igc-radio
            name="status"
            value=${option.value}
            ?checked=${option.value.toString() === currentValue}>
            ${option.text}
          </igc-radio>
        `)}
      </igc-radio-group>
    `;
  }

  private onStatusChange(ctx: IgcQueryBuilderSearchValueContext, event: CustomEvent<{ value: string }>) {
    const value = event.detail?.value;
    if (value === undefined) {
      return;
    }

    const numericValue = Number(value);
    if (ctx.implicit.value === numericValue) {
      return;
    }

    ctx.implicit.value = numericValue;
  }

  private buildDatePicker(ctx: IgcQueryBuilderSearchValueContext) {
    const implicitValue = ctx.implicit?.value;
    const currentValue = implicitValue instanceof Date
      ? implicitValue
      : implicitValue
        ? new Date(implicitValue)
        : null;

    const allowedConditions = ['equals', 'doesNotEqual', 'before', 'after'];
    const isEnabled = allowedConditions.includes(ctx.selectedCondition ?? '');

    return html`
      <igc-date-picker
        .value=${currentValue}
        .disabled=${!isEnabled}
        @click=${(event: Event) => (event.currentTarget as IgcDatePickerComponent).show()}
        @igcChange=${(event: CustomEvent) => {
          ctx.implicit.value = event.detail;
        }}>
      </igc-date-picker>
    `;
  }

  private buildTimeInput(ctx: IgcQueryBuilderSearchValueContext) {
    const currentValue = this.normalizeTimeValue(ctx.implicit?.value);
    const allowedConditions = ['at', 'not_at', 'at_before', 'at_after', 'before', 'after'];
    const isDisabled = ctx.selectedField == null || !allowedConditions.includes(ctx.selectedCondition ?? '');

    return html`
      <igc-date-time-input
        .inputFormat=${"hh:mm tt"}
        .value=${currentValue}
        .disabled=${isDisabled}
        @igcChange=${(event: CustomEvent) => {
          const picker = event.currentTarget as IgcDateTimeInputComponent;
          ctx.implicit.value = picker.value;
        }}>
        <igc-icon slot="prefix" name="clock" collection="material"></igc-icon>
      </igc-date-time-input>
    `;
  }

  private buildDefaultInput(ctx: IgcQueryBuilderSearchValueContext, matchesEqualityCondition: boolean) {
    const selectedField = ctx.selectedField;
    const dataType = selectedField?.dataType;
    const isNumber = dataType === 'number';
    const isBoolean = dataType === 'boolean';
    
    const placeholder = ctx.selectedCondition === 'inQuery' || ctx.selectedCondition === 'notInQuery'
      ? 'Sub-query results'
      : 'Value';

    const currentValue = typeof ctx.implicit?.value === 'object' && (ctx.implicit.value && 'text' in ctx.implicit.value)
      ? matchesEqualityCondition ? ctx.implicit.value.text : ''
      : ctx.implicit?.value;

    const inputValue = currentValue == null ? '' : currentValue;
    const disabledConditions = ['empty', 'notEmpty', 'null', 'notNull', 'inQuery', 'notInQuery'];
    const isDisabled = isBoolean || selectedField == null || disabledConditions.includes(ctx.selectedCondition ?? '');

    return html`
      <igc-input 
        .value=${inputValue}
        ?disabled=${isDisabled}
        placeholder=${placeholder}
        type=${isNumber ? 'number' : 'text'}
        @input=${(event: Event) => {
          const target = event.target as HTMLInputElement;
          ctx.implicit.value = isNumber
            ? target.value === '' ? null : Number(target.value)
            : target.value;
        }}>
      </igc-input>
    `;
  }

  private normalizeTimeValue(value: unknown): Date | null {
    if (!value) {
      return null;
    }

    if (value instanceof Date) {
      return value;
    }

    if (typeof value === 'string') {
      const isoCandidate = value.includes('T') ? value : `1970-01-01T${value}`;
      const parsed = new Date(isoCandidate);
      return isNaN(parsed.getTime()) ? null : parsed;
    }

    if (typeof value === 'number') {
      const parsed = new Date(value);
      return isNaN(parsed.getTime()) ? null : parsed;
    }

    return null;
  }

  private registerIcons(): void {
    const clockIcon = "<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><path d='M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z' /></svg>";
    registerIconFromText('clock', clockIcon, 'material');
  }

  private renderExpressionTree(): void {
    if (this.expressionOutput && this.expressionTree) {
      this.expressionOutput.textContent = JSON.stringify(this.expressionTree, null, 2)
    }
  }
}

new QueryBuilderTemplate();
