const hexToRgb = (hex) => {
    if (!hex) return null;
    hex = hex.replace(/^#/, '');
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return [r, g, b];
};

const sayWithColor = (hexTextColors, hexBackgroundColors, text) => {
    const interpolateColor = (start, end, ratio) => {
        if (!start || !end) return start || end;
        const startRgb = hexToRgb(start);
        const endRgb = hexToRgb(end);
        const interpolateComponent = (startComp, endComp) => Math.round(startComp + (endComp - startComp) * ratio);
        const interpolatedRgb = startRgb.map((startComp, index) => interpolateComponent(startComp, endRgb[index]));
        return `#${interpolatedRgb.map(comp => comp.toString(16).padStart(2, '0')).join('')}`;
    };
    const textLength = text.length;
    const steps = hexTextColors.length - 1;
    for (let i = 0; i < textLength; i++) {
        const ratio = i / (textLength - 1);
        const step = Math.floor(ratio * steps);
        const fgColor = hexTextColors ? interpolateColor(hexTextColors[step], hexTextColors[step + 1], (ratio * steps) % 1) : undefined;
        const bgColor = hexBackgroundColors ? interpolateColor(hexBackgroundColors[step], hexBackgroundColors[step + 1], (ratio * steps) % 1) : undefined;
        process.stdout.write(`${fgColor ? `\x1b[38;2;${hexToRgb(fgColor).join(';')}m` : ''}${bgColor ? `\x1b[48;2;${hexToRgb(bgColor).join(';')}m` : ''}${text[i]}\x1b[0m`);
    }
    process.stdout.write('\n');
};

exports.say = class WATER_ON_THE_HILL {
    constructor (text, textColorsHex = undefined, bgColorsHex = undefined) {
        sayWithColor(textColorsHex, bgColorsHex, text)
    }
}