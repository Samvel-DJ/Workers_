const productName = document.getElementById("productName");
const productImg= document.getElementById("productImg");
const productDescription= document.getElementById("productDescription");
const productPrice = document.getElementById("productPrice");
const productList = document.getElementById("productList")
const addButton = document.getElementById("addButton"); 



const database = firebase.database();

const productRef = database.ref('/products')


addButton.addEventListener('click', (e) => {
    e.preventDefault();
    const productModel = {
        product_name: productName.value,
        product_description: productDescription.value,
        product_img: productImg.value,
        product_price: productPrice.value 
     };
     const autoId = productRef.push().key;

     productRef.child(autoId).set(productModel)
     .then(() =>{
         productName.value = "";
         productImg.value = "";
         productDescription.value = "";
         productPrice.value = "";
     })
});
const deleteProduct = (productId) =>{
    productRef.child(productId).remove()
    .then(()=>{
        alert('this product remuve from data');
        window.location.reload();
    })
}

(function(){
   productRef.orderByKey().on('value',(data)=>{
       productList.innerHTML = "";
     const dataProduct = Object.entries(data.val())
     dataProduct.map(product =>{
         const [id,info] = product;
         const {product_description,product_img,product_name,product_price} = info;
         console.log(info)
         const div = document.createElement('div');
         const h2 = document.createElement('h2');
         const p = document.createElement('p');
         const buttonDelete = document.createElement('button');
         const img = document.createElement('img')

         h2.innerHTML = `${product_name}:${product_price}`;
         p.innerHTML = product_description;
         img.src = product_img;
         buttonDelete.innerHTML = 'Delete';
         buttonDelete.addEventListener('click',()=> deleteProduct(id))
         div.appendChild(h2)
         div.appendChild(img)
         div.appendChild(p)
         div.appendChild(buttonDelete)
         productList.appendChild(div)


     })
   })
})();

(function(){
    productRef.orderByKey('product_name').equalTo('dev').on('value',(data)=>{
        console.log(data.val())
    })
})()