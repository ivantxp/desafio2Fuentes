import fs from "fs";

async function read(file) {
    try {
        let extraction = await fs.promises.readFile(file, "utf-8");
        let data = JSON.parse(extraction);
        return data;
    } catch (err) {
        console.log(err);
    }
}

async function write(file, data) {
    try {
        await fs.promises.writeFile(file, JSON.stringify(data));
    } catch (error) {
        console.log(error);
    }
}

export default { read, write };
