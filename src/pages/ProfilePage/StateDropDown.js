import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';

function StateDropDown({nameOfComponent, errors, values, setValues, apiKey}) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const cascadeChange = (event) => {
    event.persist();
    setValues(values => ({ ...values, [event.target.name]: event.target.value, formCity: '' }));
  };

  useEffect(() => {
    if(apiKey && values.formCountry && values.formCountry !== '') {
      (async () => {
        try {
          const res = await fetch(
            'https://www.universal-tutorial.com/api/states/' + values.formCountry,
            {
              method: 'GET',
              headers:{"Authorization": "Bearer " + apiKey,"Accept": "application/json"} 
            }
          );
          const resJson = await res.json();
          setData(await resJson);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [apiKey, values.formCountry]);
  return (
    <Form.Select 
      aria-label="Select state"
      autoComplete="off"
      name={nameOfComponent}
      onChange={cascadeChange}
      value={loading? '': values.formState}
      className={`${errors.formState && 'wrong-input'} form-select-custom`}
      required
      disabled={loading}
    >
      <option key={-2} value=''>State</option>
      {(values.formState !== '')? <option key={-1} value={values.formState}>{values.formState}</option>: null}
      {
        !loading && Array.isArray(data)? data.map((item, idx) => (
          (item.state_name !== values.formState)?
            <option
              key={idx}
              data-id={idx}
              value={item.state_name}
            >
              {item.state_name}
            </option>:null
        )): null
      }
    </Form.Select>
  );
}

export default StateDropDown;