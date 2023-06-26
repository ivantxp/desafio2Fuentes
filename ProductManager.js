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
            const action = data?.length > 0 ? data : "no hay registro";
            return action;
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
                console.log(
                    `el codigo "${code}" ya fue ingresado, ingrese uno nuevo`
                );
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
            this.products = data?.length > 0 ? data : [];
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
            this.products = data?.length > 0 ? data : [];
            const targetIndex = this.products.findIndex((el) => el.id === id);
            if (targetIndex !== -1) {
                this.products[targetIndex] = { id: id, ...obj };
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
        this.products = data?.length > 0 ? data : [];
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

//sin productos
/* products.getProducts().then((res) => console.log(res));
 */

//agregado
/* let randon = 19;//Math.floor(Math.random() * 10000);
 */
/* products
    .addProduct(
        "Title " + randon,
        "Description " + randon,
        40,
        "sin imag",
        "a" + randon,
        15
    )
    .then((res) => console.log(res))
    .catch((err) => console.log(err)); */

/* products.getProducts().then((res) => console.log(res)); */

//buscado por id
/* products.getProductById(2).then((res) => console.log(res)); */

//editado
/* products.updateProduct(2, {
    title: "title ",
    description: "description",
    price: 50,
    thumbnail: "thumbnail ediit",
    code: "code ediit",
    stock: 80,
}); */

//borrado
//products.deletProductById(2);
