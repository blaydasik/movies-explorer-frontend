import './Promo.css'
import promoImg from '../../../images/promo-img.svg'

function Promo() {
  return (
    <article className="article promo" id="promo">
      <div className="article__grid-container promo__container">
        <h1 className="promo__header">
          Учебный проект студента факультета Веб&#8209;разработки.
        </h1>
        <p className="promo__text">
          Эй гражданина, ты сюда не ходи, туда ходи. А то снег башка попадет
          совсем мертвый будешь.
        </p>
        <a className="promo__link" href="#portfolio">
          Спасите мой мозг
        </a>
        <img
          className="promo__picture"
          src={promoImg}
          alt="изображение земли, составленное из слов web"
        />
      </div>
    </article>
  )
}

export default Promo
