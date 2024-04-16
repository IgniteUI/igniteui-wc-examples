import { registerIcon } from "igniteui-webcomponents";

const icons = {
    music: `https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsoutlined/music_note/default/24px.svg`,
    food: `https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsoutlined/brunch_dining/default/24px.svg`,
    arts: `https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsoutlined/palette/default/24px.svg`,
    party: `https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsoutlined/nightlife/default/24px.svg`,
    sport: `https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsoutlined/sports_and_outdoors/default/24px.svg`,
    education: `https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsoutlined/school/default/24px.svg`
};

export async function registerCategoryIcons() {
    await Promise.all(Object.entries(icons).flatMap(([name, url]) => registerIcon(name, url, "categories")));
}

export const cities = ["New York", "Sofia", "Tokyo"];

export const venues = {
    "New York": ["The Glasshouse", "The Pool", "Nebula", "74Wythe", "JACX&Co", "SPACE Events", "620 Loft & Garden"],
    Sofia: ["Inter Expo Center", "National Palace of Culture", "Sofia Event Center", "Radisson Blu Grand Hotel", "Hilton", "Hotel Marinela"],
    Tokyo: ["Tokyo Dome", "Kokugikan Sumo Stadium", "Miraikan", "Tachikawa Stage Garden", "Hotel Gajoen", "Meiji Kinenkan"]
};
