//Required package
const pdf = require("pdf-creator-node");
const fs = require("fs");
const path = require("path");

exports.pdfDownload = async (req, res) => {
    var outputpdf;
    try {
        // Read HTML Template
    const jsonData=req.body;
    console.log(path.join(__dirname,`pdfTemplates/${jsonData.templateName}.html`));
    const html = fs.readFileSync(path.join(__dirname,`pdfTemplates/${jsonData.templateName}.html`), "utf8");
    const  filename=`${jsonData.rollNo}_${jsonData.name}.pdf`;
    var options = {
        format: "A4",
        orientation: "portrait",
        border: "10mm"
    };
    outputpdf=path.join(__dirname,`/pdfOutputs/${filename}`);
    var document = {
        html: html,
        data:{
          name:jsonData.name,
          class:jsonData.class
        },
        path:outputpdf,
        type: "",
    };
    pdf
        .create(document, options)
        .then((response) => {
            console.log(response);
            return res.download(response.filename);

        })
        .catch((error) => {
            console.error(error);
            return res.send(error);
        })
        .finally(() => {
            fs.unlink(outputpdf,(err)=>{
                if (err){
                  console.log("error occured : "+err);
                  return;
                }
                console.log("file deleted successfully");
               })
        });
    } catch (error) {
        return res.send(error);
    }
};