import { useState, useCallback } from "react";

function useFormAndValidation() {
  // инпуты
  const [values, setValues] = useState({});
  // ошибки
  const [errors, setErrors] = useState({});
  // переменная отвечающая за валидность инпутов
  const [isValid, setIsValid] = useState(false);
  // стэйт переменная, определяющая отображение commonError
  const [isCommonState, setIsCommonState] = useState(false);

  // обработчик на ввод в инпуты
  const handleChange = (evt) => {
    const { value, name } = evt.target;
    // получаем значения инпутов
    setValues({ ...values, [name]: value });
    // в спаны выводим текст ошибки
    setErrors({ ...errors, [name]: evt.target.validationMessage });
    // определяем валидность инпутов
    setIsValid(evt.target.closest("form").checkValidity());
    // убираем отображение общей ушипки
    setIsCommonState(false);
  };

  // функция для сброса формы: инпутов и ошибок
  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return {
    values,
    setValues,
    handleChange,
    errors,
    isValid,
    setIsValid,
    resetForm,
    isCommonState,
    setIsCommonState
  };
}

export default useFormAndValidation;
