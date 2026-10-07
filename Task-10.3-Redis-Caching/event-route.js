router.get("/",authenticate,async(req,res)=>{const key="events:list";const cached=await redis.get(key);if(cached)return res.json({source:"cache",data:JSON.parse(cached)});const events=await Event.find().sort({date:1}).lean();await redis.setEx(key,60,JSON.stringify(events));res.json({source:"database",data:events})});
// After POST/PUT/DELETE: await redis.del("events:list");
