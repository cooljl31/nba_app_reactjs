import React from 'react';
import PropTypes from 'prop-types';
import style from './formfields.css';

const FormFields = ({formData,change,id}) => {


  const showErrors = () => {
    let errorMessage ='';
    if (formData.validation && !formData.valid) {
      errorMessage = (
        <div className={style.label_error}>
          {formData.validationMessage}
        </div>
      );
    }

    return errorMessage;
  };

  const renderTemplate = () => {
    let formTemplate ='';

    switch (formData.element) {
      case 'input':
        formTemplate = (
          <div>
            {showErrors()}
            <input
              {...formData.config}
              value={formData.value}
              onChange={
                event => change({event,id,blur:false})
              }
              onBlur={
                event => change({event,id,blur:true})
              }
            />
          </div>
        );
        break;
      case 'select':
        formTemplate = (
          <div>
             {showErrors()}
            <select
              name={formData.config.name}
              value={formData.value}
              onChange={
                event => change({event,id,blur:false})
              }
              onBlur={
                event => change({event,id,blur:true})
              }
            >
              {formData.config.options.map((item,i)=>(
                <option key={i} value={item.id}>{item.name}</option>
              ))}
            </select>
          </div>
        );
        break;

      default:
        formTemplate = null;
        break;
    }
    return formTemplate;
  };

  return (
    <div>
      {renderTemplate()}
    </div>
  );
};

FormFields.propTypes = {
  change: PropTypes.func,
  formData: PropTypes.object
};

export default FormFields;
