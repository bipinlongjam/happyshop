import React, { useEffect, useState } from 'react'
import MyContext from './myContext'
import { QuerySnapshot, Timestamp, addDoc, collection, deleteDoc,getDocs, doc, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'
import { fireDB } from '../../firebase/FirebaseConfig'

const myState = (props) => {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [mode, setMode] = useState('light')

    const toggleMode = () =>{
        if(mode === 'light'){
            setMode('dark');
            document.body.style.backgroundColor = "rgb(17, 24, 39)";
        }
        else{
            setMode('light')
            document.body.style.backgroundColor = "white"
        }
    }
   // eslint-disable-next-line react-hooks/rules-of-hooks
   const [loading, setLoading] = useState(false)

   const [products, setProducts] = useState({
    title:null,
    price:null,
    imageUrl:null,
    category:null,
    description:null,
    time: Timestamp.now(),
    date: new Date().toLocaleString(
      "en-US",
      {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }
    )
   })

   const addProduct = async() =>{
        if(products.title == null || products.price == null || products.imageUrl == null || 
            products.category == null || products.description == null){
                return toast.error("all fields are required");
            }
            setLoading(true)
            try{
                const productRef = collection(fireDB, "products");
                await addDoc(productRef, products);
                toast.success("Add products Successfully");
                setTimeout(() =>{
                    window.location.href = '/dashboard'
                },800)
                getProductData();
                setLoading(false)
            }catch(error){
                console.log(error)
                setLoading(false)
            }
   } 
   
   const [product, setProduct] = useState([]);

   const getProductData = async() =>{
    
    setLoading(true)

    try{
        const q = query(
            collection(fireDB, 'products'),
            orderBy('time')
        );
        const data = onSnapshot(q, (QuerySnapshot) =>{
            let productArray = [];
            QuerySnapshot.forEach((doc) =>{
                productArray.push({...doc.data(), id:doc.id})
            })
            setProduct(productArray);
            setLoading(false)
        })
        return () => data;
    }catch(error){
        console.log(error);
        setLoading(false)
    }
   }

  

   //Update product function

   const editHandle = (item) =>{
    setProducts(item)
   }

   const updateProduct = async() =>{
    setLoading(true)
    try{

        await setDoc(doc(fireDB,'products', products.id), products)
        toast.success("Product update successfully");
        getProductData();
        window.location.href = '/dashboard'
        setLoading(false);
    }
    catch(error){
        console.log(error);
        setLoading(false)
    }
   }
   //Delete product

   const deleteProduct = async(item) =>{
        setLoading(true)
    try{
        await deleteDoc(doc(fireDB, 'products', item.id))
        toast.success("Product Deleted Successfully")
        getProductData();
        setLoading(false)
    }
    catch(error){
        console.log(error);
        setLoading(false)
    }
   }

   
  const [order, setOrder] = useState([]);

  const getOrderData = async () => {
    setLoading(true)
    try {
      const result = await getDocs(collection(fireDB, "order"))
      const ordersArray = [];
      result.forEach((doc) => {
        ordersArray.push(doc.data());
        setLoading(false)
      });
      setOrder(ordersArray);
      console.log(ordersArray)
      setLoading(false);
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    getProductData();
    getOrderData()
},[])

  return (
    <MyContext.Provider value={{mode, toggleMode, loading, setLoading, products,
     setProducts, addProduct, product, editHandle, updateProduct, deleteProduct, order }}>
        {props.children}
    </MyContext.Provider>
  )
}

export default myState
