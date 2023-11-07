import React from 'react';
import { Formik, FieldArray } from 'formik'
import * as yup from 'yup'
import './App.scss'


function App() {

  const getError = (touched, error) => {
    return touched && error && <p key={error} className={'error'}>{error}</p>
  }

  const validationsSchema = yup.object().shape({
    addressRegister: yup.string().required(),
    likeRegister: yup.bool(),
    addressActual: yup.string().when('likeRegister', {
      is: false,
      then: yup.string().required()
    }),
    file: yup.array().of(yup.object().shape({
      file: yup.mixed().test('fileSize', 'Размер файла больше 10 байт', (value) => {
        if (!value) return false
        return value.size < 10
      }).required(),
      type: yup.string().oneOf([`application/vnd.ms-publisher`], 'Добавьте файл с правильным форматов').required(),
      name: yup.string().required()
    }).typeError('Добавьте файл')).required()
  })

  const getFileSchema = (file) => (file && {
    file: file,
    type: file.type,
    name: file.name
  })

  const getArrErrorsMessages = (errors) => {
    const result = []
    errors && Array.isArray(errors) && errors.forEach((value) => {
      if (typeof value === 'string') {
        result.push(value)
      } else {
        Object.values(value).forEach((error) => { result.push(error) })
      }
    })
    return result
  }


  return (
    <div>
      <Formik
        initialValues={{
          addressRegister: '',
          likeRegister: false,
          addressActual: '',
          file: undefined
        }}
        validateOnBlur
        onSubmit={(values) => { console.log(values) }}
        validationSchema={validationsSchema}
      >
        {({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty }) => (
          <div className={`from`}>
            <p>
              <label htmlFor={`addressRegister`}>Адрес регистрации</label><br />
              <input
                className={'input'}
                type={`text`}
                name={`addressRegister`}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.addressRegister}
              />
            </p>
            {getError(touched.addressRegister, errors.addressRegister)}
            <p>
              <label htmlFor={`likeRegister`}>Адреса совпадают
                <input
                  type={`checkbox`}
                  name={`likeRegister`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  checked={values.likeRegister}
                />
              </label>
            </p>
            {!values.likeRegister &&
              <p>
                <label htmlFor={`addressActual`}>Адрес проживания</label><br />
                <input
                  className={'input'}
                  type={`text`}
                  name={`addressActual`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.addressActual}
                />
              </p>
            }
            {!values.likeRegister && getError(touched.addressActual, errors.addressActual)}
            {console.log('file', values.file)}
            {console.log('fileErrors', errors.file)}
            <FieldArray name={`file`}>
              {(arrayHelper) => (
                <>
                  <p>
                    <input
                      type={`file`}
                      name={`file`}
                      onChange={(event) => {
                        const { files } = event.target
                        const file = getFileSchema(files.item(0))
                        if (!file) {
                          arrayHelper.remove(0)
                        }
                        if (Array.isArray(values.file)) {
                          arrayHelper.replace(0, file)
                        } else {
                          arrayHelper.push(file)
                        }
                      }}
                    />
                  </p>
                  {getArrErrorsMessages(errors.file).map((error) => getError(true, error))}
                </>
              )}

            </FieldArray>



            <button
              disabled={!isValid || !dirty}
              onClick={handleSubmit}
              type={`submit`}
            >Отправить</button>
          </div>
        )}
      </Formik>
    </div>
  );
}

export default App;