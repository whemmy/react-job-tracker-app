import React from 'react'
import real from '../assets/images/Real.svg'
import Wrapper from '../assets/wrappers/LandingPage'
import { Logo } from '../components'
import { Link } from 'react-router-dom'
const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        {/* info */}
        <div className="info">
          <h1>
            job <span>tracking</span>app
          </h1>
          <p>
            Vexillologist banh mi blue bottle tote bag copper mug. Thundercats
            DSA retro, banjo tonx single-origin coffee salvia hella jean shorts.
            Snackwave chia single-origin coffee, williamsburg umami keytar tbh
            kickstarter shabby chic YOLO fingerstache before they sold out pug.
          </p>
          <Link to="/register" className="btn btn-hero">
            Login/Register
          </Link>
        </div>
        <img src={real} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  )
}

export default Landing
