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
        border: "10mm",
        childProcessOptions: {
            env: {
              OPENSSL_CONF: '/dev/null',
            },
          }
    };
    outputpdf=path.join(__dirname,`/pdfOutputs/${filename}`);
    var document = {
        html: html,
        data:{
          name:jsonData.name,
          class:jsonData.class,
          rollNo:jsonData.rollNo,
          firstName:jsonData.firstName,
          lastName:jsonData.lastName,
          department:jsonData.department,
          year:jsonData.year,
          email:jsonData.email
        },
        path:outputpdf,
        type: "",
    };
    pdf
        .create(document, options)
        .then((response) => {
            console.log(response.filename);
            fs.readFile(response.filename,(err,file)=>{
                if (err) {
                    console.log(err);
                    return res.status(500).send("could not download pdf");
                }
                res.setHeader('Content-Type', 'application/pdf');
                res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
                res.send(file);
            });

        })
        .catch((error) => {
            console.error(error);
            return res.send(error);
        });
    } catch (error) {
        return res.send(error);
    }
};