import { createApp } from "https://deno.land/x/servest@v1.3.1/mod.ts"
import { mainRouter } from "./routes/main.ts"

const app = createApp()

app.route("/", mainRouter)

app.listen({ port: 3000 })