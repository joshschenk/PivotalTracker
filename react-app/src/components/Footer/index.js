import "./index.css"
export default function Footer() {
    return (
        <div className='footer'>
            <div className="github-links">
                <a className="group-link" href="https://github.com/joshschenk">
                    <img className="github-icon" src="/Github-icon.png" alt="github-icon" />
                    {/* <p className="contributor-name">Joshua Schenk</p> */}
                </a>
                <a className="group-link" href="https://www.linkedin.com/in/josh-schenk-87339a286/">
                    <img className="github-icon" src="/LinkedIn.png" alt="linkedin-icon"/>
                </a>
                <a className="group-link" href="https://wellfound.com/u/josh-schenk">
                    <img className="github-icon" src="/Wellfound.png" alt="wellfound-icon" />
                </a>
            </div>
        </div>
    )
}
