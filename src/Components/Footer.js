


const Footer = () => {

    const date = new Date().getFullYear();
    return(
        <div className="footer">
           {date} <a href="https://www.linkedin.com/in/divesh-kolhe-436401235/">SKstudies</a> • Built with NodeJs and MongoDB
        </div>
    )
}

export default Footer;