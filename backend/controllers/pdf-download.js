//Required package
const pdf = require("pdf-creator-node");
const fs = require("fs");
const path = require("path");

exports.pdfDownload = async (req, res) => {
    
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
    var document = {
        html: html,
        data:{
          name:jsonData.name,
          class:jsonData.class
        },
        path: path.join(__dirname,`/pdfOutputs/${filename}`),   
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
        });
    } catch (error) {
        return res.send(error);
    }
};