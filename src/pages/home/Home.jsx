import React, { useContext } from 'react'
import Layout from '../../components/Layout/Layout'
import myContext from '../../context/data/myContext'

const Home = () => {
    const context = useContext(myContext)
    
  return (
    <Layout>
      Home
      
    </Layout>
  )
}

export default Home
