import "./AboutProject.css";

function AboutProject() {
  return (
    <article className="article about-project" id="about-project">
      <div className="article__container about-project__container">
        <h2 className="article__header">Супер-пупер секретная информация</h2>

        <section className="about-project__describe-container">
          <h2 className="about-project__describe-header">
            Дипломный проект включал 5 этапов
          </h2>
          <p className="article__text">
            Составление плана, прокрастинация, боль от того, как план далек от
            реальности, любые дела, кроме диплома, написание диплома.
          </p>
          <h2 className="about-project__describe-header about-project__describe-header_margin">
            На выполнение диплома ушло несколько ночей без сна
          </h2>
          <p className="article__text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, но верстка не дружит с мягкими дедлайнами.
          </p>
        </section>

        <section className="about-project__progress-container">
          <h2 className="about-project__progress-header">1 неделя</h2>
          <p className="about-project__progress-text">Диплом</p>
          <h2 className="about-project__progress-header about-project__progress-header_black">
            4 недели
          </h2>
          <p className="about-project__progress-text">Прокрастинация</p>
        </section>
      </div>
    </article>
  );
}

export default AboutProject;
