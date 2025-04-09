const colors = {
    red: 'Красный',
    green: 'Зеленый',
    blue: 'Синий',
};

const attributeNames = {
    color: 'Цвет',
};

const paramNames = {
    width: 'Ширина',
    length: 'Длина',
    height: 'Высота',
    weight: 'Вес',
};

const otherProps = {
    manufacturer: 'Производитель',
};

const createElement = tagName => document.createElement(tagName);
const addClassList = cssClassName => element => {
    element.classList.add(cssClassName);

    return element;
};
const appendNameValueSpansSection = props => {
    const [sectionDOM, spanNDOM, spanVDOM, propName, propValue, dictionary] = props;
    const name = dictionary[propName];
    spanNDOM.appendChild(document.createTextNode(`${name}: `));
    spanVDOM.appendChild(document.createTextNode(propValue));
    [spanNDOM, spanVDOM].forEach(span => sectionDOM.appendChild(span));

    return sectionDOM;
};

export const createProductCard = productList => productList.map(productCard => {
    const [container, productName] = ['div', 'h3'].map(createElement);
    const [descC, priceC, propsC, attrC, manufC] = new Array(5).fill('section').map(createElement).map(addClassList('card-attribute-container'));
    const [lengthN, widthN, heightN, weightN, colorN, manufN] = new Array(6).fill('span').map(createElement).map(addClassList('card-attribute-name'));
    const [lengthV, widthV, heightV, weightV, colorV, manufV] = new Array(6).fill('span').map(createElement).map(addClassList('card-attribute-value'));

    addClassList('product-card-container')(container);
    const {title, description, price, attributes, manufacturer, params} = productCard;
    const {color} = attributes; 
    const {width, length, height, weight} = params;

    productName.textContent = title;
    descC.textContent = `${description}`;
    priceC.textContent = `${price} руб.`;

    [
        [propsC, lengthN, lengthV, 'length', length, paramNames],
        [propsC, widthN, widthV, 'width', width, paramNames],
        [propsC, heightN, heightV, 'height', height, paramNames],
        [propsC, weightN, weightV, 'weight', weight, paramNames],
        [attrC, colorN, colorV, 'color', color, attributeNames],
        [manufC, manufN, manufV, 'manufacturer', manufacturer, otherProps],
    ].forEach(props => appendNameValueSpansSection(props));

    [productName, descC, priceC, propsC, attrC, manufC].forEach(element => container.appendChild(element));
    
    return container;
});