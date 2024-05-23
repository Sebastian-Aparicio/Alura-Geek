import { servicesProducts } from "../services/products-services.js";

const productContainer = document.querySelector("[data-product]");
const form = document.querySelector("[data-form]")

const limpiar = document.querySelector("#button__limpiar")


function createCard(name, price, image, id) {
  const card = document.createElement("div")
  card.classList.add("product__card")

  card.innerHTML = `
    <img src="../assets/${image}" alt="" />
              <span class="info">
                <h4 >${name}</h4>
                <div class="cash">
                  <p>$ ${price}K</p>
                  <button class= "delete"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                  </svg></button>
                </div>
                </span>`;

  productContainer.appendChild(card);
  return card

}

const render = async () => {
  try {
    const listProducts = await servicesProducts.productlist();

    listProducts.forEach(product => {
      const card = createCard(
        product.name,
        product.price,
        product.image,
        product.id
      );
      
      // Agregar event listener al botón de eliminar
      const deleteButton = card.querySelector('.delete');
      deleteButton.addEventListener('click', () => {
        // Eliminar el card profile al que pertenece el botón
        card.remove();
        // Aquí podrías llamar a una función para eliminar el producto del servidor
        // servicesProducts.deleteProduct(product.id);
      });

      productContainer.appendChild(card);
    });
    
  } catch (error) {
    console.log(error)
  }
}



form.addEventListener("submit", (event) => {
  event.preventDefault()


  const name = document.querySelector("[data-name]").value;
  const price = document.querySelector("[data-price]").value;
  const image = document.querySelector("[data-image]").value;

  servicesProducts.createProducts(name, price,  image).then((res) => console.log(res))
  .catch((error)=> console.log(error))




})

limpiar.addEventListener('click', () =>{
  form.reset()
})


render()