//RECUPERATION LOCALSTORAGE
let showProduct = document.getElementById("cart__items");
let basket = JSON.parse(localStorage.getItem("basket"));

//APPEL DE L'API
fetch(`http://localhost:3000/api/products/`)
  .then((res) => res.json())
  .then((products) => {
    //RECUPERATION DES OBJETS DANS L'API
    basket.forEach((b) => {
      let foundProductId = products.find((p) => p._id == b.id);
      //console.log(foundProductId);
      showProduct.innerHTML += `<article class="cart__item" data-id="${b.id}" data-color="${b.color}">
          <div class="cart__item__img">
            <img src="${foundProductId.imageUrl}" alt="${foundProductId.altTxt}">
          </div>
          <div class="cart__item__content">
            <div class="cart__item__content__description">
              <h2>${foundProductId.name}</h2>
              <p>${b.color}</p>
              <p>${foundProductId.price} €</p>
              </div>
            <div class="cart__item__content__settings">
              <div class="cart__item__content__settings__quantity">
                <p>Qté : </p>
                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${b.quantity}">
              </div>
              <div class="cart__item__content__settings__delete">
                <p class="deleteItem">Supprimer</p>
              </div>
              </div>
              </div>
              </article>`;

      totalPriceBasket();
      totalQuantity();
    });

    //CALCUL DU PRIX TOTAL
    function totalPriceBasket() {
      // basket.forEach((b) => {
      const price = document.getElementById("totalPrice");
      let totalPrice = basket.reduce((total, product) => {
        let foundProductId = products.find((p) => p._id == basket.id);
        total + foundProductId.price * product.quantity, 0;
        console.log(foundProductId);
      });
      // //console.log(foundProductId.price);
      // let totalPrice = 0;
      // const resultPrice = foundProductId.price * b.quantity;
      // totalPrice += resultPrice;
      price.innerHTML = totalPrice;
      // });
    }

    // ADDITIONNER LES QUANTITEES
    function totalQuantity() {
      const quantity = document.getElementById("totalQuantity");
      const resultTotal = basket.reduce(
        (total, product) => total + product.quantity,
        0
      );
      quantity.innerHTML = resultTotal;
    }

    // MODIFICATION QUANTITES

    let inputQuantity = document.querySelectorAll(".itemQuantity");
    inputQuantity.forEach((q, i) => {
      //console.log(basket[i].quantity);
      q.addEventListener("change", () => {
        basket[i].quantity = parseInt(q.value);
        localStorage.setItem("basket", JSON.stringify(basket));
        totalPriceBasket();
        totalQuantity();
      });
    });

    // SUPPRIMER UN PRODUIT DANS LE PANIER

    let deleteItem = document.querySelectorAll(".deleteItem");
    deleteItem.forEach((d, i) => {
      d.addEventListener("click", () => {
        basket.splice(i, 1);
        localStorage.setItem("basket", JSON.stringify(basket));
        location.reload();
      });
    });
  })
  .catch(function (err) {
    console.log(err);
  });

//----------------------------------------------------------------------------------------------------------

//CREATION DE L'EVENEMENT

let submitForm = document.querySelector("#order");
submitForm.addEventListener("click", () => {
  let firstName = document.getElementById("firstName").value;
  let lastName = document.getElementById("lastName").value;
  let address = document.getElementById("address").value;
  let city = document.getElementById("city").value;
  let email = document.getElementById("email").value;
  let form = document.querySelector(".cart__order__form");
  let inputForm = form.querySelectorAll("input");

  //VERIFICATION DU FORMULAIRE
  inputForm.forEach((input) => {
    if (input.value === "") {
      alert("Veuillez renseigner le formulaire");
    }
  });

  //REGEX

  // let regexName = /^[a-zA-Z]+$/;
  // if (
  //   regexName.test(firstName) === false ||
  //   regexName.test(lastName) === false
  // ) {
  //   alert("Veuillez utiliser uniquement des lettres pour votre nom");
  //   return true;
  // }

  let regexEmail = /^[A-Za-z0-9+_.-]+@(.+)$/;
  if (regexEmail.test(email) === false) {
    alert("Merci de renseigner un email correct");
    return true;
  }

  //RECUPERATION DES ID
  let ids = [];
  basket.forEach((b) => {
    let id = b.id;
    ids.push(id);
  });

  //CREATION DE L'OBJET CONTACT
  let body = {
    contact: {
      firstName: firstName,
      lastName: lastName,
      address: address,
      city: city,
      email: email,
    },
    products: ids,
  };

  //ENVOI DES INFOS A L'API
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      //REDIRECTION VERS LA PAGE CONFIRMATION
      let orderId = data.orderId;
      window.location.href = "./confirmation.html" + "?orderId=" + orderId;
      return console.log(data);
    })
    .catch((err) => console.log(err));
});
