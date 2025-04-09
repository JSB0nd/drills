const {Router} = require('express')
const fs = require('fs');
const path = require('path');
const cwd = process.cwd();

const {createProductObject} = require('./createProductObject');

const router = Router()

router.get('/', function (req, res) {
    
    fs.readFile(__dirname + '/index.html', {encoding: "utf-8"}, (err, html) => {
        if (err) {
            console.error(err.message);
        }

        res.send(html);
    });
});

router.get('/getProducts', function(req, res){
    fs.readFile(path.join(cwd, "/server/data/products.json"), "utf-8", (err, dataString) => {
        if (err){
            console.error(err.message);
            res.json({success: false, error: err.message});
        } else {
            const products = JSON.parse(dataString);
            res.json(products.data);
        }
    });
});

router.post('/createProduct', function(req, res){
    fs.readFile(path.join(cwd, "/server/data/products.json"), "utf-8", (err, json) => {
        if (err) {
            console.error(err.message);
            res.json({success: false, error: err.message});
        } else {
            
            const products = JSON.parse(json);
            const newProduct = createProductObject(products.lastId + 1, req.body, ["red", "green", "blue"]);
            
            products.data.push(newProduct);
            products.lastId = products.lastId + 1;

            fs.writeFile(path.join(cwd, "/server/data/products.json"), JSON.stringify(products), (err) => {
                if (err) {
                    console.error(err.message);
                    res.json({success: false, error: err.message});
                } else {
                    res.json({success: true});
                }
            })
        }
    });
});

router.delete('/deleteProduct', function(req, res){

    const {uid} = req.body;

    if (!uid){
        res.json({success: false, error: "No uid presented"});
    }

    fs.readFile(path.join(cwd, "/server/data/products.json"), "utf-8", (err, json) => {
        if (err) {
            console.error(err.message);
            res.json({success: false, error: err.message});
        } else {
            const {lastId, data} = JSON.parse(json);
            const isUidEqualLastId = uid === lastId;
            let stringData;

            if (isUidEqualLastId) {
                data.pop();
                stringData = JSON.stringify({lastId: lastId - 1, data});
                
            } else {
                const filteredData = data.filter(item => item.uid !== uid);
                console.log('filteredData', filteredData);
                stringData = JSON.stringify({lastId, data: filteredData});
            }

            fs.writeFile(path.join(cwd, "/server/data/products.json"), stringData, (err) => {
                if (err){
                    console.error(err.message);
                    res.json({success: false, error: err.message});
                } else {
                    res.json({success: true});
                }
            });
        }
    });
});

router.post('/updateProduct', function(req, res){
    console.log('req', req.body);
    fs.readFile(path.join(cwd, "/server/data/products.json"), "utf-8", (err, json) => {
        if (err) {
            console.error(err.message);
            res.json({success: false, error: err.message});
        } else {
            
            const {uid, ...rest} = req.body;
            const products = JSON.parse(json);
            const updatedProduct = createProductObject(uid, rest, ["red", "green", "blue"]);
            
            const updatedProductList = products.data.map(product => {
                if (product.uid === uid){
                    return updatedProduct;
                }
                return product;
            });

            fs.writeFile(path.join(cwd, "/server/data/products.json"), JSON.stringify({lastId: products.lastId, data: updatedProductList}), (err) => {
                if (err) {
                    console.error(err.message);
                    res.json({success: false, error: err.message});
                } else {
                    res.json({success: true});
                }
            })
        }
    });
});

module.exports = router