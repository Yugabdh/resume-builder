import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { makeTransparent } from '../../redux/navbarTransparent';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion'

const FAQPage = () => {
  const dispatch = useDispatch();

  // trigger on component mount
  useEffect(() => {
    dispatch(makeTransparent());
  }, [dispatch]);

  return (
    <>
      <header className="view-faq">
        <div className="d-flex justify-content-center align-items-center mask hero-header-faq">
          <Container className="px-md-3 px-sm-0">
            <Row className="hero-header-content align-items-center text-center">
              <Col md={12} lg={12}>
                  <h1 className="hero-header-title"> <br /><span className="highlight">Resume Builder</span></h1>
                  <p className="hero-header-description"><span>Information, Frequently Asked Questions, and Tips on Your CV.</span></p>
              </Col>
            </Row>
          </Container>
        </div>
      </header>
      <section className="section-wrapper">
      <div>
        <Container className="px-md-3 px-sm-0 title-wrapper">
          <h1>FAQ</h1>
        </Container>
        <Container className="px-md-3 px-sm-0 content">
          <Accordion defaultActiveKey={['0']} alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header>What is a CV?</Accordion.Header>
              <Accordion.Body>
              CV is an abbreviation of the Latin words 'curriculum vitae', which mean 'life course'.
              A professional CV provides a summary and a good overview of someone's life.<br />
              Your CV includes your education(s) and qualifications, work experience, skills, and important qualities. 
              By means of your CV, your potential employer will be able to get a good picture of your skills, work experience, 
              and knowledge quickly, to assess whether or not you fit the job, and therefore whether to offer you a job interview. 
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>What should I include in my curriculum vitae?</Accordion.Header>
              <Accordion.Body>
              Your CV should only contain information relevant to your potential employer. 
              So that means, what should be in your cv can differ per application.
              However, the bare minimum of details on your cv should at least include; 
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>What is a chronological CV, and what order should it be in?</Accordion.Header>
              <Accordion.Body>
              The most widely used CV is known as the Chronological CV. 
              This means that time-dependent components, such as education and work experience, are represented in a reverse-chronological structure. 
              Your last (most recent) job should be first (top), and your first job should be last (bottom).
              This also applies to all other experiences that you mention on your CV that took place within a certain period, 
              such as study programs, courses, internships, and ancillary activities. <br />
              The order of your CV is then as follows: personal and contact details, 
              followed by a concise personal profile about yourself. 
              Hereafter, state your training, followed by any work experience, languages, skills, characteristics, and interests. 
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header>How to make your own CV (or application letter)</Accordion.Header>
              <Accordion.Body>
              You can create a CV with your own word processing program such as Microsoft Word, and then convert it to PDF format. 
              Search the Internet for a free CV example or CV template and see if you can replicate it. 
              Or, use our where you can simply enter your data and your perfect CV will be available for download in just 15 minutes. 
              Of course, the same can be done to create an accompanying application letter, too!<br />
              When you have completed your CV and application letter, 
              you will be able to send both - along with an accompanying email - to the vacancy you wish to apply for. 
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="4">
              <Accordion.Header>Tips for creating your perfect CV</Accordion.Header>
              <Accordion.Body>
              - Only mention relevant information that will add value to the application for the vacancy you are applying for, or that will be of interest to future employers.<br />
              - Do not mention hobbies or interests that will raise awkward questions.<br />
              - State the most important information on the first page. Include a concise personal profile about yourself.<br />
              - Use bullet points and numbered lists to your advantage by making your CV transparent to recruiters.<br />
              - Always choose the chronological CV structure, unless otherwise requested in the vacancy.<br />
              - Keep an eye on our blog for more CV and job application tips!<br />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Container>
      </div>
    </section>
    </>
  )
}

export default FAQPage;