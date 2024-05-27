
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let title = document.getElementById('title');
let categorie = document.getElementById('categorie');
let create = document.getElementById('create');
let deleteAll = document.getElementById('deleteAll');
let mood = "create";
let tmp;

// console.log(price, taxes, ads, discount, total)

//get total of the product :
function getTotal() {
    if (price.value != '') {
        let res = ((+price.value + +taxes.value + +ads.value) - +discount.value);
        total.innerHTML = res;
    } else {
        total.innerHTML = '';
    }
}

//create product

let dataProducts;
if (localStorage.product != null) {
    dataProducts = JSON.parse(localStorage.product);
} else {
    dataProducts = [];
}

create.addEventListener('click', () => {
    let newProduct = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        count: count.value,
        categorie: categorie.value,
        total: total.innerHTML
    }
    if (mood === 'create') {
        if (newProduct.count > 1) {
            for (let i = 0; i < newProduct.count; i++) {
                dataProducts.push(newProduct);
            }
        } else {
            dataProducts.push(newProduct);
        }
    } else {
        dataProducts[tmp] = newProduct
    }
    localStorage.setItem('product', JSON.stringify(dataProducts))
    // console.log(dataProducts)
    clearData();
    Displaying();
})

//clear data after adding to localStorage
function clearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    count.value = '';
    categorie.value = '';
    total.innerHTML = '';
}

//displaying products in the table

let productTableBody = document.getElementById('productTableBody');
function Displaying() {
    let tab = '';
    for (let i = 0; i < dataProducts.length; i++) {
        tab += `
                <tr>
                    <td class="py-2">${i}</td>
                    <td class="py-2">${dataProducts[i].title}</td>
                    <td class="py-2">${dataProducts[i].price}</td>
                    <td class="py-2">${dataProducts[i].taxes}</td>
                    <td class="py-2">${dataProducts[i].ads}</td>
                    <td class="py-2">${dataProducts[i].discount}</td>
                    <td class="py-2">${dataProducts[i].count}</td>
                    <td class="py-2">${dataProducts[i].categorie}</td>
                    <td class="py-2">${dataProducts[i].total}</td>
                    <td class="py-2">
                        <button onclick="deletePro(${i})" class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">Delete</button>
                        <button onclick="updateData(${i})" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">Modify</button>
                    </td>
                </tr>
        `;
    }
    productTableBody.innerHTML = tab;
    let btnDeleteAll = document.querySelector('.btnDeleteAll');
    if (dataProducts.length > 0) {
        btnDeleteAll.innerHTML = `
        <button
          onclick="deleteEverything()"
          class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          delete All (${dataProducts.length})
        </button>
    `
    } else {
        btnDeleteAll.innerHTML = ``;
    }
}

Displaying()

//deleting item from table

function deletePro(i) {
    dataProducts.splice(i, 1)
    localStorage.product = JSON.stringify(dataProducts);
    Displaying()
}
deleteAll.addEventListener('click', () => {
    deleteEverything()
})
function deleteEverything() {
    localStorage.clear();
    dataProducts.splice(0);
    Displaying()
}

function updateData(i) {
    title.value = dataProducts[i].title
    price.value = dataProducts[i].price
    taxes.value = dataProducts[i].taxes
    count.style.display = 'none';
    ads.value = dataProducts[i].ads
    discount.value = dataProducts[i].discount
    categorie.value = dataProducts[i].categorie
    getTotal()
    create.innerHTML = 'Update'
    mood = 'update'
    tmp = i;
    scroll({
        top: 0,
        behavior: 'smooth'
    })
}

