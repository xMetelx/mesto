export default class Section {
  constructor ( items = [], containerElement, renderer ) { //все в фигурных скобках
    this._items = items;
    this._containerElement = containerElement;
    this._renderer = renderer;
  }

  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem (element, place = 'after') {
    if (place === 'before') {
      this._containerElement.prepend(element)
    }
    if (place === 'after') {
      this._containerElement.append(element)
    }
  }
}