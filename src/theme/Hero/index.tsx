import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

import Typed from '@theme/Typed';

import SvgHero from '@site/src/svg/Hero';
import SvgCreate from '@site/src/svg/Create';
import SvgCreateBg from '@site/src/svg/CreateBg';
import SvgDevelop from '@site/src/svg/Develop';
import SvgDevelopBg from '@site/src/svg/DevelopBg';
import SvgExplore from '@site/src/svg/Explore';
import SvgOperate from '@site/src/svg/Operate';
import SvgExploreBg from '@site/src/svg/ExploreBg';
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
                    strings={['>_ Learn. Use. Build. Innovate.']}
                    typeSpeed={75}
                  />
                </h2>
              </div>
              <div className="col col--4">
                <SvgHero color="#FFFFFF" className="illustration" />
              </div>
            </div>
            
            <div className="boxes">

              <div className="box box-explore">
                <SvgExploreBg color="#FFFFFF" className="bg" />
                <span className="icon">
                  <SvgExplore color="#FFFFFF" />
                </span>
                <div className="text">
                  <h3 className="title">Blog</h3>
                  <p className="description">
                    Learn more about Vesu and how it will change the DeFi lending landscape
                  </p>
                  <span className="more">
                    Read more <SvgArrowRight color="#DC382C" />
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
