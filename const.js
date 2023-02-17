const pdf = require('pdf-creator-node')
const fs = require('fs')

const html = fs.readFileSync('const.html','utf-8')

var options = {
    format: "A3",
    orientation: "portrait",
    border: "10mm",
    header: {
        height: "45mm",
        contents: '<div style="text-align: center;">Author: Shyam Hajare</div>'
    },
    footer: {
        height: "28mm",
        contents: {
            first: 'Cover page',
            2: 'Second page', // Any page number is working. 1-based index
            default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
            last: 'Last Page'
        }
    }
};

var users = [
    {
      name: "DERICK SAA",
      age: "26",
    },
    {
      name: "maria",
      age: "26",
    },
    {
      name: "andres",
      age: "26",
    },
  ];

  var document = {
    html: html,
    data: {
      users: users,
    },
    path: "./certificado.pdf",
    type: "",
  };



  pdf.create(document, options)
  .then((res) => {
    console.log(res);
  })
  .catch((error) => {
    console.error(error);
  });