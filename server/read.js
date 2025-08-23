const fs = require('fs');
const path = require('path');

function readJsonFiles(targetDirName) {

    const targetDirPath = path.resolve(process.cwd(), targetDirName);

    try {
        const directoryItems = fs.readdirSync(targetDirPath);
        
        let resultArray = [];

        for (let item of directoryItems) {
            const fullItemPath = path.join(targetDirPath, item);
            
            if (fs.statSync(fullItemPath).isDirectory()) {
                try {

                    const filesInSubfolder = fs.readdirSync(fullItemPath);
                    
                    const jsonFiles = filesInSubfolder.filter(file => file.endsWith('.json'));
                    
                    resultArray.push({
                        name: item,
                        children: new Array(jsonFiles.length).fill(0).map((zero, index) => String(zero + index + 1))
                    });
                } catch (err) {
                    console.error(`Ошибка чтения подпапки "${item}"`, err.message);
                }
            }
        }

        return resultArray;
    } catch (err) {
        console.error(`Ошибка при чтении папки "${targetDirName}":`, err.message);
        throw new Error(err.message);
    }
}

module.exports = readJsonFiles;