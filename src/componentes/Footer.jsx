const Footer = () => {
    return (
      <footer className="bg-9c9c9c p-4 text-#c4c3c1 text-center bottom-0 w-full">
        <p>
          <span property="dct:title">Restaurante Genérico</span> by{" "}
          <a
            rel="cc:attributionURL dct:creator"
            property="cc:attributionName"
            href="https://www.linkedin.com/in/josephgar/"
            target="_blank"
          >
            José Domingo Carrillo García
          </a>{" "}
          is licensed under{" "}
          <a
            href="http://creativecommons.org/licenses/by-nc-nd/4.0/?ref=chooser-v1"
            target="_blank"
            rel="license noopener noreferrer"
          >
            CC BY-NC-ND 4.0

          </a>
          , all rights reserved.
        </p>
      </footer>
    );
  };
  
  export default Footer;
