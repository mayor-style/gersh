import React, {useEffect} from 'react'
import './book.css'
import img1 from './assets/1.jpg'
import img2 from './assets/2.jpg'
import img3 from './assets/3.jpg'
import img4 from './assets/4.jpg'
import img5 from './assets/5.jpg'
import img6 from './assets/6.jpg'
import img7 from './assets/7.jpg'
import img8 from './assets/8.jpg'
import img9 from './assets/9.jpg'
import img10 from './assets/10.jpg'
import img11 from './assets/11.jpg'
import img12 from './assets/12.jpg'
import img13 from './assets/13.jpg'
import img14 from './assets/14.jpg'
import img15 from './assets/15.jpg'
import img16 from './assets/16.jpg'
import img17 from './assets/17.jpg'
import img18 from './assets/18.jpg'
import img19 from './assets/19.jpg'
import img20 from './assets/20.jpg'
import { Link } from 'react-router-dom'
const BookPage = () => {
 

    useEffect(()=>{
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
     if ( entry.isIntersecting) { entry.target.classList.add('show-Img') }
    });
  });

  const hiddenElements= document.querySelectorAll('.hidden-Img');
  hiddenElements.forEach((el)=> observer.observe(el))
},[])
  return (
    <>
      <nav>
        <div className="navbar">
          <div className="left">books</div>
          <div className="middle">Gersh</div>
          <div className="right">menu</div>
        </div>
      </nav>
    <section className='heroSecCon'>
      <div className="heroSec">
        <div style={{height:'100px'}}></div>
      <h2>The Gersh Books Department represents today's most influential, bestselling and award-winning writers. From industry leaders to critically-acclaimed emerging voices, our clients include journalists, novelists, screenwriters, actors, literary estates, publications, and media personalities.</h2>

      <p>We work closely with our clients throughout all aspects of the publishing process, and advocate to develop and set up their intellectual property across film, television, documentaries, podcasts, and other media platforms.</p>
      <div className="submitBook">
        <Link to="/submit"> <button>Submit Your Book!</button></Link>
   
    </div>
      </div>
    </section>
    <section>
      <div className="works">
      <div className="subheading">
        <p>We work closely with our clients throughout all aspects of the publishing process, and advocate to develop and set up their intellectual property across film, television, documentaries, podcasts, and other media platforms.</p>
     
      </div>
        <div className="bookImgs">
      <img className="hidden-Img" src={img1} alt="" />
      <img className="hidden-Img" src={img2} alt="" />
      <img className="hidden-Img" src={img3} alt="" />
      <img className="hidden-Img" src={img4} alt="" />
      <img className="hidden-Img" src={img5} alt="" />
      <img className="hidden-Img" src={img6} alt="" />
      <img className="hidden-Img" src={img7} alt="" />
      <img className="hidden-Img" src={img8} alt="" />
      <img className="hidden-Img" src={img9} alt="" />
      <img className="hidden-Img" src={img10} alt="" />
      <img className="hidden-Img" src={img11} alt="" />
      <img className="hidden-Img" src={img12} alt="" />
      <img className="hidden-Img" src={img13} alt="" />
      <img className="hidden-Img" src={img14} alt="" />
      <img className="hidden-Img" src={img15} alt="" />
      <img className="hidden-Img" src={img16} alt="" />
      <img className="hidden-Img" src={img17} alt="" />
      <img className="hidden-Img" src={img18} alt="" />
      <img className="hidden-Img" src={img19} alt="" />
      <img className="hidden-Img" src={img20} alt="" />
        </div>
      </div>
    </section>
   
    </>
  )
}

export default BookPage
