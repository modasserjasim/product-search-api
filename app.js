const loadProducts = async() =>{
    const url = `https://fakestoreapi.com/products`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
}

const setAllCategories = async() =>{
    const data = await loadProducts();
    // console.log(data);

    const categoris = document.getElementById('all-categories');

    const uniqueCategoriesName = [];
    for(const product of data){
        if(uniqueCategoriesName.indexOf(product.category) === -1){
            uniqueCategoriesName.push(product.category);
            const createLi = document.createElement('li');
            createLi.innerHTML = `<a>${product.category}</a>`;
            categoris.appendChild(createLi);
        } 
    }
}
setAllCategories();
// loadProducts();
const searchField = document.getElementById('search-field');
searchField.addEventListener('keypress', async(event) =>{
    if(event.key == 'Enter'){
        // console.log(searchField.value);
        searchValue = searchField.value;
        const allProducts = await loadProducts();
        // console.log(allProducts);

        const foundProducts = allProducts.filter(product => product.category.includes(searchValue));
        console.log(foundProducts);

        const productContainer = document.getElementById('product-container');
        productContainer.innerHTML = '';

        foundProducts.forEach(product => {
            // console.log(product);
            const {title, description, image, price, category} = product;
            const productDiv = document.createElement('div');
            productDiv.innerHTML = `
                <div class="card shadow-xl">
                    <figure><img src="${image}" alt="Shoes" /></figure>
                    <div class="card-body">
                    <div class="card-actions justify-start">
                        <div class="badge badge-outline">${category}</div> 
                    </div>
                    <h2 class="card-title">
                        ${title}
                    </h2>
                    <p>${description}</p>
                    
                    </div>
                </div>
            `;
            productContainer.appendChild(productDiv);

        });
    }
})