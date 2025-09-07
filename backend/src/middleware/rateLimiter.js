import ratelimit from "../config/upstash.js";


const ratelimiter = async (_,res,next)=>{
    try {
        const {success}  = await ratelimit.limit("my-limit-key");
        // const user = { name: 'Alice', age: 30 };
        // const { name } = user; ---const { success } = some_object; is an example of destructuring assignment. This syntax is used to unpack specific properties from an object into their o      wn variables.
        // console.log(name); // 'Alice'

        if(!success){
            res.status(429).json({message:"Too many api requests, please try again later"})
        }
    } catch (error) {
        console.log("Rate Limit error",error)
    }
   
    next();
}

export default ratelimiter;