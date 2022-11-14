//RECUPERATION DU N° DE COMMANDE

let queryString_url_id = window.location.search;
let urlSearchParams = new URLSearchParams(queryString_url_id);
let urlOrderId = urlSearchParams.get("orderId");

//AFFICHAGE DU N° DE COMMANDE
let orderId = document.getElementById("orderId");
orderId.innerHTML = urlOrderId;

//SUPPRESSION DU LOCALSTORAGE
let basket = window.localStorage;
basket.clear();
