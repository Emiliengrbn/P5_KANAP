/*const cart = [];

retrieveItemsFromCach();
cart.forEach((item) => displayItem(item));
console.log(cart);

function retrieveItemsFromCach() {
  const numberOfItems = localStorage.length;
  for (let i = 0; i < numberOfItems; i++) {
    const item = localStorage.getItem(localStorage.key(i)) || "";
    const itemObject = JSON.parse(item);
    cart.push(itemObject);
  }
}


for (let item of cart) {
  fetch("http://localhost:3000/api/products/")
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (item) {
      console.log(item);
    });
}

function displayItem(item) {
  const article = makeArticle(item);
  const imageDiv = makeImageDiv(item);
  article.appendChild(imageDiv);
  const cardItemContent = makeCartContent(item);
  article.appendChild(cardItemContent);
  displayArticle(article);
  displayTotalQuantity(item);
}

function displayTotalQuantity(item) {
  const totalQuantity = document.getElementById("totalQuantity");
  //console.log(cart);
  const firstItem = cart[0];
  const firstItemTotalQuantity = firstItem.quantity * firstItem.price;
  //console.log(firstItemTotalQuantity);
}

function makeCartContent(item) {
  const cardItemContent = document.createElement("div");
  cardItemContent.classList.add("cart__item__content");

  const description = makeDescription(item);
  const settings = makeSettings(item);

  cardItemContent.appendChild(description);
  cardItemContent.appendChild(settings);
  return cardItemContent;
}

function makeSettings(item) {
  const settings = document.createElement("div");
  settings.classList.add("cart__item__content__settings");

  addQuantityToSettings(settings, item);
  addDeleteToSettings(settings);
  return settings;
}

function addDeleteToSettings(settings) {
  const div = document.createElement("div");
  div.classList.add("cart__item__content__settings__delete");
  const p = document.createElement("p");
  p.classList.add("deleteItem");
  p.textContent = "Supprimer";
  div.appendChild(p);
  settings.appendChild(div);
}

//SUPPRIMER PRODUIT DU PANIER

const deleteItem = document.querySelector(".deleteItem");
console.log(deleteItem);
deleteItem.addEventListener("click", () => {
  localStorage.clear("basket");
  location.reload();
});

function addQuantityToSettings(settings, item) {
  //const basket = JSON.parse(localStorage.getItem("basket"));
  const inputQuantity = document.createElement("div");
  inputQuantity.classList.add("cart__item__content__settings__quantity");
  const p = document.createElement("p");
  p.textContent = "Qté : ";
  inputQuantity.appendChild(p);
  const input = document.createElement("input");
  input.type = "number";
  input.classList.add("itemQuantity");
  input.name = "itemQuantity";
  input.min = "1";
  input.max = "100";
  input.value = inputQuantity;

  inputQuantity.appendChild(input);
  settings.appendChild(inputQuantity);
}


function makeDescription(item) {
  const description = document.createElement("div");
  description.classList.add("cart__item__content__description");
  const h2 = document.createElement("h2");
  h2.textContent = item.name;
  const p = document.createElement("p");
  const basket = JSON.parse(localStorage.getItem("basket"));

  const p2 = document.createElement("p2");
  p2.textContent = item.price + " €";

  
  description.appendChild(h2);
  description.appendChild(p);
  description.appendChild(p2);
  return description;
}

function displayArticle(article) {
  document.querySelector("#cart__items").appendChild(article);
}

function makeArticle(item) {
  const article = document.createElement("article");
  article.classList.add("cart__item");
  article.dataset.id = item.id;
  article.dataset.color = item.color;
  return article;
}

function makeImageDiv(item) {
  const div = document.createElement("div");
  div.classList.add("cart__item__img");
  const image = document.createElement("img");
  image.src = "../images/logo.png";
  image.alt = item.altTxt;
  div.appendChild(image);
  return div;
}
*/
