import "./AboutMe.css";

import profilePhoto from "../../../images/profile-photo.jpg";

function AboutMe() {
  return (
    <article className="article about-me" id="about-me">
      <div className="article__container about-me__container">
        <h2 className="article__header">Студент</h2>
        <div className="article__grid-container about-me__grid-container">
          <h2 className="about-me__header">Курцхаар Петрович</h2>
          <h3 className="about-me__about">Junior attention seeker, 4 месяца</h3>
          <p className="article__text about-me__text">
            Родился от мамки с папкой с шилом в попе. Прошел курс УГС и прошел
            мимо курса ОКД, поскольку слушаюсь пока, как получится. Люблю
            поспать, поесть и поиграть. Не люблю давать покой хозяевам. Планирую
            пройти курсы по поиску полевой дичи, но пока не хватает ресурса,
            нужно вырасти умненьким и благоразумненьким.
          </p>
          <a
            className="about-me__link"
            target="_blank"
            rel="noreferrer"
            href="https://memax.club/yumor/1233-smeshnye-kurtshaary-13-foto"
          >
            Мемасики
          </a>
          <img
            className="about-me__picture"
            src={profilePhoto}
            alt="фото щенка курцхаара, играющего с мячиком"
          />
        </div>
      </div>
    </article>
  );
}

export default AboutMe;
