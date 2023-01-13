import { Button, mouse, left, right, up, down, Point, straightTo } from '@nut-tree/nut-js';
import { mouseCommands } from './Interfaces_and_constants';
import { scrennFunc } from './screenFunc';


export const commandSwitch = async (command: string) => {
  console.log(command);
  const params = command.split(' ');
  const commandParam = params[0];
  params.shift();

  let returnedValue = 'not';

  switch (commandParam) {
    case mouseCommands.RIGHT:
      await mouse.move(right(parseInt(params[0])));
      returnedValue = commandParam;
      console.log(parseInt(params[0]));
      break;

    case mouseCommands.LEFT:
      await mouse.move(left(parseInt(params[0])));
      returnedValue = commandParam;
      console.log(parseInt(params[0]));
      break;

    case mouseCommands.DOWN:
      await mouse.move(down(parseInt(params[0])));
      returnedValue = commandParam;
      console.log(parseInt(params[0]));
      break;

    case mouseCommands.UP:
      await mouse.move(up(parseInt(params[0])));
      returnedValue = commandParam;
      console.log(parseInt(params[0]));
      break;

    case mouseCommands.POSITION:
      const currentPosition = await mouse.getPosition();
      const xx = currentPosition.x;
      const yy = currentPosition.y;
      returnedValue = `${commandParam} ${xx},${yy}`;
      break;

    case mouseCommands.CIRCLE:
      const radius = parseInt(params[0]);
      const currentPositionCircle = await mouse.getPosition();
      await mouse.pressButton(Button.LEFT);
      for (let i = 0; i < 2 * Math.PI * radius; i++) {
        const x = currentPositionCircle.x + radius * Math.cos(i / radius);
        const y = currentPositionCircle.y + radius * Math.sin(i / radius);
        await mouse.move(straightTo(new Point(x - radius, y)));
      }
      mouse.releaseButton(Button.LEFT);
      returnedValue = commandParam;
      break;

    case mouseCommands.SQUARE:
      await mouse.drag(right(parseInt(params[0])));
      await mouse.drag(down(parseInt(params[0])));
      await mouse.drag(left(parseInt(params[0])));
      await mouse.drag(up(parseInt(params[0])));
      returnedValue = commandParam;
      break;

    case mouseCommands.RECTANGLE:
      await mouse.drag(right(parseInt(params[0])));
      await mouse.drag(down(parseInt(params[1])));
      await mouse.drag(left(parseInt(params[0])));
      await mouse.drag(up(parseInt(params[1])));
      console.log(params);
      returnedValue = commandParam;
      break;

    case mouseCommands.PRNT_SCRN:
      const currentPositionSCRN = await mouse.getPosition();
      try {
        returnedValue =   await scrennFunc(currentPositionSCRN, returnedValue, commandParam )
      } catch {
        console.log('some error maybe something wrong with the coordinates');
      }

      break;

    default:
      console.log('Invalid input');
      break;
  }
  return returnedValue;
};
