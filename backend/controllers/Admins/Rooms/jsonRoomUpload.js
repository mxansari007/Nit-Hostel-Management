const rooms =require('../../../models/rooms');



exports.jsonRoomUpload = async (req,res)=>{
    
    const jsonObj=req.body;
   try {
        // const response = await rooms.insertMany({})
        console.log(jsonObj);
        const response = await rooms.insertMany(jsonObj);
        return res.send(response);
        
   } catch (error) {
      return res.send(error);
   }
};