/**
 * Elements плагин
 */
const Elements = (p) => {
  /* Добавляем массив элементов к каждому окну */
  p.on('chart-windows/create', (w) => ({ ...w, elements: [] }));

  /* Выводим элементы внутри окна */
  p.on('chart-windows-content/entry', ({ context, id }) => {
    const { elements } = p.chartWindows.get(id);

    elements.forEach((element) => {
      const { type, meta } = element;
      const config = elementsConfigs[type];

      if (config.inside) {
        config.inside(context, meta);
      } else {
        console.warnOnce(`Элемент ${type} не имеет метода отрисовки`);
      }
    });

    return { context, id };
  });

  /* Elements configs */
  let elementsConfigs = {};

  /* Создаём API для элементов */
  p.elements = {
    register: (type, config) => elementsConfigs[type] = config,
    push: (id, element) => {
      p.chartWindows.update(id, (w) => ({
        ...w,
        elements: w.elements.concat([element])
      }));
    },
  };

  /* Создаём сокет для монтажа элементов */
  p.on('mount', (data) => {
    p.emitSync('elements/register');
    return data;
  });
};

Elements.plugin = {
  name: 'elements',
  version: '1.0.0',
  dependencies: {
    'state': '1.0.0',
    'chart-windows': '1.0.0'
  }
};

export default Elements;
