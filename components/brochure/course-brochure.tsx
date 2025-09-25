import React, { useEffect } from "react";

interface CourseBrochureProps {
  course: Course;
  timing: Timing;
  formatDate: (date: string) => string;
}

export default function CourseBrochure({ 
  course, 
  timing, 
  formatDate 
}: CourseBrochureProps) {
  // Function to style headings with specific classes
  useEffect(() => {
    const styleHeadings = () => {
      const brochureContent = document.querySelector('.brochure-content');
      if (brochureContent) {
        const strongElements = brochureContent.querySelectorAll('p strong:only-child');
        
        // Define main headings that should get primary styling
        const mainHeadings = [
          'Course Overview',
          'Course Benefits', 
          'Course Objectives',
          'Training Methodology',
          'Target Audience',
          'Target Competencies',
          'Course Outline',
          'Why Attend'
        ];
        
        strongElements.forEach(strong => {
          const text = strong.textContent?.trim() || '';
          
          // Check if it's a Unit heading
          if (text.startsWith('Unit ')) {
            strong.classList.add('unit-heading');
          }
          // Check if it's NOT one of the main headings, make it secondary
          else if (!mainHeadings.includes(text)) {
            strong.classList.add('secondary-heading');
          }
          // Main headings keep the default primary styling
        });
      }
    };

    styleHeadings();
  }, [course.content]);

  return (
    <>
      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: var(--font-inter), "Inter", sans-serif !important;
        }

        body {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: var(--font-inter), "Inter", sans-serif !important;
        }
        
        .margin-inline {
          margin-inline: 24px;
        }
        
        .brochure {
          width: 100%;
          background: white;
          position: relative;
          overflow-x: hidden;
          display: flex;
          flex-direction: column;
          min-height: 100%;
        }
        
        .brochure h2 {
          font-size: 16px;
        }
        
        .content-top {
          display: flex;
          flex-direction: column;
        }
        
        .brochure-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 2px solid #3e5ec0;
          position: relative;
          padding: 0 0 15px 0;
        }

        .brochure-top::after {
          content: "";
          position: absolute;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: #3e5ec0;
          left: 0;
          bottom: -7px;
          z-index: 100;
        }
        
        .header {
          height: 600px;
          position: relative;
        }
        
        .header-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          object-fit: cover;
        }
        
        .header .content {
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          height: 100%;
          text-align: left;
          position: relative;
          z-index: 3;
          padding: 40px;
        }

        .header .content h1 {
          font-size: 60px;
          font-weight: 700;
          margin-bottom: 30px;
          line-height: 72px;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          color: #3e5ec0;
        }

        .provider-info {
          text-align: left;
          font-size: 14px;
        }

        .provider-info p {
          margin: 0;
          font-weight: 500;
        }

        .course-category {
          display: flex;
          align-items: center;
          gap: 10px;
          margin: 20px;
          font-size: 18px;
          font-weight: 500;
          opacity: 0.9;
        }

        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        
        .contact-info a {
          color: #000;
          text-decoration: none;
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .contact-info img {
          width: 24px;
          margin-top: 8px;
        }

        .contact-info h3 {
          font-size: 28px !important;
          font-weight: 600;
        }

        .company-info h2 {
          margin: 0;
          font-size: 18px;
          font-weight: 700;
          color: #2c5aa0;
        }

        .company-info p {
          margin: 5px 0 0 0;
          font-size: 12px;
          color: #666;
        }

        .brochure-content {
          flex: 1;
          margin-block: 32px;
          line-height: 1.8 !important;
          color: #333 !important;
          font-size: 16px !important;
          max-width: none !important;
        }

        .brochure-content h3 {
          color: #3e5ec0;
          font-size: 16px;
        }

        .brochure-content p {
          font-size: 16px !important;
          margin-bottom: 16px !important;
        }

        .brochure-content p:last-child {
          margin-bottom: 0 !important;
        }

        .brochure-content strong {
          color: #2c3e50 !important;
          font-weight: 600 !important;
          font-size: 18px !important;
        }

        /* Main section headings */
        .brochure-content p strong:only-child {
          display: block !important;
          margin: 32px 0 20px 0 !important;
          font-size: 22px !important;
          color: #3E5EC0 !important;
          padding-bottom: 0 !important;
          border-bottom: none !important;
          position: relative !important;
          text-align: left !important;
        }

        .brochure-content p strong:only-child::after {
          content: '' !important;
          position: absolute !important;
          bottom: -2px !important;
          left: 0 !important;
          width: 60px !important;
          height: 3px !important;
          background: #20b486 !important;
          border-radius: 2px !important;
        }

        /* Unit headings */
        .brochure-content .unit-heading {
          font-size: 18px !important;
          margin: 24px 0 12px 0 !important;
          background: #f7fafc !important;
          color: #2d3748 !important;
          padding: 12px 16px !important;
          border-radius: 0 8px 8px 0 !important;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05) !important;
          position: relative !important;
        }

        .brochure-content .unit-heading::after {
          display: none !important;
        }

        /* Secondary headings */
        .brochure-content .secondary-heading {
          font-size: 16px !important;
          margin: 20px 0 12px 0 !important;
          color: #333 !important;
          background: none !important;
          display: inline !important;
          font-weight: 600 !important;
        }

        .brochure-content .secondary-heading::after {
          display: none !important;
        }

        .course-details {
          margin-block: 70px;
          position: relative;
          page-break-after: always;
        }
        
        .course-details .bg {
          position: absolute;
          right: 0;
          top: 0;
          height: 100%;
        }
        
        .course-details-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 2px solid #3e5ec0;
          position: relative;
          gap: 20px;
          padding-bottom: 15px;
          margin-bottom: 40px;
          margin-top:290px
        }
        
        .course-details-header::after {
          content: "";
          position: absolute;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: #3e5ec0;
          left: 0;
          bottom: -7px;
        }
        
        .course-details-header h4 {
          color: #3e5ec0;
        }
        
        .course-details-header p {
          font-size: 10px;
        }
        
        
        h3 {
          margin-block: 16px;
          font-size: 28px !important;
        }
        
        .course-details {
          page-break-before: always;
          margin-top: 0;  
        }
        
        .brochure-content ul {
          margin: 16px 0 !important;
          padding-left: 16px !important;
        }

        .brochure-content ul:last-of-type {
          margin-bottom: 70px !important;
        }

        .brochure-content li {
          list-style: none !important;
          position: relative !important;
          padding-left: 24px !important;
          line-height: 1.6 !important;
        }

        .brochure-content li:before {
          content: "✓" !important;
          position: absolute !important;
          left: 0 !important;
          top: 0 !important;
          color: #10b981 !important;
          font-weight: bold !important;
          font-size: 14px !important;
        }

        .brochure-content li p {
          margin: 0 !important;
          display: inline !important;
        }
        
        .full-page-svg {
          display: block;
          width: 100%;
          page-break-before: always;
        }
        
        .course-details-box {
          padding: 40px 40px 0 0;
          left: 10%;
          position: relative;
        }
        
        .course-details-bg {
          position: absolute;
          margin-top: 5px;
          margin-left: 10px;
          left: 40px;
          height: 100%;
          object-fit: contain;
        }
        
        .course-details-title {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 22px;
          color: #0088ff;
          font-weight: 600;
          z-index: 12;
        }
        
        .course-details-title .icon {
          margin-top: 2px;
          margin-right: 10px;
        }
        
        .detail-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 18px;
          color: #6a6a6a;
          font-weight: 600;
          width: 280px;
        }
        
        .info-box .row {
          display: flex;
          align-items: center;
          gap: 50px;
          margin-top: 18px;
          z-index: 12;
        }
      `}</style>
      
      <div className="brochure" id="brochure-file">
        <div>
          <div className="brochure-top margin-inline">
            <img src="/assets/brochure/provided-by.svg" alt="Provided by" />
            <div className="contact-info">
              <a href="mailto:info@euroqst.com">
                <span>
                  <img src="/assets/brochure/mail.svg" alt="Email" />
                </span>
                info@euroqst.com
              </a>
              <a href="tel:+421911803183">
                <span>
                  <img src="/assets/brochure/call.svg" alt="Phone" />
                </span>
                +421 911 803 183
              </a>
            </div>
          </div>
          
          <div className="header">
            <img
              src="/assets/brochure/cover-bg.svg"
              alt="Header background"
              className="header-bg"
            />
            <div className="content">
              <div className="course-category">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#3E5EC0" viewBox="0 0 576 512" style={{marginRight: '10px'}}>
                  <path d="M542.2 32H119.9C99.1 32 80 46.7 80 64v384c0 17.3 19.1 32 39.9 32H542.2c20.8 0 39.9-14.7 39.9-32V64c0-17.3-19.1-32-39.9-32zM528 432H151.9V80H528v352zM128 432H48c-26.5 0-48-21.5-48-48V64c0-26.5 21.5-48 48-48h80v416z"/>
                </svg>
                <span>{course.category?.title || 'Training Course'}</span>
              </div>
              <h1>{course.title}</h1>
            </div>
          </div>
          
          <div className="course-details-box">
            <div className="course-details-title">
              <span className="icon" style={{display: 'inline-block', marginRight: '10px'}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#0088FF" viewBox="0 0 16 16">
                  <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0z"/>
                  <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 .875-.252.988-.598l.088-.416c.07-.323.177-.426.466-.466l.451-.083-.082-.38-1.29-.287zM8 4.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"/>
                </svg>
              </span>
              COURSE DETAILS :
            </div>

            <div className="info-box">
              <div className="row">
                <div className="detail-item">
                  <span className="icon">
                    <img src="/assets/brochure/icon3.svg" alt="Start Date" />
                  </span>
                  <span className="label">START DATE :</span>
                  <span>{formatDate(timing.start_date)}</span>
                </div>

                <div className="detail-item">
                  <span className="icon">
                    <img src="/assets/brochure/icon3.svg" alt="End Date" />
                  </span>
                  <span className="label">END DATE :</span>
                  <span>{formatDate(timing.end_date)}</span>
                </div>
              </div>

              <div className="row">
                <div className="detail-item">
                  <span className="icon">
                    <img src="/assets/brochure/icon4.svg" alt="City" />
                  </span>
                  <span className="label">CITY :</span>
                  <span>{timing.city.title}</span>
                </div>

                <div className="detail-item">
                  <span className="icon">
                    <img src="/assets/brochure/icon5.svg" alt="Fees" />
                  </span>
                  <span className="label">FEES :</span>
                  <span>{timing.fees} €</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="course-details margin-inline">
            <div className="course-details-header">
              <img src="/assets/brochure/provided-by.svg" alt="Provided by" />
              <div>
                <h4>Discover more Courses</h4>
                <p><b>website</b>: euroqst.com</p>
              </div>
            </div>
            <div className="brochure-content group-1">
              <div dangerouslySetInnerHTML={{ __html: course.content || '' }} />
            </div>
          </div>
        </div>
        
        <img
          src="/assets/brochure/a3.svg"
          alt="A4 background"
          className="full-page-svg"
        />
      </div>
    </>
  );
}