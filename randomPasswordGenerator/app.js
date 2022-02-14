const express = require('express')
const bp = require('body-parser')

const app = express()
const port = 3001

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))


app.post('/password/generate', (req, res) => {
	//console.log(req.body)

    const parameters = req.body;

    characters = ""

    // Password Length:16
    const pass_length = req.body.pass_length  || 8;
    
    // Include Symbols:( e.g. @#$% )
    const symbols = req.body.symbols ;
    const c_symbols = "!@#$%^&*()-_=+"
    //console.log(symbols);
    //console.log(req.body.symbols);
    if (symbols) { characters += c_symbols; }

    // Include Numbers:( e.g. 123456 )
    const number = req.body.number;
    const c_number = "1234567890"
    if (number) {characters += c_number; }

    // Include Lowercase Characters:( e.g. abcdefgh )
    const lowercase = req.body.lowercase;
    const c_lowercase = "abcdefghijklmnopqrstuvwxyz"
    if (lowercase) {characters += c_lowercase; }

    // Include Uppercase Characters:( e.g. ABCDEFGH )
    const uppercase = req.body.uppercase;
    const c_uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if (uppercase) {characters += c_uppercase; }

    // Exclude Ambiguous Characters:( { } [ ] ( ) / \ ' " ` ~ , ; : . < > )
    const ambiguous = req.body.ambiguous;
    const c_ambiguous = "({}[]()/\\\'\"`~,;:.<>)"
    if (ambiguous) {characters += c_ambiguous}

    
    //console.log("password length: "+ pass_length);
    //console.log("characters: "+characters);


    password = '';

    for (let index = 1; index <= pass_length; index++) {
        password += random_character(characters)
    }

    

	res.send({
        "parameters": parameters,
        "password": password
        
    })
})

function random_character(characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz') {
    const charactersLength = characters.length;
    return characters.charAt(Math.floor(Math.random() * charactersLength));

}

app.listen(port, () => {
	console.log('Example app listening at http://localhost:${port}')
})