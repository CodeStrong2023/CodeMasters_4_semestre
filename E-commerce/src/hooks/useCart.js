import { useState, useEffect, useMemo} from "react"
import { db } from "../data/db"


export const useCart = () =>{
    
    const initialCart = () => {
        const localStorageCart = localStorage.getItem('cart')
        return localStorageCart ? JSON.parse(localStorageCart) : []
    }

    const [data] = useState(db)
    const [cart, setCart] = useState(initialCart)

    const MAX_ITEM = 5
    const MIN_ITEM = 1

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    function addToCart(item){
        const itemExist = cart.findIndex(guitar => guitar.id === item.id )
        if(itemExist >= 0){ //existe
            if(cart[itemExist].quantity >= MAX_ITEM) return
            const updatedCart = [...cart]
            updatedCart[itemExist].quantity++
            setCart(updatedCart)
        }else{
            item.quantity = 1
            setCart([...cart, item])
        }
    }

    function removeFromCart(id){
        setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
    }
    
    function increaseQuantity(id){
        const updatedCart = cart.map( item => {
            if(item.id === id && item.quantity < MAX_ITEM){
                return{
                    ...item,
                    quantity: item.quantity + 1
                }
            }
            return item
        })
        setCart(updatedCart)
    }

    function decreaseQuantity(id){
        const updatedCart = cart.map( item => {
            if(item.id === id && item.quantity > MIN_ITEM){
                return{
                    ...item,
                    quantity: item.quantity -1
                }
            }
            return item
        })
        setCart(updatedCart)
    }
    
    function clearCart(){
        setCart([])
    }

    //State derivado
    const isEmpaty = useMemo(() => cart.length === 0, [cart]) 
    const cartTotal = useMemo(() => cart.reduce((total, item) => total + (item.quantity * item.price),0),[cart])

    // Metodo de pago

    function processPayment(cartTotal) {
        if (cartTotal > 0) {
            alert(`Pago realizado con éxito por un total de $${cartTotal}. ¡Gracias por tu compra!`);
            // Aquí puedes vaciar el carrito después de la compra
            clearCart();
        } else {
            alert("El carrito está vacío. Agrega productos antes de pagar.");
        }
    }
    

    return{
        data, 
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        isEmpaty,
        cartTotal
    }
}

