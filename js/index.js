const listProducts = document.getElementById("list_products")
const cartProducts = document.querySelector("#cartProducts")
printItens()

function printItens(categoria) {
    listProducts.innerHTML = ""
    data.forEach(product => {
        if (product.tag[0] === categoria){
            listProducts.innerHTML += `
            <li class="produto">
            <img src=${product.img} alt="camiseta preta">
            <h3>${product.tag}</h3>
            <h2>${product.nameItem}</h2>
            <p>${product.description}</p>
            <p class="valor_product">R$  ${product.value.toFixed(2)}</p>
            <button class="button" id= "${product.id}">Adicionar ao carrinho</button>
            </li>
            `
        } else if (categoria == undefined){
            listProducts.innerHTML += `
            <li class="produto">
            <img src=${product.img} alt="camiseta preta">
            <h3>${product.tag}</h3>
            <h2>${product.nameItem}</h2>
            <p>${product.description}</p>
            <p class="valor_product">R$  ${product.value.toFixed(2)}</p>
            <button class="button" id= "${product.id}">Adicionar ao carrinho</button>
            </li>
            `
        } else if (categoria === "btn_searchBar") {
            const inputSearch = document.querySelector("#search_bar").value
            if (product.nameItem.toLowerCase().indexOf(inputSearch.toLowerCase()) > -1){
                listProducts.innerHTML += `
                <li class="produto">
                <img src=${product.img} alt="camiseta preta">
                <h3>${product.tag}</h3>
                <h2>${product.nameItem}</h2>
                <p>${product.description}</p>
                <p class="valor_product">R$  ${product.value.toFixed(2)}</p>
                <button class="button" id= "${product.id}">Adicionar ao carrinho</button>
                </li>
                `
            }
        }
    })
}

const menus = document.querySelector("body").addEventListener("click", event => {
    arrIds = ["menu-1", "menu-2", "menu-3", "menu-4"]
    arrTags = [undefined, "mouses", "headsets", "Cadeiras Gamer"]
    arrIds.forEach((menuIds, i) => {
        if (event.target.id === menuIds){
            printItens(arrTags[i])
        }
    })
    if (event.target.id === "btn_searchBar"){
        if (document.querySelector("#search_bar").value != ""){
            const inputSearch = document.querySelector("#search_bar").value
            printItens("btn_searchBar")
        }
    }
})

let valueAtCart = 0
document.querySelector("body").addEventListener("click", event => {
    for (let i = 0; i < data.length; i++) {
        if (event.target.id == data[i].id) {
            cartProducts.innerHTML += `
            <li class="iten_Cart" id="item-${data[i].id}">
                <div class="containerImg_iten_Cart">
                    <img class="img_iten_Cart" src="${data[i].img}" alt="">
                </div>
                <div class="containerInfo_iten_Cart">
                    <h3 class="title_iten_Cart">${data[i].nameItem}</h3>
                    <p class="valor_product">R$ ${data[i].value.toFixed(2)}</p>
                    <button class="remove_iten_Cart" id="${data[i].id},remove">remover</button>
                </div>
            </li>
            `
            valueAtCart += data[i].value
        }
    }
    const itemCart = document.querySelectorAll(".iten_Cart")
    itemCart.forEach(element => {
        element.addEventListener("click", event =>{
            let id = event.target.id.split(",")[0]
            let valor =  document.querySelector("#item-"+id + " .containerInfo_iten_Cart .valor_product").innerText
            valor = parseFloat(valor.split(" ")[1])
            valueAtCart-= valor
            document.getElementById("item-" + id).remove()
        }) 
    })

    const quantidade = document.querySelectorAll(".iten_Cart").length
    const sectionTotal = document.querySelector(".valueAndQuantity")
    const cartVazio = document.querySelector("#containerCartVazio")

    if (quantidade > 0){
        sectionTotal.innerHTML = `
            <section class="valueAndQuantity">
                <div class="containerVQ">
                    <div class="quantity">
                        <p>Quantidade</p>
                        <p id="quantityInCart">${quantidade}</p>
                    </div>
                    <div class="valueTotal">
                        <p>Total:</p>
                        <p id="valueTotal">R$ ${valueAtCart.toFixed(2)}</p>
                    </div>
                </div>
            </section>`
        cartVazio.innerHTML = ""
    } else {
        sectionTotal.innerHTML = ""
        cartVazio.innerHTML = `
        <div class="notItens_cart">
            <h3 class="titleVazio_cart">Carrinho vázio</h3>
            <span class="spanAddItens_cart">Adicione itens</span>
        </div>
        `
    }
})