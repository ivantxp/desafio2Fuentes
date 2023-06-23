import { Console } from "console";
import fs from "fs";

class ProductManager {
    constructor(filePath) {
        this.path = filePath;
    }

    getProducts() {
        console.log(this.path);
        /*        if (this.path === undefined)
            try {
                fs.promises.readFile;
            } catch {
                (err) => console.log(err);
            }
        return this.products; */
    }

    async addProduct(title, description, price, thumbnail, code, stock) {
        const newProduc = {
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock,
        };
        try {
            const parse = await fs.promises.readFile(this.path, "utf-8");
            const consult = JSON.parse(parse);

            const addNewProduct = [
                ...consult,
                { ...newProduc, id: idMax.id + 1 },
            ];
            console.log(addNewProduct);
            await fs.promises.writeFile(
                this.path,
                JSON.stringify(addNewProduct)
            );
        } catch (error) {
            fs.promises.writeFile(
                this.path,
                `[${JSON.stringify({ id: 0, ...newProduc })}]`
            );
        }
    }

    getProductById(id) {
        const targetID = this.products.find((el) => el.id === id);

        if (targetID) {
            return targetID;
        } else {
            return "not   Found";
        }
    }
}

//pruebas codigo
const products = new ProductManager("producto.txt");
console.log(
    products.addProduct(
        "Title 1",
        "Description 1",
        40,
        "sin imag",
        "coded71",
        15
    )
);

/* //codigos de prueba ingreso
products.addProduct("Title 1", "Description 1", 40, "sin imag", "coded71", 15);

//codigos de prueba ingreso
products.addProduct("Title 2", "Description 2", 20, "sin imag", "coded1", 15);

//codigos de prueba ingreso error numerico
products.addProduct("Title 3", "Description 3", "24", "sin imag", "coded1", 15);

//codigos de prueba ingreso error code
products.addProduct("Title 3", "Description 3", 24, "sin imag", "coded71", 15);

//codigos de prueba mostrar todo los productos
console.log(products.getProducts());

//codigos de prueba buscar por id
console.log(products.getProductById(2));

//codigos de prueba buscar por id
console.log(products.getProductById(10));
 */
