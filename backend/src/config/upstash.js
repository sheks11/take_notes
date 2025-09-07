import {Ratelimit} from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"
import dotenv from "dotenv"

dotenv.config()

const ratelimit= new Ratelimit({  //https://upstash.com/docs/redis/sdks/ratelimit-ts/gettingstarted#add-ratelimit-to-your-endpoint 
    redis:Redis.fromEnv(),
    limiter:Ratelimit.slidingWindow(10,"20 s")
})

export default ratelimit;