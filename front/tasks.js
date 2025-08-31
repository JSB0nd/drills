const date = new Date();
console.log(date.toLocaleString());

try { throw new Error('Test error'); } catch (e) {
    console.log(e.stack);
}

const ab = new ArrayBuffer(10);
console.log(ab.byteLength);

const obj = { name: 'John', age: 30 };
console.log(JSON.stringify(obj));

console.log(Math.random());

const regex = /^\w+$/;
console.log(regex.test('test'));

const map = new Map([[1, 'one'], [2, 'two']]);
for (const [k, v] of map.entries()) { console.log(k, v); }

const proxy = new Proxy({}, {
    get(target, prop) {
        return target[prop] || 'default';
    }
});
console.log(proxy.name);

new Promise(resolve => setTimeout(() => resolve('resolved'), 100))
    .then(result => console.log(result));