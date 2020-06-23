const express = require('express');
const https = require('https');
const cors = require('cors');
const app = express();
app.use(cors());

app.get('/search', (req, res) => {
  let queryParams = req.query;
  let url = "https://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsAdvanced&SERVICE-VERSION=1.0.0&SECURITY-APPNAME=ErnestLe-WebTechH-PRD-f2eba4255-d7cfb358&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD";
  for (var key in queryParams) {
      var value = queryParams[key];
      url = url + "&" + key + "=" + value;
  }

  console.log(url);

  https.get(url, (resp) => {
    let data = '';

    // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
      data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      console.log(JSON.parse(data).explanation);
      res.send(JSON.parse(data));
    });

  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
});

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
