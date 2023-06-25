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
            return (await data?.length) > 0 ? data : "no hay registro";
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
            try {
                let data = await utils.read(this.path);
                this.products = data?.length > 0 ? data : [];
            } catch (err) {
                console.log(err);
            }

            const repit = this.products.some((el) => el.code === code);

            if (repit) {
                return `el codigo "${code}" ya fue ingresado, ingrese uno nuevo`;
            } else {
                const x = this.products.length - 1;
                const newId =
                    this.products.length === 0 ? 1 : this.products[x].id + 1;
                const newProduc = {
                    id: newId,
                    title: title,
                    description: description,
                    price: price,
                    thumbnail: thumbnail,
                    code: code,
                    stock: stock,
                };

                this.products.push(newProduc);
                this.products.sort((a, b) => a.id - b.id);

                try {
                    await utils.write(this.path, this.products);
                } catch (error) {
                    console.log(error);
                } finally {
                    return newProduc;
                }
            }
        }
    }

    async getProductById(id) {
        try {
            let data = await utils.read(this.path);
            this.products = (await data?.length) > 0 ? data : [];
            const targetID = this.products.find((el) => el.id === id);
            if (targetID !== undefined) {
                return targetID;
            } else {
                return "not   Found";
            }
        } catch (error) {
            console.log(error);
        }
    }

    async updateProduct(id, obj) {
        try {
            let data = await utils.read(this.path);
            this.products = (await data?.length) > 0 ? data : [];
            const targetIndex = this.products.findIndex((el) => el.id === id);
            if (targetIndex !== -1) {
                this.products[targetIndex] = { id: targetIndex, ...obj };
                console.log(this.products[targetIndex]);
                await utils.write(this.path, this.products);
            } else {
                return "not   Found";
            }
        } catch (error) {
            console.log(error);
        }
    }
    async deletProductById(id) {
        let data = await utils.read(this.path);
        this.products = (await data?.length) > 0 ? data : [];
        const targetIndex = this.products.findIndex((el) => el.id === id);
        if (targetIndex !== -1) {
            let product = this.products[targetIndex];
            this.products.splice(targetIndex, 1);
            await utils.write(this.path, this.products);
            return { product };
        } else {
            return "not   Found";
        }
    }
    catch(error) {
        console.log(error);
    }
}

//Preubas
const products = new ProductManager("./producto.json");

/* products
    .addProduct("Title 4", "Description 4", 40, "sin imag", "a4", 15)
    .then((res) => console.log(res))
    .catch((err) => console.log(err)); */

//products.getProducts().then((res) => console.log(res));

/* products
    .updateProduct(4, {
        title: "atum",
        description: "alimento",
        price: 500,
        thumbnail: "thumbnail",
        code: "aa45",
        stock: 88,
    })
    .then((res) => console.log(res));
 */
/* console.log(
    products
        .getProductById(8)
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
); */

/* console.log(
    products.addProduct(
        "Title 8",
        "Description ss",
        440,
        "sin imag",
        "7ss8a",
        15
    )
);
console.log(await products.getProducts()); */
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
