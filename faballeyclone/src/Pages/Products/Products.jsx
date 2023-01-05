import { Box, Container, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { CategoryList } from '../../Components/Products/CategoryList/CategoryList'
import { ProductList } from '../../Components/Products/ProductList/ProductList'
import {AiFillCheckCircle} from 'react-icons/ai'
import {MdError} from 'react-icons/md'

export const Products = () => {
  const [products,setProducts] = useState([]);
  const [isLoading, setLoading]=useState(true);
  const [currentPage,setCurrentPage] = useState(1);
  const [totalProducts,setTotalProducts] =useState(0);
  const [showAlert,setAlert] = useState(false);
  const [showSuccess,setSuccess] = useState(false);
  const [filters,setFilters] = useState({
    category:'',
    color:'',
    sleeves:'',
    length:'',
    discount:''
  })

  const changeFilter = (key,value)=>{
    let newValue = value;
    if(key!="discount"){
      newValue = value.toLowerCase();;
    }
    console.log(key+'clicked'+ newValue)
    setFilters({
      ...filters,[key]:newValue
    })
  }
console.log(filters);

  const fetchData = async ()=>{
    setLoading(true)
    let res = await fetch(`https://enormous-childlike-gorgonzola.glitch.me/products?${(filters.category!="")?"category="+filters.category:""}&${(filters.color!="")?"color="+filters.color:""}&${(filters.sleeves!="")?"sleeves="+filters.sleeves:""}&${(filters.length!="")?"length="+filters.length:""}&${(filters.discount!="")?"discount_lte="+filters.discount:""}&`);
    let data = await res.json();
    console.log(data);
    setProducts(data);
      setInterval(()=>{
        setLoading(false);
      },4000)
  }


  const postData =async(propdata)=>{
    let newData={...propdata};
    delete newData.id;
    newData.qty=1;
    let res =await fetch(`https://enormous-childlike-gorgonzola.glitch.me/cart`,{
      method:"POST",
      body:JSON.stringify(newData),
      headers:{
        "Content-Type":"application/json"
      }
    })
    let data = await res.json();
    console.log(data);
    setSuccess(true);
    setTimeout(() => {
      
      setSuccess(false);
      
    }, 2000);

}


  const addToCart=async(e,propdata)=>{
    e.preventDefault();
    
    let res=await fetch(`https://enormous-childlike-gorgonzola.glitch.me/cart?uniqueId=${propdata.uniqueId}`)
    let data = await res.json()
    console.log(data);
    if(data.length>0){
      setAlert(true);

      setTimeout(() => {
        
        setAlert(false);

      }, 2000);
    }
    else{
      postData(propdata);
      

    }
  }
  console.log(showAlert);
  useEffect(()=>{
    fetchData();
  },[filters])
  return (
    <Box width={"80%"}  m={'auto '} display={'flex'} justifyContent={'space-between'} gap={'15px'} >
        <CategoryList changeFilter={changeFilter}/>
        <ProductList products={products} addToCart = {addToCart} isLoading={isLoading}/>

        {showSuccess?
            <Container  fontSize="1rem" gap="3px" h={'40px'} width="fit-content" backgroundColor="green" color="white" display="flex" justifyContent ="center" alignItems="center" position="fixed" top="10%" left="45%"  borderRadius="8px">
            <AiFillCheckCircle fontSize={"1.2rem"}/> <Text>
                
                Added To Cart
                </Text>
        </Container>:""}

        {showAlert?
            <Container  fontSize="1rem" gap="3px" h={'40px'} width="fit-content" backgroundColor="red" color="white" display="flex" justifyContent ="center" alignItems="center" position="fixed" top="10%" left="45%"  borderRadius="8px">
            <MdError fontSize={"1.2rem"}/> <Text>
                
                Already in Cart!
                </Text>
            </Container>:""}
    </Box>
  )
}
