import { Button, mouse, left, right, up, down, Point, straightTo, centerOf, Region } from '@nut-tree/nut-js';
import { mouseCommands } from './Interfaces_and_constants';

export const commandSwitch = async (command: string) => {
  const params = command.split(' ');
  const commandParam = params[0];
  params.shift();

  let returnedValue: string | Point = 'not';

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
      const xx = (await mouse.getPosition()).x;
      const yy = (await mouse.getPosition()).y;
      // returnedValue = await mouse.getPosition();
      returnedValue = `${commandParam} ${xx},${yy}`;
      break;

    case mouseCommands.CIRCLE:
      const radius = parseInt(params[0]);

      const currentPosition = await mouse.getPosition();
      await mouse.pressButton(Button.LEFT);
      for (let i = 0; i < 2 * Math.PI * radius; i++) {
        const x = currentPosition.x + radius * Math.cos(i / radius);
        const y = currentPosition.y + radius * Math.sin(i / radius);
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

    default:
      console.log('Invalid input');
      break;
  }
  return returnedValue;
};
