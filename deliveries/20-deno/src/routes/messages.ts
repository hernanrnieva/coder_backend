import { createRouter } from "https://deno.land/x/servest@v1.3.1/mod.ts"
import { messageController } from "../controllers/messages.ts"

const messageRouter = createRouter()

messageRouter.get('/', async (req) => {
    const messages = messageController.getMessages()
    await req.respond({
        status: 200,
        headers: new Headers({
            "content-type": "application/json"
        }),
        body: JSON.stringify(messages)
    })
})

messageRouter.post('/', async (req) => {
    const newMessage = (await req.json())
    messageController.createMessage(newMessage)
    await req.respond({
        status: 200,
        headers: new Headers({
            "content-type": "application/json"
        }),
        body: JSON.stringify(newMessage)
    })
})

export {
    messageRouter
}