import Footer from "../components/footer/footer";
import Header from "../components/header/header";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPeopleGroup, faShieldCat, faPersonChalkboard } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  return (
    <>
      <Header />
      
      <div className="section__content">
        <div className="content__text">
          <h1>Lorem ipsum dolor sit</h1>
          <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </h2>
        </div>
        <img className="content__img" src="/images/image1.png" alt="" />
      </div>

      <div className="section__about">
        <div className="about__card">
          <FontAwesomeIcon className="card__icon" icon={faPeopleGroup}></FontAwesomeIcon>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
        </div>
        <div className="about__card">
          <FontAwesomeIcon className="card__icon" icon={faShieldCat}></FontAwesomeIcon>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
        </div>
        <div className="about__card">
          <FontAwesomeIcon className="card__icon" icon={faPersonChalkboard}></FontAwesomeIcon>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
        </div>
      </div>

      <div className="section__propose">
        <h1>Предложить проект</h1>
        <form className="propose__form">
          <input type="text" placeholder="Ваше имя" />
          <input type="text" placeholder="Ваша фамилия" />
          <input type="text" placeholder="Ваш email" />
          <input type="text" placeholder="Название проекта" />
          <textarea placeholder="Описание проекта и требуемые навыки" />
          <button type="submit">Отправить</button>
        </form>
      </div>

      <Footer />
    </>
  )
}
