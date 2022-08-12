import { createRouter } from "https://deno.land/x/servest@v1.3.1/mod.ts"
import { productRouter } from "./products.ts"
import { messageRouter } from "./messages.ts"

const mainRouter = createRouter()

mainRouter.route('product', productRouter)
mainRouter.route('message', messageRouter)

export {
    mainRouter
}