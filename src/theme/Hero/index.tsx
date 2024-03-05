import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

import Typed from '@theme/Typed';

import SvgArrowRight from '@site/src/svg/ArrowRight';

function Hero() {
  return (
    <header className="rds-hero">
      <div className="container">
        <div className="row">
          <div className="col col--12">
            <div className="row">
              <div className="col col--8">
                <h1 className="hero-title">
                  The Vesu
                  <br /> Documentation
                </h1>

                <h2 className="hero-subtitle">
                  <Typed
                    strings={['>_ Learn about earning, borrowing and building with Vesu']}
                    typeSpeed={75}
                  />
                </h2>
              </div>
            </div>
            
            <div className="boxes">

              <div className="box box-explore">
                <div className="text">
                  <h3 className="title">Blog</h3>
                  <p className="description">
                    Learn more about Vesu and how it will change the DeFi lending landscape
                  </p>
                  <span className="more">
                    Read more <SvgArrowRight color="#8A95FF" />
                  </span>
                </div>
                <a href={useBaseUrl('/blog')} className="link">
                  Read More
                </a>
              </div>

            </div>

          </div>
        </div>
      </div>
    </header>
  );
}

export default Hero;
