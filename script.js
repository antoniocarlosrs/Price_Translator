const searchForm = document.querySelector(".search-form");
const productList = document.querySelector('.product_list')
const priceChart = document.querySelector('.price-chart')

//Variável para guardar os gráficos
let myChart = ''

searchForm.addEventListener("submit", async function (event) {
  event.preventDefault(); //Previne que a pagina seja reiniciada
    const inputValue = event.target[0].value;

    // Acessando o servidor API Mercado Livre, e pegar os produtos
    const data = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${inputValue}`)
    const products = (await data.json()).results.slice(0, 10) // Trazer os 10 primeiros

    productsDisplay(products)
    updatePriceChart(products)
});

//Colocar os produtos na Tela
function productsDisplay(products){
    console.log(products)
    productList.innerHTML = products.map(product => `
            <div class="product-card">
                <img src="${product.thumbnail.replace(/\w\.jpg/gi, 'W.jpg')}" alt="${product.title}">
                <h3>${product.title}</h3>
                <p class="product-price">${product.price.toLocaleString('pt-br', {
                    style: "currency",
                    currency: "BRL"
                })}</p>
                <p class="produtc-store">Loja: ${product.seller.nickname}</p>
            </div>
        `).join('')
}
// Regex, replace(/\w\.jpg/gi, 'W.jpg')

// Função para o gráfico
function updatePriceChart(products){
    const ctx = priceChart.getContext('2d');
    if(myChart){
        myChart.destroy();
    }

    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: products.map(product => product.title.substring(0, 20) + '...'),
            datasets: [{
                label: 'Preço (R$)',
                data: products.map(product => product.price),
                backgroundColor: 'rgba(46, 204, 113, 0.6)', 
                borderColor: 'rgba(46, 204, 113, 1)',
                borderWidth: 1
            }]
        }, 
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true, 
                    ticks: {
                        callback: function(value){
                            return (
                                'R$' + value.toLocaleString('pt-br', {
                                    style: "currency",
                                    currency: "BRL",
                                })
                            )
                        },
                    }, 
                    plugins: {
                        lagend: {
                            display: false
                        },
                        title: {
                            display: true,
                            text: 'Comparador de Preços',
                            font: {
                                size: 18
                            },
                        },
                    },
                },
            },
        },
    })
}


