import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';

function CountriesDropDown({nameOfComponent, errors, values, setValues, apiKey}) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const cascadeChange = (event) => {
    event.persist();
    setValues(values => ({ ...values, [event.target.name]: event.target.value, formState: '', formCity: '' }));
  };

  useEffect(() => {
    if(apiKey) {
      (async () => {
        try {
          const res = await fetch(
            "https://www.universal-tutorial.com/api/countries",
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
  }, [apiKey]);
  return (
    <Form.Select 
      aria-label="Select country"
      autoComplete="off"
      name={nameOfComponent}
      onChange={cascadeChange}
      value={loading? '': values.formCountry}
      className={`${errors.formCountry && 'wrong-input'} form-select-custom`}
      required
      disabled={loading}
    >
      <option key={-2} value=''>Country</option>
      <option key={-1} value={values.formCountry}>{values.formCountry}</option>
      {
        !loading && Array.isArray(data)? data.map((item, idx) => (
          (item.country_name !== values.formCountry)?
            <option
              key={idx}
              data-id={idx}
              value={item.country_name}
            >
              {item.country_name}
            </option>:null
        )): null
      }
    </Form.Select>
  );
}

export default CountriesDropDown;