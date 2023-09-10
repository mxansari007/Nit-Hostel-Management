const Rooms = require('../../models/rooms');
const Students = require('../../models/students');
const BankDetails = require('../../models/BankDetails');
const Profile = require('../../models/Profile');

//* romove students references from room collection
const removeStudentFromRoom = async (roomData, idOfRoom, idOfStudent) => {

    const stringObjectIdToRemove = idOfStudent.toString();

    const newStudent = roomData.students.filter(item => item.toString() !== stringObjectIdToRemove);
    // console.log(newStudent);

    await Rooms.findByIdAndUpdate(idOfRoom, { students: newStudent });
    if (roomData.status === 'Fully-filled') {
        await Rooms.findByIdAndUpdate(idOfRoom, { status: 'Half-filled' })
    } else {
        await Rooms.findByIdAndUpdate(idOfRoom, { status: 'vacant' })
    }
}
exports.deleteStudent = async(req,res)=>{
    try{
        //*extract rollno from req.params
        const { rollNo }=req.body;
        //* find student using rollno
        const studentData = await Students.findOne({rollNo:rollNo});
        console.log(studentData);
        //* validate student if it exists or not
        if (!studentData) {
            return res.status(404).json({ message: 'Student not found' });
          }
        //* find associated room
        if(studentData.Rooms.length>0){
            const roomData=await Rooms.findOne({_id:studentData.Rooms[0]._id});
            if (roomsData) {
                const idOfRoom= roomData._id;
                const idOfStudent= studentData._id;
                //* deallocate student from room
                removeStudentFromRoom(roomData, idOfRoom,idOfStudent);
              }
        }
        
        //*find profile of student
        const profiledata= await Profile.findOne({_id:studentData.Profile});
        //*delete bankdetails 
        await BankDetails.findByIdAndDelete(profiledata.bankDetails);
        //* delete profile
        await Profile.findByIdAndDelete(studentData.Profile);

        //*delete student details
        await Students.findByIdAndDelete(studentData._id);
        return res.status(200).json({ message: 'Student and associated data deleted' });

    }catch(err){
          console.log(err);
          return res.status(500).json({"message":"error in deleting student "});
    }
 };