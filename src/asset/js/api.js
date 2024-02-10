async function fetchData() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();

        const allProduct = document.getElementById('allProduct')

        data.forEach(product => {
            const column = document.createElement('div')

            column.innerHTML = `
                <div class="w-80 sm:w-56 sm:h-80 bg-white rounded-md overflow-hidden shadow-md p-8 mx-auto">
                    <a href="show.html?id=${product.id}">
                        <div class="h-30 ">
                            <img src="${product.image}" alt="${product.title}" class="w-full sm:h-48 object-scale-down transition-transform hover:scale-110" />
                        </div>
                        <div class="pt-4 ">
                            <h3 class="text-md tracking-wider font-semibold mb-2 hover:underline truncate">${product.title}</h3>
                    </a>
                            <p class="font-bold ">$${product.price} USD</p>
                        </div>
                </div>
            `
            allProduct.appendChild(column)        
        })

        return data
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }

    // SHOW DATA
    const urlParams = new URLSearchParams(window.location.search)
    itemId = urlParams.get('id')

    try {
        const response = await fetch(`https://fakestoreapi.com/products/${itemId}`)
        const data = await response.json()
        
        const title = document.getElementById('title')
        const img = document.getElementById('img')
        const desc = document.getElementById('description')
        const price = document.getElementById('price')

        title.innerHTML = data.title
        desc.innerHTML = data.description
        price.innerHTML = `$${data.price} USD`
        img.innerHTML = `<img src="${data.image}" alt="${data.title}">`

    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

fetchData();


async function fetchCategories(category){
    try {
        const response = await fetch(`https://fakestoreapi.com/products/category/${category}`);
        const data = await response.json();
  
        return data
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
}

  async function sortCategory(category) {
    const allProduct = document.getElementById('allProduct')
    const searchResult = document.getElementById('searchResult')

    allProduct.classList.add('hidden')
    searchResult.classList.add('hidden')

    const products = await fetchCategories(category);

    const contentList = document.getElementById('sortCategory');
    contentList.innerHTML = ''
    contentList.classList.remove('hidden')

    products.forEach(product => {
        const listItem = document.createElement('div')
        
        listItem.innerHTML = `
        <div class="w-80 sm:w-56 sm:h-80 bg-white rounded-md overflow-hidden shadow-md p-8 mx-auto">
            <a href="show.html?id=${product.id}">
                <div class="h-30 ">
                    <img src="${product.image}" alt="${product.title}" class="w-full sm:h-48 object-scale-down transition-transform hover:scale-110" />
                </div>
                <div class="pt-4 ">
                    <h3 class="text-md tracking-wider font-semibold mb-2 hover:underline truncate">${product.title}</h3>
            </a>
                    <p class="font-bold ">$${product.price} USD</p>
                </div>
        </div>
    `
        contentList.appendChild(listItem)
    })

    const txtAll = document.getElementById('textAll')

    switch (category) {
        case "men's clothing":
            txtAll.textContent = "Men's Clothing"
            break;
        case "women's clothing":
            txtAll.textContent = "Women's Clothing"
            break;
        case "jewelery":
            txtAll.textContent = "Jewelery"
            break;
        case "electronics":
            txtAll.textContent = "Electronics"
    
        default:
            break;
    }
  }

  async function searchProducts() {
    const sortCate = document.getElementById('sortCategory')
    const allProduct = document.getElementById('allProduct')
    const products = await fetchData()
    const searchTerm = document.getElementById('searchInput').value
    const txtAll = document.getElementById('textAll')

    allProduct.classList.add('hidden')
    sortCate.classList.add('hidden')
    
    txtAll.textContent = `Search Result : '${searchTerm}'`

    if (!searchTerm) {
        alert('Please enter a search term.')
        return
    }

    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    
    const contentList = document.getElementById('searchResult')
    contentList.classList.remove('hidden')
    contentList.innerHTML = ''

    if (filteredProducts.length === 0) {
        contentList.innerHTML = 'No products found.'
        return
    }

    filteredProducts.forEach(product => {
        const listItem = document.createElement('div')
        
        listItem.innerHTML = `
        <div class="w-80 sm:w-56 sm:h-80 bg-white rounded-md overflow-hidden shadow-md p-8 mx-auto">
            <a href="show.html?id=${product.id}">
                <div class="h-30 ">
                    <img src="${product.image}" alt="${product.title}" class="w-full sm:h-48 object-scale-down transition-transform hover:scale-110" />
                </div>
                <div class="pt-4 ">
                    <h3 class="text-md tracking-wider font-semibold mb-2 hover:underline truncate">${product.title}</h3>
            </a>
                    <p class="font-bold ">$${product.price} USD</p>
                </div>
        </div>
    `
        contentList.appendChild(listItem)
    })
}

