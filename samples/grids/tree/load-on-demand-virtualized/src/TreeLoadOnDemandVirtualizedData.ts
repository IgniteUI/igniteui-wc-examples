export interface DataServiceResult {
    Data: ItemData[];
    TotalCount: number;
}
export interface ItemData {
    Name: string;
    Icon: string;
    Files?: ItemData[];
}

export interface SelectableItemData extends ItemData {
    Selected?: boolean;
}

export const RemoteItem: SelectableItemData = {
    Name: "Network",
    Icon: "network"
};

export const DATA: SelectableItemData[] = [
    {
        Name: "Computer",
        Icon: "desktop",
        Files: [
            {
                Name: "Documents",
                Icon: "docs_folder",
                Files: [
                    { Name: "Report 2016", Icon: "report" },
                    { Name: "Report 2017", Icon: "report" },
                    { Name: "Report 2018", Icon: "report" },
                    { Name: "Report 2019", Icon: "report" },
                    { Name: "Report 2020", Icon: "report" }
                ]
            },
            {
                Name: "Music",
                Icon: "album",
                Files: [
                    { Name: "Track 1", Icon: "music" },
                    { Name: "Track 2", Icon: "music" },
                    { Name: "Track 3", Icon: "music" },
                    { Name: "Track 4", Icon: "music" },
                    { Name: "Track 5", Icon: "music" }
                ]
            },
            {
                Name: "Pictures",
                Icon: "pictures",
                Files: [
                    { Name: "Image 101", Icon: "picture" },
                    { Name: "Image 102", Icon: "picture" },
                    { Name: "Image 103", Icon: "picture" },
                    { Name: "Image 104", Icon: "picture" },
                    { Name: "Image 105", Icon: "picture" }
                ]
            },
            {
                Name: "Recycle Bin",
                Icon: "bin",
                Files: [
                    { Name: "Track 6", Icon: "music" },
                    { Name: "Track 7", Icon: "music" },
                    { Name: "Image 106", Icon: "picture" },
                    { Name: "Image 107", Icon: "picture" }
                ]
            }
        ]
    }
];
