import { css } from "lit";

export const treeStyles = css`
    igc-tree {
        width: 320px;
        height: 360px;
        overflow-y: auto;
    }

    .tree-item-icon {
        display: flex;
        align-items: center;
        vertical-align: middle;
    }

    .item-refresh {
        cursor: pointer;
        padding: 0px 4px;
        color: var(--igx-success-500);
    }

    .item {
        display: flex;
        align-items: center;
    }

    .item-title {
        margin: 0 10px;
        vertical-align: middle;
    }

    #remote-dummy-child {
        visibility: collapse;
        height: 0px;
    }
`;
