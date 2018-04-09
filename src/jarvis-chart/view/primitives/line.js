export default ({ x0, y0, x1, y1, width, color, matrix }, options, context) => {
  switch (options.render) {
    case 'svg':
      context.push(`
        <line x1='${x0}' y1='${y0}' x2='${x1}' y2='${y1}' style='stroke: ${color}; strokeWidth: ${width}' transform='${matrix ? matrix.toCss() : ''}' />
      `);

      break;
    case 'canvas':
      if (matrix) {
        const { a, b, c, d, tx, ty } = matrix.getValues();
        context.save();
        context.transform(a, b, c, d, tx, ty);
      }

      context.beginPath();
      context.moveTo(x0, y0);
      context.lineTo(x1, y1);
      context.lineWidth = width === 1 ? 0.6 : width;
      context.strokeStyle = color;
      context.stroke();

      if (matrix) {
        context.restore();
      }

      break;
    default:
      throw `Line is not implemented for ${options.render}`;
  }
};
