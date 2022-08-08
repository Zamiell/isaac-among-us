import { hexToKColor } from "isaacscript-common";
import { COLOR_BYTE, HexColors } from "../enums/HexColors";
import { fonts } from "../fonts";

export const DEFAULT_OPACITY = 0.75;
const SIZE_OF_HEX_STRING = 6;

export function drawText(
  text: string,
  position: Vector,
  alpha = DEFAULT_OPACITY,
): void {
  let x = position.X;
  const y = position.Y;

  const textSegments = text.split(COLOR_BYTE);
  for (let i = 0; i < textSegments.length; i++) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const textSegment = textSegments[i]!;
    if (textSegment === "") {
      return;
    }

    let hexColor: string;
    let textWithoutColor: string;
    if (i === 0) {
      hexColor = HexColors.WHITE.slice(COLOR_BYTE.length);
      textWithoutColor = textSegment;
    } else {
      hexColor = textSegment.slice(0, SIZE_OF_HEX_STRING);
      textWithoutColor = textSegment.slice(SIZE_OF_HEX_STRING);
    }

    const kColor = hexToKColor(hexColor, alpha);
    fonts.pf.DrawString(textWithoutColor, x, y, kColor, 0, true);

    x += fonts.pf.GetStringWidth(textWithoutColor);
  }
}
