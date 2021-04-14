import "./footer.css";

function Footer() {
  return (
    <>
      <footer>
        <p className='footerBold'>Created by</p>
        <ul>
          <li>
            <a href='https://github.com/MackenzieHowey'>
              <i className='fab fa-github' aria-label='github'></i>
            </a>
            <a href='https://www.linkedin.com/in/mackenzie-howey-a4299a207/'>
              <i class='fab fa-linkedin' aria-label='linked in'></i>
            </a>
            <p>Mackenzie Howey</p>
          </li>
          <li>
            <a href='https://github.com/iSupercell'>
              <i className='fab fa-github' aria-label='github'></i>
            </a>
            <a href=' www.linkedin.com/in/si-jia-m-52710560'>
              <i class='fab fa-linkedin' aria-label='linked in'></i>
            </a>
            <p>Si-Jia Mao</p>
          </li>
          <li>
            <a href='https://github.com/Layd-T'>
              <i className='fab fa-github' aria-label='github'></i>
            </a>
            <a href='www.linkedin.com/in/toria-walker-mchayle-3588693b/'>
              <i class='fab fa-linkedin' aria-label='linked in'></i>
            </a>
            <p>Toria Walker-McHayle</p>
          </li>
        </ul>
        <p className='footerBold'>
          at <a href='https://junocollege.com/'>Juno College of Technology</a>
        </p>
      </footer>
    </>
  );
}

export default Footer;
