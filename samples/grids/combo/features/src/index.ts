import {defineComponents, IgcComboComponent, IgcComboItemComponent, IgcInputComponent, IgcIconComponent, IgcSwitchComponent} from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';

defineComponents(IgcComboComponent, IgcComboItemComponent, IgcInputComponent, IgcIconComponent, IgcSwitchComponent);
export class ComboFeatures {
    private combo: IgcComboComponent<object>;

    public cities = [
        { name: 'London', id: 'UK01', country: 'UK' },
        { name: 'Manchester', id: 'UK02', country: 'UK' },
        { name: 'Birmingham', id: 'UK03', country: 'UK' },
        { name: 'Glasgow', id: 'UK04', country: 'UK' },
        { name: 'Liverpool', id: 'UK05', country: 'UK' },
        { name: 'New York', id: 'US01', country: 'USA'},
        { name: 'Miami', id: 'US02', country: 'USA'},
        { name: 'Philadelphia', id: 'US03', country: 'USA'},
        { name: 'Chicago', id: 'US04', country: 'USA'},
        { name: 'Springfield', id: 'US05', country: 'USA'},
        { name: 'Los Angeles', id: 'US06', country: 'USA'},
        { name: 'Houston', id: 'US07', country: 'USA'},
        { name: 'Phoenix', id: 'US08', country: 'USA'},
        { name: 'San Diego', id: 'US09', country: 'USA'},
        { name: 'Dallas', id: 'US010', country: 'USA'},
        { name: 'Sofia', id: 'BG01', country: 'Bulgaria'},
        { name: 'Plovdiv', id: 'BG02', country: 'Bulgaria'},
        { name: 'Varna', id: 'BG03', country: 'Bulgaria'},
        { name: 'Burgas', id: 'BG04', country: 'Bulgaria'},
        { name: 'Rome', id: 'IT01', country: 'Italy'},
        { name: 'Milan', id: 'IT02', country: 'Italy'},
        { name: 'Naples', id: 'IT03', country: 'Italy'},
        { name: 'Turin', id: 'IT04', country: 'Italy'},
        { name: 'Palermo', id: 'IT05', country: 'Italy'},
        { name: 'Florence', id: 'IT06', country: 'Italy'}
    ];

    constructor() {
        this.combo = document.getElementById('combo') as IgcComboComponent<object>;
        this.combo.data = this.cities;

        let switchIcon = document.getElementById('caseSensitive') as IgcSwitchComponent;
        switchIcon.addEventListener('igcChange', () => {
            this.combo.caseSensitiveIcon = switchIcon.checked ? true : false
        });

        let switchFilter = document.getElementById('filtering') as IgcSwitchComponent;
        switchFilter.addEventListener('igcChange', () => {
            if (switchFilter.checked === true) {
                this.combo.disableFiltering = true;
                switchIcon.disabled = true;
            } else {
                this.combo.disableFiltering = false;
                switchIcon.disabled = false;
            }
        });

        let switchGroup = document.getElementById('grouping') as IgcSwitchComponent;
        switchGroup.addEventListener('igcChange', () => {
            this.combo.groupKey = switchGroup.checked ? 'country' : ''
        });

        let switchDisable = document.getElementById('disabled') as IgcSwitchComponent;
        switchDisable.addEventListener('igcChange', () => {
            this.combo.disabled = switchDisable.checked ? true : false
        });
    }
}

new ComboFeatures();
