// `use strict`;
function DomElement(selector, height, width, bg, fontSize){
  this.selector = selector;
  this.height = height;
  this.width = width;
  this.bg = bg;
  this.fontSize = fontSize;
}
DomElement.prototype.createsElement = function() {
  if(!this.selector.indexOf('.')){
    let div = document.createElement('div');
    div.innerHTML = ' Создан div';
    div.classList.add(this.selector.slice(1));
    this.createsElementStyle(div);
    body.appendChild(div)

  }else if(!this.selector.indexOf('#')){
    let p = document.createElement('p')
    p.innerHTML = ' Создан параграф';
    p.id = this.selector.slice(1);
    this.createsElementStyle(p);
    body.appendChild(p)
  }
}
DomElement.prototype.createsElementStyle = function(teg) {
  teg.style.cssText = `height: ${this.height}px; width: ${this.width}px; background-color: ${this.bg}; font-size: ${this.fontSize}px;`
}
let element = new DomElement(prompt('Введите селектор'), prompt('высота'), prompt('ширина'), prompt('background'), prompt('размер текста'))

console.dir(element)
console.log(element.createsElement())


