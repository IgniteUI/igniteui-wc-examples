declare module '!!style-loader?{"injectType":"lazyStyleTag"}!css-loader!*' {
    const style: { use: () => void; unuse: () => void };
    export default style;
}
