const searchForm = document.querySelector(".search-form");
const productList = document.querySelector('.product_list')

searchForm.addEventListener("submit", async function (event) {
  event.preventDefault(); //Previne que a pagina seja reiniciada
    const inputValue = event.target[0].value;

    // Acessando o servidor API Mercado Livre, e pegar os produtos
    const data = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${inputValue}`)
    const products = (await data.json()).results.slice(0, 10) // Trazer os 10 primeiros

    productsDisplay(products)
});

//Colocar os produtos na Tela
function productsDisplay(products){
    console.log(products)
    productList.innerHTML = products.map(product => `
            <div class="product-card">
                <img src="${product.thumbnail}" alt="${product.title}">
                <h3>${product.title}</h3>
                <p>${product.price.toLocaleString('pt-br', {
                    style: "currency",
                    currency: "BRL"
                })}</p>
                <p>Loja: ${product.seller.nickname}</p>
            </div>
        `).join('')
}



