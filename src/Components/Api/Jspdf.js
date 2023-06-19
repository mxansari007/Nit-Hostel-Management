import {jsPDF} from "jspdf";


const Jspdf = (obj)=>{

const doc = new jsPDF();
doc.setFont(undefined,'bold');
doc.setFontSize(28);
doc.text("Vivekanand Hostel",60,18)

doc.setFont(undefined,'bold');
doc.setFontSize(15);
doc.text("Name: ",25,85);
doc.text("Roll No: ",25,95);
doc.text("Department: ",25,105);
doc.text("Year: ",25,115);
doc.setFont(undefined,'normal');
doc.text(`${obj.firstName} ${obj.lastName}`,45,85);
doc.text(`${obj.rollNo}`,47,95);
doc.text(`${obj.department}`,58,105);
doc.text(`${obj.year}`,43,115);
doc.text("Student photo",26,50)
doc.rect(25,25,35,45);
doc.line(5, 5,5,150);
doc.line(5, 5,200,5);
doc.line(200, 150,5,150);
doc.line(200, 150,200,5);
doc.save(`${obj.rollNo}.pdf`);
}

export {Jspdf};
