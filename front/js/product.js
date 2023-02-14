//RECUPERATION DU LOCALSTORAGE
let basket = localStorage.getItem("basket");
if (basket == null) {
  basket = [];
} else {
  basket = JSON.parse(basket);
}

//Récupération du paramètre id de l'URL
const queryString_url_id = window.location.search;

const urlSearchParams = new URLSearchParams(queryString_url_id);
const id = urlSearchParams.get("id");

//Appel de l'API + paramètre id
fetch(`http://localhost:3000/api/products/${id}`)
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (product) {
    const img = document.createElement("img");
    img.src = product.imageUrl;
    img.alt = product.altTxt;
    const div = document.querySelector(".item__img");
    div.appendChild(img);

    document.getElementById("title").innerHTML = product.name;
    document.getElementById("price").innerHTML = product.price;
    document.getElementById("description").innerHTML = product.description;

    const colors = document.getElementById("colors");
    product.colors.forEach((color) => {
      const option = document.createElement("option");
      option.innerHTML = color;
      option.value = color;
      colors.appendChild(option);
    });
  })
  .catch(function (err) {
    console.log(err);
  });

//EVENEMENT AJOUT AU PANIER

const addToCart = document.getElementById("addToCart");
addToCart.addEventListener("click", () => {
  const color = document.getElementById("colors");
  const quantity = document.getElementById("quantity");
  const data = {
    color: color.value,
    quantity: Number(quantity.value),
    id: id,
  };
  if (
    color.value == null ||
    color.value === "" ||
    quantity.value == null ||
    quantity.value < 1 ||
    quantity.value > 100
  ) {
    alert(
      "Veuillez selectionner une couleur ou une quantité comprise entre 1 et 100"
    );
    return true;
  }

  //VERIFICATION DES QUANTITEES

  let foundProduct = basket.find((p) => p.id == id && p.color == color.value);
  if (foundProduct != undefined) {
    let newQuantity = foundProduct.quantity + Number(quantity.value);
    if (newQuantity > 100) {
      alert("Vous ne pouvez pas commander plus de 100 produits");
    } else {
      foundProduct.quantity = newQuantity;
      alert("Votre produit à bien été ajouté au panier");
      localStorage.setItem("basket", JSON.stringify(basket));
    }
  } else if (Number(quantity.value) < 100) {
    alert("Votre produit à bien été ajouté au panier");
    basket.push(data);
    localStorage.setItem("basket", JSON.stringify(basket));
  }
});
