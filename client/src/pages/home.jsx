
import {Header,LandingPage} from "../components"
const Home = () => {
  
  return (
    <main className= "w-screen h-screen flex items-center justify-center flex-col bg-primary">
      <Header/>
      <div className="w-full flex flex-col items-start justify-center mt-60 px-6 md:px-24 2xl:px-96 gap-12 pb-24">
        <LandingPage/>
      </div>
    </main>
  )
}

export default Home
