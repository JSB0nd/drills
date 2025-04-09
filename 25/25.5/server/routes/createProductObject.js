const createProductObject = (uid, productInfo, availableColors) => {
    
    const {title, description, price, width, length, height, weight, color, manufacturer} = productInfo;

    return {
        uid,
        title, 
        description,
        price,
        params: {
            width, length, height, weight,
        },
        attributes: {
            color,
            available: availableColors,
        },
        manufacturer,
    };
};

module.exports = {createProductObject};
