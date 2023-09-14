
import '../index.css';
import LogOut from "./LogOut"
import {useAuth} from "../context/AuthContext"
import logo1 from "../Img/iconsNlogo/FullLogoMyNetnormalCTAWhite.png";
import logo2 from "../Img/iconsNlogo/FullLoMynetwhite copy.png";
import pikpytja from "../Img/HomeImg/pikpytjahahha.png";

const Home = () => {

    const {currentUser} = useAuth();

    function handleClick () {
        window.location.pathname = "/login"
    }

    return ( 
      <div>        
      <div className="intro" >
      <img src={logo1} alt="Header Logo" />
      <br/>
      <br/>
       <h3>T3 SOLUTION PRESENTS</h3>
       <br/>
       <h3>A new approach...</h3>
       <h3>A new product...</h3>
       <br/>
       <div>
           <a href='#about-us'>           
             <button  class="cta-buttons" >About</button>
           </a>
           <a href='#get-started'>           
             <button  class="cta-buttons" >Get Started</button>
           </a>
         
       </div>

   </div>
   <section id='about-us' className='about-us'>
       <div className="about-text">
         
         
           <img className='pikpytja' src={pikpytja} alt="Header Logo" />
             <h3 className='content'>How to use our new application?</h3>
             <p>Our application wants to make data menagment 
               easy. This app first starts by creating an account or
               if it is not your first time you can log in. 
               After login in you will be directed to
               'Add Application' section where by registring applications
               you will have a database for that application automaticlly 
               created in the backend. 
               When your application is registred, you can manage your 
               database by editing, deleting or adding new 
               tables or records to exsisting tables.
             </p>
       </div>
   </section>
   <section id='get-started' className="intro">
       <img class="CTA-Logo" src="Img/iconsNlogo/FullLogoMyNetnormalCTAWhite.png" alt="" />
       <h3>Are you excited to get started, click the button below to get started ... 
         </h3>
         <br />
       <div  >
       <img src={logo2} alt="Header Logo" />
          {!currentUser && <button onClick={handleClick} class="cta-buttons">Get Started</button>}
          {currentUser && <a href="/applications" ><button className='cta-buttons'>My Apps</button></a> }
          {currentUser && <LogOut />}
       </div>
   </section>
   </div>
     );
}
 
export default Home;