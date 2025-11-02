import React from 'react';

export default class AboutPage extends React.Component {
    render() {
        return (
            <div id="sub-content" className="about">
                <div className="grid-d-12">
                    <h2>About</h2>

                    <p>Cory Fitzpatrick is a seasoned Software Tech Lead with a proven track record of guiding engineering teams through complex product development, technical modernization, and cross-functional collaboration. In his most recent role at VELYS Digital, he led both Feature Team Two and the Sustaining Team, where he coordinates with global stakeholders including iOS developers, product owners, and hardware teams to deliver mission-critical healthcare-connected applications.</p>
                    <p>Cory has successfully driven the delivery of MVPs under tight deadlines, balancing technical leadership with a deep understanding of team dynamics and business needs. He has led initiatives to proactively upgrade frameworks and dependencies, reduce technical debt, and enhance system security, demonstrating a forward-thinking approach to platform stability and long-term maintainability.</p>
                    <p>What sets Cory apart is his dedication to mentorship, cross-team alignment, and operational efficiency. He has played a key role in onboarding new customers, supporting production teams, and creating clear documentation to streamline adoption and support. His leadership style emphasizes clarity, accountability, and collaboration.</p>
                    <p>This site was built with <a href="https://react.dev/" target="_blank" rel="noopener noreferrer">React 19</a>, <a href="https://reactrouter.com/" target="_blank" rel="noopener noreferrer">React Router</a>, <a href="https://vite.dev/" target="_blank" rel="noopener noreferrer">Vite</a>, <a href="https://sass-lang.com/" target="_blank" rel="noopener noreferrer">SCSS</a>, and <a href="http://www.rwdgrid.com/" target="_blank" rel="noopener noreferrer">RWDGRID</a>. It is deployed on <a href="https://pages.github.com/" target="_blank" rel="noopener noreferrer">GitHub Pages</a> with automated CI/CD via GitHub Actions.</p>

                    <a href="https://github.com/fitzmx6/fitzmx6.github.io" target="_blank" rel="noopener noreferrer">Check Out This Sites Code on Github</a>

                    <a href="https://www.linkedin.com/in/coryfitzpatrick" target="_blank" rel="noopener noreferrer">Cory’s LinkedIn Profile</a>
                </div>
            </div>
        );
    }
}
