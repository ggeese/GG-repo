import Axios from "axios";

export const handleCreateJson = async (name, symbol, imageurl) => {
    const jsonData = {
        name: name,
        symbol: symbol,
        description: "Just a test for how to name your token, again and again ;)",
        image: imageurl
    }
    try {
        //const response = await Axios.post('https://app-memes-golden-g-goose.onrender.com/create-json', jsonData);
        const response = await Axios.post('http://localhost:3001/create-json', jsonData);

        console.log("json URI uploaded")

        if (response.data.success) {
            return response.data.url;
        } else {
            console.error('Error uploading JSON:', response.data.message);
            return 'Error uploading JSON';
        }
    } catch (error) {
        console.error('Error creando JSON:', error);
        return 'Error creating JSON';
    }
  };

export const saveImageToServer = async (imageFile) => {
    try {
        const formData = new FormData();
        formData.append('image', imageFile);

        // Enviar la solicitud POST al servidor
        //const response = await Axios.post('https://app-memes-golden-g-goose.onrender.com/api/upload', formData, {
        const response = await Axios.post('http://localhost:3001/api/upload', formData, {

            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        // Verificar si la respuesta contiene el nombre de la imagen
        if (response && response.data && response.data.imageUrl) {
            const imageUrl = response.data.imageUrl;
            console.log('Image uploaded successfully. Image name:', imageUrl);
            // Aquí puedes hacer lo que necesites con el nombre de la imagen, como mostrarlo en el frontend o usarlo para otras operaciones
            return imageUrl; // Devolver el nombre de la imagen
        } else {
            console.error('Error: Image name not received from the server.');
            return null; // Devolver null si no se recibió el nombre de la imagen
        }
    } catch (error) {
        console.error('Error uploading image:', error);
        return null; // Devolver null en caso de error

    }
};


export const Add_Meme = async (MemeName, Symbol, Supply, contract_meme, image_meme_url, Creator, Website, Twitter, Discord, Telegram, Fee, description, Network) => {
    // Extrayendo la hora y fecha
    const Creation_Date = new Date().toLocaleString();

    //Axios.post("https://app-memes-golden-g-goose.onrender.com/create", {
    Axios.post("http://localhost:3001/create", {
    
        name: MemeName,
        ticker: Symbol,
        fee: Fee,
        contract: contract_meme,
        image: image_meme_url,
        creator: Creator,
        creation: Creation_Date,
        supply: Supply,
        webpage: Website,
        twitter: Twitter !== undefined && Twitter.trim() !== "" ? "https://twitter.com/" + Twitter : "",
        description: description,
        discord: Discord !== undefined && Discord.trim() !== "" ? "https://www.discord.com/invite/" + Discord : "",
        telegram: Telegram !== undefined && Telegram.trim() !== "" ? "https://t.me/" + Telegram : "",
        network: Network,
    }).then(() => {
        console.log("Meme registrado");
    });
};


export const Create_Delivery = async (firstname, lastname, country, city, province, company, address, postalCode, email, currentAccount, item, amount ) => {
    // Extrayendo la hora y fecha
    const Creation_Date = new Date().toLocaleString();
    Axios.post("http://localhost:3001/create-order", {
    //Axios.post("https://app-memes-golden-g-goose.onrender.com/create-order", {
        
        first_name: firstname,
        last_name: lastname,
        country: country,
        city: city,
        province: province,
        company: company,
        address: address,
        postal_code: postalCode,
        email: email,
        wallet_address: currentAccount,
        item: item,
        amount: amount
        //Date: Creation_Date,

    }).then(() => {
        console.log("Pedido registrado");
    });
};