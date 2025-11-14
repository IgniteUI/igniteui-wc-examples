import {
  defineComponents,
  IgcRatingComponent,
  IgcCheckboxComponent,
  IgcSelectComponent,
  IgcAvatarComponent,
} from "igniteui-webcomponents";
import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { IgcGridLite, ColumnConfiguration } from "igc-grid-lite";
import "igniteui-webcomponents/themes/light/bootstrap.css";
import { User, createUser } from "./mock-data";

IgcGridLite.register();

defineComponents(
  IgcAvatarComponent,
  IgcRatingComponent,
  IgcCheckboxComponent,
  IgcSelectComponent
);

const choices = ["Low", "Standard", "High"];

@customElement("app-sample-main")
export class Main extends LitElement {
  static styles = css`
    :host {
      contain: strict;
      min-height: 400px;
      --ig-size: 1;
    }
    igc-grid-lite {
      min-height: 75vh;
    }
  `;

  @state()
  protected data: User[] = Array.from({ length: 1e3 }, () => createUser());

  @state()
  protected columns: ColumnConfiguration<User>[] = [
    {
      key: "avatar",

      headerText: "Avatar",
      cellTemplate: ({ value }) => html`<igc-avatar
        shape="circle"
        alt="User avatar"
        .src=${value}
      ></igc-avatar>`,
    },
    {
      key: "firstName",
      headerText: "First name",
      sort: true,
      filter: true,
      resizable: true,
    },
    {
      key: "lastName",
      headerText: "Last name",
      sort: true,
      filter: true,
      resizable: true,
    },
    {
      key: "email",
      headerText: "Email Address",
    },
    {
      key: "priority",
      headerText: "Priority",
      width: "12rem",
      sort: {
        comparer: (a, b) => choices.indexOf(a) - choices.indexOf(b),
        caseSensitive: true,
      },
      cellTemplate: ({ value }) => html`
        <igc-select outlined .value=${value} flip
          >${choices.map(
            (choice) =>
              html`<igc-select-item .value=${choice}
                >${choice}</igc-select-item
              >`
          )}</igc-select
        >
      `,
    },
    {
      key: "satisfaction",
      headerText: "Satisfaction rating",
      type: "number",
      sort: true,
      filter: true,
      cellTemplate: ({ value }) =>
        html`<igc-rating readonly .value=${value}></igc-rating>`,
    },
    {
      key: "registeredAt",
      headerText: "Registered @",
      sort: true,
      cellTemplate: ({ value }) => html`${value.toLocaleString()}`,
    },
    {
      key: "active",
      type: "boolean",

      headerText: "Active",
      cellTemplate: ({ value }) =>
        html`<igc-checkbox ?checked=${value}></igc-checkbox>`,
    },
  ];

  protected render() {
    return html`<igc-grid-lite
      .columns=${this.columns}
      .data=${this.data}
    ></igc-grid-lite>`;
  }
}
