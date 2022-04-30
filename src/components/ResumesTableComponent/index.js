import React, { useRef } from 'react';
import Table from 'react-bootstrap/Table';
import ReactToPrint from 'react-to-print';
import {StanfordTemplate} from '../TemplatesComponents/StanfordTemplate';
import {HarvardTemplate} from '../TemplatesComponents/HarvardTemplate';
import FullScreenLoaderComponent from '../FullScreenLoaderComponent';

const ResumesTableComponent = ({storedResumes, loading}) => {
  const itemsRef = useRef(new Array(storedResumes.length).fill(0));

  return (
    <>
      {
        loading ? (
          <FullScreenLoaderComponent />
        ) : (
          <>
            {
            storedResumes.length === 0 ? "No resume found" : 
            <Table responsive="lg" striped>
              <tbody>
                {
                  storedResumes.map((item, idx) => 
                    // let data = item.data();
                    // console.log(data);
                    <tr key={idx}>
                      <td>{item.data().documentName}</td>
                      <td>{item.data().template}</td>
                      <td>
                        <ReactToPrint
                          trigger={() => <button className="custom-button primary-button" data-template="t1">Print this out!</button>}
                          content={() => {
                            return itemsRef.current[idx];
                          }}
                        />
                      </td>
                      <td>
                      <div style={{ display: "none" }}>
                        {item.data().template === "Stanford"? 
                        <StanfordTemplate ref={(el) => (itemsRef.current[idx] = el)} 
                          profile={item.data().profile}
                          education={item.data().education}
                          experience={item.data().experience}
                          achivements={item.data().achivements}
                          interests={item.data().interests}
                          languages={item.data().languages}
                          skills={item.data().skills} />:
                        <HarvardTemplate ref={(el) => (itemsRef.current[idx] = el)} 
                          profile={item.data().profile}
                          education={item.data().education}
                          experience={item.data().experience}
                          achivements={item.data().achivements}
                          interests={item.data().interests}
                          languages={item.data().languages}
                          skills={item.data().skills} />}
                      </div>
                      </td>
                    </tr>
                  )
                }
              </tbody>
            </Table>
            }
          </>
        )
      }
    </>
  )
}

export default ResumesTableComponent;