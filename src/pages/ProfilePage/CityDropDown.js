import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';

function CityDropDown({nameOfComponent, errors, values, setValues, apiKey}) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const cascadeChange = (event) => {
    event.persist();
    setValues(values => ({ ...values, [event.target.name]: event.target.value }));
  };

  useEffect(() => {
    if(apiKey && values.formState && values.formState !== '') {
      (async () => {
        try {
          const res = await fetch(
            'https://www.universal-tutorial.com/api/cities/' + values.formState,
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
  }, [apiKey, values.formState]);
  return (
    <Form.Select 
      aria-label="Select city"
      autoComplete="off"
      name={nameOfComponent}
      onChange={cascadeChange}
      value={loading? '': values.formCity}
      className={`${errors.formCity && 'wrong-input'} form-select-custom`}
      required
      disabled={loading}
    >
      <option key={-2} value=''>City</option>
      {(values.formCity !== '')? <option key={-1} value={values.formCity}>{values.formCity}</option>: null}
      {
        !loading && Array.isArray(data)? data.map((item, idx) => (
          (item.city_name !== values.formCity)?
            <option
              key={idx}
              data-id={idx}
              value={item.city_name}
            >
              {item.city_name}
            </option>:null
        )): null
      }
    </Form.Select>
  );
}

export default CityDropDown;