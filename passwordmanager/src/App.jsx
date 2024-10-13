import Footer from "./Component/Footer"
import Manager from "./Component/Manager"
import Navbar from "./Component/Navbar"


function App() {

  return (
    <>
    <Navbar/>
    <div className="maincont  overflow-y-scroll">
    <Manager/>
    </div>
    {/* <Footer/> */}
    </>
  )
}

export default App
