import { createRouter } from "https://deno.land/x/servest@v1.3.1/mod.ts"
import { productController } from "../controllers/products.ts"

const productRouter = createRouter()

productRouter.get('/', async (req) => {
    const id = req.query.get("id")
    if(!id) {
        const products = productController.getProducts()
        await req.respond({
            status: 200,
            headers: new Headers({
                "content-type": "application/json"
            }),
            body: JSON.stringify(products)
        })
    } else {
        try {
            const product = productController.getProductById(id)
            await req.respond({
                status: 200,
                headers: new Headers({
                    "content-type": "application/json"
                }),
                body: JSON.stringify(product)
            })
        } catch(e) {
            await req.respond({
                status: 404,
                headers: new Headers({
                    "content-type": "application/json"
                }),
                body: JSON.stringify(e.message)
            })
        }
    }
})

productRouter.post('/', async (req) => {
    const newProduct = (await req.json())
    productController.createProduct(newProduct)
    await req.respond({
        status: 200,
        headers: new Headers({
            "content-type": "application/json"
        }),
        body: JSON.stringify(newProduct)
    })
})

productRouter.put('/', async (req) => {
    const id = req.query.get("id")
    if(!id)
        await req.respond({
            status: 404,
            headers: new Headers({
                "content-type": "application/json"
            }),
            body: JSON.stringify('Please specify a product id to update')
        })
    else {
        const body = (await req.json())
        try {
            const product = productController.updateProductById(id, body)
            await req.respond({
                status: 200,
                headers: new Headers({
                    "content-type": "application/json"
                }),
                body: JSON.stringify(product)
            })
        } catch(e) {
            await req.respond({
                status: 404,
                headers: new Headers({
                    "content-type": "application/json"
                }),
                body: JSON.stringify(e.message)
            })
        }
    }
})

productRouter.delete('/', async (req) => {
    const id = req.query.get("id")
    if(!id)
        await req.respond({
            status: 404,
            headers: new Headers({
                "content-type": "application/json"
            }),
            body: JSON.stringify('Please specify a product id to delete')
        })
    else {
        try {
            const deleted = productController.deleteProductById(id)

            await req.respond({
                status: 200,
                headers: new Headers({
                    "content-type": "application/json"
                }),
                body: JSON.stringify(deleted)
            })
        } catch(e) {
            await req.respond({
                status: 404,
                headers: new Headers({
                    "content-type": "application/json"
                }),
                body: JSON.stringify(e.message)
            })
        }
    }
})

export {
    productRouter
}