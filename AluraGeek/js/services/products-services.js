const productlist = () => {
       return fetch("http://localhost:3000/products")
        .then((res) => res.json()) 
        .catch((err) => console.log(err))
    
    }


    const createProducts = (name, price, image) =>{
        return fetch("http://localhost:3000/products", {
          method:"POST",
          headers: {
            "Content-Type": "aplication/json",
          },
          body: JSON.stringify({
            name,
            price,
            image
          })
        })
        .then((res) => res.json())
        .catch((err) => console.log(err) )
      
        
      }

export const servicesProducts ={
    productlist,
    createProducts
}