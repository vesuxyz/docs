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
                <h3 className="title">Explore Vesu</h3>
                  <p className="description">
                    Explore the concepts and resources behind Vesu
                  </p>
                  <span className="more">
                    Explore docs <SvgArrowRight color="#8A95FF" />
                  </span>
                </div>
                <a href={useBaseUrl('/explore')} className="link">
                  Read More
                </a>
              </div>

              <div className="box box-user-guides">
                <div className="text">
                  <h3 className="title">User Guides</h3>
                  <p className="description">
                    Start using Vesu as a lender, borrower or liquidator
                  </p>
                  <span className="more">
                    Read guides <SvgArrowRight color="#8A95FF" />
                  </span>
                </div>
                <a href={useBaseUrl('/user-guides')} className="link">
                  Read More
                </a>
              </div>

              <div className="box box-dev-guides">
                <div className="text">
                  <h3 className="title">Developer Guides</h3>
                  <p className="description">
                    Build new lending market experiences with your own extension
                  </p>
                  <span className="more">
                    Developer docs
                    <SvgArrowRight color="#8A95FF" />
                  </span>
                </div>
                <a href={useBaseUrl('/dev-guides/')} className="link">
                  Read More
                </a>
              </div>

              <div className="box box-risk">
                <div className="text">
                  <h3 className="title">Risk Framework</h3>
                  <p className="description">
                    Explore the Vesu Risk Framework and find assigned risk ratings
                  </p>
                  <span className="more">
                    Explore risk
                    <SvgArrowRight color="#8A95FF" />
                  </span>
                </div>
                <a href={useBaseUrl('/risk/')} className="link">
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