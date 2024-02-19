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
                  <br /> Knowledge Hub
                </h1>

                <h2 className="hero-subtitle">
                  <Typed
                    strings={['>_ Made by developers for developers']}
                    typeSpeed={75}
                  />
                </h2>
              </div>
              <div className="col col--4">
                <SvgHero color="#FFFFFF" className="illustration" />
              </div>
            </div>
            <div className="boxes">
              <div className="box box-use">
                <SvgCreateBg color="#FFFFFF" className="bg" />
                <span className="icon">
                  <SvgCreate color="#FFFFFF" />
                </span>
                <div className="text">
                  <h3 className="title">User Guides</h3>
                  <p className="description">
                    Start using Vesu as a lender, borrower or liquidator
                  </p>
                  <span className="more">
                    Read guides <SvgArrowRight color="#DC382C" />
                  </span>
                </div>
                <a href={useBaseUrl('/use')} className="link">
                  Read More
                </a>
              </div>

              <div className="box box-create">
                <SvgDevelopBg color="#FFFFFF" className="bg" />
                <span className="icon">
                  <SvgDevelop color="#FFFFFF" />
                </span>
                <div className="text">
                  <h3 className="title">Create Markets</h3>
                  <p className="description">
                    Create new Vesu lending markets using vetted extensions
                  </p>
                  <span className="more">
                    Creator docs <SvgArrowRight color="#DC382C" />
                  </span>
                </div>
                <a href={useBaseUrl('/create')} className="link">
                  Read More
                </a>
              </div>

              <div className="box box-build">
                <SvgExploreBg color="#FFFFFF" className="bg" />
                <span className="icon">
                  <SvgExplore color="#FFFFFF" />
                </span>
                <div className="text">
                  <h3 className="title">Build Extensions</h3>
                  <p className="description">
                    Build new lending market experiences with your own extension
                  </p>
                  <span className="more">
                    Developer docs
                    <SvgArrowRight color="#DC382C" />
                  </span>
                </div>
                <a href={useBaseUrl('/build/')} className="link">
                  Read More
                </a>
              </div>

              <div className="box box-explore">
                <SvgExploreBg color="#FFFFFF" className="bg" />
                <span className="icon">
                  <SvgOperate />
                </span>
                <div className="text">
                  <h3 className="title">Risk Framework</h3>
                  <p className="description">
                    Explore the Vesu Risk Framework and find assigned risk ratings
                  </p>
                  <span className="more">
                    Explore risk
                    <SvgArrowRight color="#DC382C" />
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
