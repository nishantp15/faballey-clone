import { Box, Button } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Filters } from '../Filters/Filters';
import { ProductCard } from '../ProductCard/ProductCard'
import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from '@chakra-ui/react'
import {ChevronDownIcon} from '@chakra-ui/icons'

export const ProductList = ({products,addToCart,isLoading,changeSort,sort}) => {
  let renderingData =[0,0,0,0,0,0,0,0,0,0,0,0];
  return (<div style={{width:"79%" ,padding:"4px 20px",border:'2px solid red'}}>
    <Box  className='productListTitle' h={'30px'}  paddingTop={'4px'} paddingBottom={'25px'} display="flex" justifyContent={'space-between'} borderTop='1px solid gray' borderBottom={'1px solid gray'} mb='20px'>
    <Box display="flex" alignItems={'center'}  height={'20px'}>
      <Box paddingRight={'10px'} borderRight={'1px solid gray'} ><h6>TOPS</h6></Box>
      <Box paddingLeft={'10px'} paddingRight={'10px'} borderRight={'1px solid gray'} ><h6>234 STYLES FOUND</h6></Box>
      <Box paddingLeft={'10px'}><h6>view 201</h6></Box>
    </Box>
    <Box>
      <Box width={'190px'}  display="flex" alignItems={'center'} height={'20px'}>
        <Menu>
  <MenuButton  rightIcon={<ChevronDownIcon />}>
    SORT BY PRICE:{sort==''?"RELEVENCE":sort=='asc'?'ASCENDING':"DESCENDING"}  
  </MenuButton>
  <MenuList minWidth='195px' border={'2px solid gray'}>
    <MenuOptionGroup  defaultValue='' type='radio'>
      <MenuItemOption onClick={(e)=>changeSort('')} value=''>RELEVENCE</MenuItemOption>
      <MenuItemOption onClick={(e)=>changeSort('asc')} value='asc'>ASCENDING</MenuItemOption>
      <MenuItemOption onClick={(e)=>changeSort('desc')} value='desc'>DESCENDING</MenuItemOption>
    </MenuOptionGroup>
  </MenuList>
  
</Menu>
      </Box>
    </Box>
  </Box>
  {isLoading?
    <Box display={"grid"} gridTemplateColumns={"repeat(4,1fr)"} gridRowGap={"15px"} gridColumnGap={"15px"}>
      {
        renderingData.map((elem)=>{
          return <ProductCard data={elem} addToCart={addToCart} isLoading={isLoading}/>
        })
      }
    </Box>:
    <Box display={"grid"} gridTemplateColumns={"repeat(4,1fr)"} gridRowGap={"15px"} gridColumnGap={"15px"}>
      {
        products.map((elem)=>{
          return <ProductCard data={elem} addToCart={addToCart} isLoading={isLoading}/>
        })
      }
    </Box>}
    </div>
  )
}



