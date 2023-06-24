import utils from "./utils.js";
import fs from "fs";

class ProductManager {
    constructor(filePath) {
        this.path = filePath;
        this.products = [];
    }

    async getProducts() {
        try {
            let data = await utils.read(this.path);
            return data?.length > 0 ? this.products : "no hay registro";
        } catch (err) {
            console.log(err);
        }
    }

    async addProduct(title, description, price, thumbnail, code, stock) {
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.error("a dejado un campo de ingreso vacio en addProductos");
        } else if (typeof price !== "number" || typeof stock !== "number") {
            console.error(`error ingreso ${title}`);
        } else {
            const newProduc = {
                title: title,
                description: description,
                price: price,
                thumbnail: thumbnail,
                code: code,
                stock: stock,
            };

            try {
                let data = await utils.read(this.path);
                this.products = data?.length > 0 ? data : [];
            } catch (err) {
                console.log(err);
            }
            this.products.push(newProduc);
            try {
                await utils.write(this.path, this.products);
            } catch (error) {
                console.log(error);
            }
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
const products = new ProductManager("./producto.json");
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
//console.log(await products.getProducts());
/* console.log(
    products.addProduct(
        "Title 1",
        "Description 1",
        40,
        "sin imag",
        "coded71",
        15
    )
); */

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
