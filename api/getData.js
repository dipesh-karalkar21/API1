const {google} = require("googleapis")

const auth = new google.auth.GoogleAuth({
    credentials:{
        client_email:process.env.GOOGLE_EMAIL,
        private_key:process.env.GOOGLE_KEY.replaceAll("\\n","\n"),
    },
    scopes:["https://www.googleapis.com/auth/spreadsheets.readonly"]
})

module.exports = async(req,res)=>{
    
    res.setHeader("Access-Control-Allow-Origin","*")
    res.setHeader("Access-Control-Allow-Methods","GET,POST,OPTIONS")
    res.setHeader("Access-Control-Allow-Headers","Content-Type")
    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    const client = await auth.getClient()

    const service = google.sheets({
        version:'v4',
        auth : client
    })

    const data = await service.spreadsheets.values.get({
        spreadsheetId:"12TkW5pyqeEGvdZ0Y5rZaTyq2TN8-1-3xuZwLD-gR55U",
        range:"add colum for event categories start date end dat...!A:ZZZ"
    })

    console.log(data.data.values)

    
    
    return res.json(data.data.values)

}