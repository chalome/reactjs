import { useEffect, useState } from 'react'
import './App.css'
import Main from './components/Main'
import SideBar from './components/SideBar'
import Footer from './components/Footer'

function App() {
  const [data,setData]=useState(null)
  const [showModal, setShowModal] = useState(false)
  const [loading,isLoading]=useState(false)

  function handleToggleModal() {
    setShowModal(!showModal)
  }
  useEffect(()=>{

    async function fetchDataApi(){
      const NASA_KEY = '0XxLF0eXOSvHJZcF9y4zUj3BJOI6gL4jZogPyGNU'
      const url='https://api.nasa.gov/planetary/apod?api_key='+`${NASA_KEY}`

      const today = (new Date()).toDateString()
      const localKey = `NASA-${today}`
      if (localStorage.getItem(localKey)) {
        const apiData = JSON.parse(localStorage.getItem(localKey))
        setData(apiData)
        console.log('Fetched from cache today')
        return
      }
      localStorage.clear()

      try {
        const res = await fetch(url)
        const apiData = await res.json()
        localStorage.setItem(localKey, JSON.stringify(apiData))
        setData(apiData)
        console.log('Fetched from API today')
      } catch (err) {
        console.log(err.message)
      }
    }
    fetchDataApi()
  },[])
  return (
    <>
      {data ? (<Main data={data} />) : (
        <div className="loadingState">
          <i className="fa-solid fa-gear"></i>
        </div>
      )}
      {showModal && (
        <SideBar data={data} handleToggleModal={handleToggleModal} />
      )}
      {data && (
        <Footer data={data} handleToggleModal={handleToggleModal} />
      )}
    </>
  )
}

export default App
