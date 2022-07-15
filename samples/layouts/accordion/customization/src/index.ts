import {
    defineComponents,
    IgcAccordionComponent,
    IgcCheckboxComponent,
    IgcDateTimeInputComponent,
    IgcExpansionPanelComponent,
    IgcIconComponent,
    IgcRadioComponent,
    IgcRadioGroupComponent,
    IgcRangeSliderComponent,
    IgcRatingComponent,
    IgcRatingSymbolComponent,
    registerIconFromText
} from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './AccordionCustomization.css';

defineComponents(IgcAccordionComponent, IgcExpansionPanelComponent, IgcCheckboxComponent, IgcRangeSliderComponent, IgcRadioGroupComponent, IgcRadioComponent, IgcRatingComponent, IgcRatingSymbolComponent, IgcIconComponent, IgcDateTimeInputComponent);
export class AccordionOverview {
    private categories = [
        { checked: false, type: 'Bike' },
        { checked: false, type: 'Motorcycle' },
        { checked: false, type: 'Car' },
        { checked: false, type: 'Taxi' },
        { checked: false, type: 'Public Transport' }
    ];

    constructor() {
        this.registerIcons();
        document.querySelectorAll('igc-checkbox').forEach((cb: IgcCheckboxComponent) => cb.addEventListener('igcChange', this.checkCategory));
        document.querySelector('igc-range-slider')!.addEventListener('igcChange', this.changeSliderRange);
        document.querySelectorAll('igc-radio').forEach((r: IgcRadioComponent) => r.addEventListener('igcChange', this.checkRating));
		document.querySelector('igc-date-time-input')!.addEventListener('keydown', this.hanldeTimeInput);
		document.querySelector('igc-icon[name=\'clear\'')!.addEventListener('click', () =>{
			document.querySelector('igc-date-time-input')!.clear();
		});
    }

    private checkCategory = (ev: CustomEvent) => {
        const type = (ev.target as IgcCheckboxComponent).textContent;
        const item = this.categories.find((c) => c.type === type);

        if (item) {
            item.checked = ev.detail;
        }
        this.updateCheckedCategories();
    };

    private updateCheckedCategories() {
        let checkedItems = '';
        this.categories.forEach((item) => {
            if (item.checked) {
                checkedItems = checkedItems ? checkedItems + ', ' + item.type : 'Categories: ' + item.type;
            }
        });

        const categoriesTitle = document.querySelector('h1#categories') as HTMLElement;
        categoriesTitle.textContent = checkedItems;
    }

    private changeSliderRange = (ev: CustomEvent) => {
        const lowerSpan = document.querySelector('span#lowerCost');
        const upperSpan = document.querySelector('span#upperCost');

        lowerSpan!.textContent = ev.detail.lower;
        upperSpan!.textContent = ev.detail.upper;
    };

    private checkRating = (ev: CustomEvent) => {
        const rating = (ev.target as IgcRadioComponent).querySelector('igc-rating')!.label;
        const ratingTitle = document.querySelector('h1#rating') as HTMLElement;
        ratingTitle.textContent = 'Rating: ' + rating;
    };

	private hanldeTimeInput = (ev: any) => {
		const dateTimeInput = ev.target as IgcDateTimeInputComponent;
		if (!dateTimeInput.value) {
			return;
		}
		const timeTitle = document.querySelector('h1#timeTitle') as HTMLElement;
       	timeTitle.textContent = 'Time: ' + dateTimeInput.label + ' ' + dateTimeInput.value.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
	}

    registerIcons() {
        const clearIcon =
            "<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' width='24' height='24' viewBox='0 0 24 24'><path d='M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z' /></svg>";
        registerIconFromText('clear', clearIcon, 'material');

        const clockIcon =
            "<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' width='24' height='24' viewBox='0 0 24 24'><path d='M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z' /></svg>";
        registerIconFromText('clock', clockIcon, 'material');
    }
}

new AccordionOverview();
