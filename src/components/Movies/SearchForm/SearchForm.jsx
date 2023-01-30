import './SearchForm.css';

import {useFormAndValidation} from '../../../hooks/useForm';

function SearchForm({ isShortFilms, setIsShortFilms, handleShortFilms }) {

  //подключим хук для валидации формы
  const { values, setValues, handleChange, errors, isValid } = useFormAndValidation();

  function handleSliderChange() {
    setIsShortFilms(!isShortFilms);
    handleShortFilms();
  }

  return (
    <article className='article'>
      <form className='search-form'>
        <fieldset className='search-form__fieldset-film'>
          <label className='search-form__label-film'>
            <input className='search-form__input' 
              id='film' 
              placeholder='Фильм' 
              type='text' 
              name='film' 
              minLength='3' 
              maxLength='20' 
              values={values['film']}
              onChange={handleChange}
              required/>
            <span className='search-form__error'>{errors['film'] || ''}</span>            
          </label>
          <button 
            className='search-form__submit-button'
            disabled={isValid ? '' : 'disabled'}></button>
        </fieldset>
        <fieldset className='search-form__fieldset-slider'>
          <label className='search-form__label-slider'>
            <input className='search-form__slider'
              id='short-films'
              type='checkbox'
              name='short-films'
              checked={isShortFilms}
              onChange={handleSliderChange}/>
            <span className='search-form__text'>Короткометражки</span>            
          </label>
        </fieldset>
      </form>
    </article>
  )
}

export default SearchForm;