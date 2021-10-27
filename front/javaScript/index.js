fetch('http://localhost:3000/api/products')
  .then(response => response.json())
  .then(json => extractName(json)); //Une fois les données recues, on éxecute la fonction extractName//


function extractName(data){

  let items = document.getElementById('items');//on slectionne l'ID de la div du fichier HTML //


  //Boucle for, si I= 0 et inférieur à 8 du coup on continue la boucle //
  for (let i = 0; i < data.length; i++) {
    console.log(data[i]);

    let element = document.createElement('div');  //crée un div//

    //---------contenue de la div---------//
    element.innerHTML = `
    <a href="product.html?id=${data[i]['_id']}" class= productLink>
    <img width= "350" height="350" src="${data[i]['imageUrl']}" alt="${data[i]['altTxt']}">
    <h3 class="productName">${data[i]['name']}</h3>
    <h2 class="productPrice">${data[i]['price']} €</h2>
    </a>
    `  
    items.appendChild(element) //insérer l'élement dans le HTML//
  }
}
