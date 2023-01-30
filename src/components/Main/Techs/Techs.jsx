import './Techs.css'

function Techs() {
  return (
    <article className="article techs" id="techs">
      <div className="article__container techs__container">
        <h2 className="article__header">Технологии</h2>
        <h2 className="article__header-big techs__header">7 заклинаний</h2>
        <p className="article__text techs__text">
          На курсе веб-разработки мы освоили множество заклинаний и заклятий.
          Вот 7 непростительных:
        </p>
        <ul className='techs__list'>
          <li className='techs__element'>HTML</li>
          <li className='techs__element'>CSS</li>
          <li className='techs__element'>JS</li>
          <li className='techs__element'>React</li>
          <li className='techs__element'>Git</li>
          <li className='techs__element'>Express.js</li>
          <li className='techs__element'>mongoDB</li>
        </ul>
      </div>
    </article>
  )
}

export default Techs
