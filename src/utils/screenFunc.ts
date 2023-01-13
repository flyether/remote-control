import { Point, Region, screen, FileType } from '@nut-tree/nut-js';
import { base64_encode } from './base64';

export const scrennFunc = async (currentPositionSCRN: Point, returnedValue: string, commandParam: string) => {
  let xxx = currentPositionSCRN.x - 100;
  let yyy = currentPositionSCRN.y - 100;
  if (xxx < 100) {
    xxx = 100;
  }

  if (yyy < 100) {
    yyy = 100;
  }
  const scrn = await screen.captureRegion(
    'screen',
    new Region(xxx - 100, yyy - 100, 200, 200),
    FileType.PNG,
    './screen',
  );
  const buffer = base64_encode(scrn);
 return returnedValue = `${commandParam} ${buffer}`;
};
