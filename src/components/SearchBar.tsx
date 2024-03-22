import { useAutocomplete } from '@mui/base/useAutocomplete';
import CheckIcon from '@mui/icons-material/Check';
import { styled } from '@mui/material/styles';
import { autocompleteClasses } from '@mui/material/Autocomplete';
import SearchIcon from '@mui/icons-material/Search';

const Root = styled('div')(
  ({ theme }) => `
  color: ${
    theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,.85)'
  };
  font-size: 14px;
`,
);


const InputWrapper = styled('div')(
  ({ theme }) => `
  width: 300px;
  border: 1px solid #1c663f;
  background-color: #1c663f;
  border-radius: 4px;
  padding: 1px;
  display: flex;
  flex-wrap: wrap;

  &:hover {
    border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#1c663f'};
  }

  &.focused {
    border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#1c663f'};
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }

  & input {
    background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
    color: ${
      theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,.85)'
    };
    height: 30px;
    box-sizing: border-box;
    padding: 4px 6px;
    width: 0;
    min-width: 30px;
    flex-grow: 1;
    border: 0;
    margin: 0;
    outline: 0;
  }
`,
);




const Listbox = styled('ul')(
  ({ theme }) => `
  width: 300px;
  margin: 2px 0 0;
  padding: 0;
  position: absolute;
  list-style: none;
  background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
  overflow: auto;
  max-height: 250px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1;

  & li {
    padding: 5px 12px;
    display: flex;

    & span {
      flex-grow: 1;
    }

    & svg {
      color: transparent;
    }
  }

  & li[aria-selected='true'] {
    background-color: ${theme.palette.mode === 'dark' ? '#2b2b2b' : '#fafafa'};
    font-weight: 600;

    & svg {
      color: #1890ff;
    }
  }

  & li.${autocompleteClasses.focused} {
    background-color: ${theme.palette.mode === 'dark' ? '#003b57' : '#e6f7ff'};
    cursor: pointer;

    & svg {
      color: currentColor;
    }
  }
`,
);

export default function CustomizedHook() {
  const {
    getRootProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    focused,
    setAnchorEl,
  } = useAutocomplete({
    id: 'customized-hook-demo',
    defaultValue: [top100Films[1]],
    multiple: true,
    options: top100Films,
    getOptionLabel: (option) => option.PracticeArea,
  });

  return (
    <Root>
      <div {...getRootProps()} style={{position:'relative'}}>
        <InputWrapper ref={setAnchorEl} className={focused ? 'focused' : ''}>
                    <SearchIcon sx={{
            paddingTop:'10px',
            position:'absolute',
            top:'-5px',
            right:'10px',
            color:'white'
          }}></SearchIcon>

          <span> 

          </span>
          <input {...getInputProps()} placeholder='Keyword Search' style={{
            background:'black'
          }}   />



        </InputWrapper>
      </div>
      {groupedOptions.length > 0 ? (
        <Listbox {...getListboxProps()}>
          {(groupedOptions as typeof top100Films).map((option, index) => (
            <li {...getOptionProps({ option, index })}>
              <span>{option.City}</span>
              <CheckIcon fontSize="small" />
            </li>
          ))}
        </Listbox>
      ) : null}
    </Root>
  );
}


// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
    {
      JobID: 123456,
      "Firm ID": "",
      "Firm": "Greenberg Traurig LLP",
      City: "Miami",
      State: "Florida",
      "JobPracticeArea": "ASSOCIATE",
      PracticeArea: "CORPORATE",
      "Cases": "MERGERS & ACQUISITIONS, PRIVATE EQUITY, CORPORATE GOVERNANCE",
      "JobPostPracticeArea": "CORPORATE M&A - ASSOCIATE (MID-LEVEL) - MIA",
      "JobDescription": "Greenberg Traurig has an excellent opportunity for an M&A Associate to join the Corporate Practice of our Miami office. We offer competitive compensation and an excellent benefits package. The ideal candidate will have a minimum of four States of significant experience in corporate transactions with an emphasis on public and private M&A, including private equity. Candidates must have a strong working knowledge of acquisition agreements and the other documentation used in complex M&A and private equity transactions and proficiency in drafting the same. This position requires a candidate with strong interpersonal skills, a high degree of maturity, and a proven willingness to accept significant responsibility and manage a challenging workload within a fast-paced environment. Strong academic credentials and writing skills are essential. Additional requirements: Well-versed in the mechanics of leading an M&A transaction from inception to closing; experience leading due diligence teams; general corporate and corporate governance experience; ability to work effectively as part of a team across practice areas and a willingness to train junior associates. Candidates must be admitted to the Florida Bar or eligible for admission to the Florida Bar. For consideration, please submit your resume and official transcript(s). *Submissions from search firms will only be accepted through our web portal for third-party submissions; for access, contact Samira Jacobson. Greenberg Traurig is committed to having a diverse and inclusive workforce.  Individuals seeking employment at Greenberg Traurig are considered without regards to race, color, religion, sex, sexual orientation, gender identification, national origin, age, marital status, ancestry, physical or mental disability, veteran status, or genetic information, among other protected bases. To that end, GT, a Mansfield Rule 4.0 Certified firm, continues with its current participation in Diversity Lab’s Mansfield Rule 5.0 initiative, which measures and seeks to increase diversity within law firms. Providing your data during the application process helps us with achieving that goal and with meeting reporting/record-keeping obligations under federal and state law and other legal requirements. Providing your data is entirely voluntary and will not be considered in the hiring process or thereafter. Any information that you do provide will be treated confidentially.",
      "Minimum JD State": 2020,
      "Maximum JD State": "",
      "Min Salary": 205000,
      "Max Salary": 305000,
      "Contact Info": "",
      "Date Updated": "2024-02-03T00:37:55.000Z",
      "Firm Size": ""
    },
    {
      JobID: 638290,
      "Firm ID": "",
      "Firm": "Greenberg Traurig LLP",
      City: "Miami",
      State: "Florida",
      "JobPracticeArea": "ASSOCIATE",
      PracticeArea: "LITIGATION",
      "Cases": "ARBITRATION, INTERNATIONAL",
      "JobPostPracticeArea": "COMMERCIAL LITIGATION TRIAL ASSOCIATE (JUNIOR TO MID-LEVEL) - MIAMI",
      "JobDescription": "Greenberg Traurig has an exciting opportunity for two junior to mid level Associates to join the Trial and Litigation Practice of our Miami office. We offer highly competitive compensation and an excellent benefits package. Job Requirements The ideal candidate will have a minimum of three States of experience in commercial litigation and/or arbitration, including experience with trials and/or final hearings. Excellent academic credentials and strong research, writing, oral advocacy, and discovery skills are essential. Ideal candidates will be self-starters inclined toward sophisticated casework and creative strategies. Candidates should have been ranked in the top of their law school class or have graduated from a top-tier law school. Federal clerkship experience and an interest in international disputes are a plus, but not required. Fluency in Spanish preferred. Florida Bar preferred. For consideration, please submit a resume, official transcript(s), and one or two writing samples all in PDF format. *Submissions from search firms will only be accepted through our web portal for third party submissions; for access, contact Samira Jacobson. Greenberg Traurig is committed to diversity and inclusion in the workplace. Individuals seeking employment at Greenberg Traurig are considered without regards to race, color, religion, sex, sexual orientation, gender identification, national origin, age, marital status, ancestry, disability, veteran status, or genetic information, among other protected bases. In support of our unwavering dedication to putting diversity, equity, and inclusion into action, GT participates in the Mansfield Rule Certification Program. This Program, which is administered by The Diversity Lab, aims to increase diverse representation in the legal industry. In July 2020, we achieved Mansfield Rule 3.0 Certification. A State later, in 2021, we achieved Mansfield 4.0 Certification Plus, meaning we went beyond the requirements of the original Mansfield program. Most recently, in 2022, GT gained Mansfield Rule 5.0 Certification Plus – again achieving the highest level of certification a law firm can obtain. GT is currently participating in the Mansfield Rule 6.0 Certification Program. Providing your data during the application process helps us with achieving our goals and with meeting reporting/record-keeping obligations under federal and state law and other legal requirements. Providing your data is entirely voluntary and will not be considered in the hiring process or thereafter. Any information that you do provide will be treated confidentially.",
      "Minimum JD State": 2021,
      "Maximum JD State": 2017,
      "Min Salary": "",
      "Max Salary": "",
      "Contact Info": "",
      "Date Updated": "2022-07-12T01:52:23.000Z",
      "Firm Size": ""
    },
    {
      JobID: 433055,
      "Firm ID": "",
      "Firm": "Greenberg Traurig LLP",
      City: "Miami",
      State: "Florida",
      "JobPracticeArea": "ASSOCIATE",
      PracticeArea: "CORPORATE",
      "Cases": "MERGERS & ACQUISITIONS, CAPITAL MARKETS, CORPORATE GOVERNANCE",
      "JobPostPracticeArea": "CORPORATE CAPITAL MARKETS - ASSOCIATE (MID-LEVEL) - MIA",
      "JobDescription": "Greenberg Traurig has an excellent opportunity for a Capital Markets associate. We offer competitive compensation and an excellent benefits package. Practice Summary Greenberg Traurig’s global Capital Markets Practice is recognized for its skill in handling U.S. and cross-border transactions, including initial public offerings, high yield, and investment-grade debt offerings, Rule 144A and Regulation S offerings for foreign private issuers, registered direct offerings, at-the-market offerings (ATMs), public and private equity line transactions, Special Purpose Acquisition Companies (SPACs), Real Estate Investment Trusts (REITs), and Private Investment in Public Entities (PIPEs). We represent U.S. and non-U.S. public and private issuers, as well as underwriters, financial institutions, venture capital funds, hedge funds, broker-dealers, investment companies, and private investment firms in all aspects of U.S. and cross-border securities offerings. Job Requirements The ideal candidate will have 2-6 States of significant experience in corporate transactions, with an emphasis on Capital Markets.  This position requires a candidate with strong interpersonal skills, a high degree of maturity, and a proven willingness to accept significant responsibility and manage a challenging workload within a fast-paced environment. Strong academic credentials and writing skills are essential. Additional requirements: Well-versed in the mechanics of leading Capital Market transactions; experience leading due diligence teams; general corporate and corporate governance experience; ability to work effectively as part of a team across practice areas and a willingness to train junior associates. Candidates must be admitted to the Florida Bar or eligible for admission to the Florida Bar. Submit a brief cover letter, resume, official JD transcript, and deal sheet, all in PDF format. Submissions from search firms will only be accepted through our web portal for third-party submissions; for access, contact Samira Jacobson. Greenberg Traurig is committed to diversity and inclusion in the workplace. Individuals seeking employment at Greenberg Traurig are considered without regards to race, color, religion, sex, sexual orientation, gender identification, national origin, age, marital status, ancestry, disability, veteran status, or genetic information, among other protected bases. In support of our commitment to a diverse and inclusive workplace, GT participates in the Mansfield Rule Certification Program. The program, which is administered by The Diversity Lab, seeks to increase diversity representation in the legal profession and within law firm leadership roles. In 2019, GT achieved Mansfield 3.0 Certification, and in 2020, we achieved an even higher standard: Mansfield 4.0 Certification Plus. GT is currently participating in the Mansfield Rule 5.0 Certification Program. Providing your data during the application process helps us with achieving that goal and with meeting reporting/record-keeping obligations under federal and state law and other legal requirements. Providing your data is entirely voluntary and will not be considered in the hiring process or thereafter. Any information that you do provide will be treated confidentially.",
      "Minimum JD State": 2020,
      "Maximum JD State": 2018,
      "Min Salary": "",
      "Max Salary": "",
      "Contact Info": "",
      "Date Updated": "2021-12-01T01:21:05.000Z",
      "Firm Size": ""
    },
    {
      JobID: 456825,
      "Firm ID": "",
      "Firm": "Greenberg Traurig LLP",
      City: "Tampa",
      State: "Florida",
      "JobPracticeArea": "ASSOCIATE",
      PracticeArea: "CORPORATE",
      "Cases": "MERGERS & ACQUISITIONS",
      "JobPostPracticeArea": "CORPORATE MID-LEVEL ASSOCIATE - TPA",
      "JobDescription": "The Tampa office has a current opening for a mid-level corporate associate with a minimum of 3 States of experience.  This is a rare opportunity to join an excellent corporate practice at a major international law firm while enjoying the quality of life that working in a smaller office (≈ 25 lawyers) and living in the Tampa Bay Area provides.  Tampa Bay, home of both the Stanley Cup Champion Lightning and the Superbowl Champion Buccaneers, has been named the No. 1 city in Florida and No. 22 nationally in a recent annual ranking of best cities.  The Legal 500 2021 U.S. Guide lists 15 GT Tampa practice areas and recognizes seven attorneys, including a “Leading Lawyer,” one of only four nationally in his practice area.  Candidates must have strong academic records, demonstrate excellent communication skills, be willing to assume significant responsibilities, and have the desire and ability to work in a fast-paced environment. General corporate experience is essential.  We prefer candidates who have experience with technology companies and a strong transactional background. All candidates must be members of The Florida Bar or qualified for membership and willing to take the February 2022 bar examination.  Interested candidates should submit their resume and J.D. transcript online through the GT website.  Transcripts do not need to be official copies To that end, GT, a Mansfield Rule 3.0 Certified firm, continues with its current participation in Diversity Lab’s Mansfield Rule 4.0 initiative, which measures and seeks to increase diversity within law firms. Providing your data during the application process helps us with achieving that goal and with meeting reporting/record-keeping obligations under federal and state law and other legal requirements. Providing your data is entirely voluntary and will not be considered in the hiring process or thereafter. Any information that you do provide will be treated confidentially. #LI-Onsite",
      "Minimum JD State": 2021,
      "Maximum JD State": 2018,
      "Min Salary": "",
      "Max Salary": "",
      "Contact Info": "",
      "Date Updated": "2022-10-20T02:36:32.000Z",
      "Firm Size": ""
    },
    {
      JobID: 481501,
      "Firm ID": "",
      "Firm": "Greenberg Traurig LLP",
      City: "Orlando",
      State: "Florida",
      "JobPracticeArea": "ASSOCIATE",
      PracticeArea: "CORPORATE",
      "Cases": "PUBLIC FINANCE, FINANCE, SECURITIES",
      "JobPostPracticeArea": "PUBLIC FINANCE - MID-LEVEL ASSOCIATE",
      "JobDescription": "The Orlando office is looking for a Public Finance Associate with three to five States of experience.  Ideal candidates should have experience in municipal finance, tax and securities law and have worked with governments as well as underwriters and banks on municipal finance transactions or equivalent experience.  Candidates should possess excellent academic credentials, strong oral and written communication skills, meaningful professional experience, and the ability and desire to assume significant responsibility in a fast paced environment.  Interested candidates should submit their resume, cover letter and J.D. transcript online through the GT website. Transcripts do not need to be official copies.  Greenberg Traurig is committed to diversity and inclusion in the workplace. Individuals seeking employment at Greenberg Traurig are considered without regards to race, color, religion, sex, sexual orientation, gender identification, national origin, age, marital status, ancestry, physical or mental disability, veteran status, or genetic information, among other protected bases. To that end, GT, a Mansfield Rule 3.0 Certified firm, continues with its current participation in Diversity Lab’s Mansfield Rule 4.0 initiative, which measures and seeks to increase diversity within law firms. Providing your data during the application process helps us with achieving that goal and with meeting reporting/record-keeping obligations under federal and state law and other legal requirements. Providing your data is entirely voluntary and will not be considered in the hiring process or thereafter. Any information that you do provide will be treated confidentially. #LI-Onsite",
      "Minimum JD State": 2020,
      "Maximum JD State": "",
      "Min Salary": "",
      "Max Salary": "",
      "Contact Info": "",
      "Date Updated": "2023-01-04T19:36:37.000Z",
      "Firm Size": ""
    },
    {
      JobID: 173713,
      "Firm ID": "",
      "Firm": "Greenberg Traurig LLP",
      City: "Fort Lauderdale",
      State: "Florida",
      "JobPracticeArea": "ASSOCIATE",
      PracticeArea: "CORPORATE",
      "Cases": "MERGERS & ACQUISITIONS, PRIVATE EQUITY",
      "JobPostPracticeArea": "ASSOCIATE - MID-LEVEL CORPORATE M&A",
      "JobDescription": "The Fort Lauderdale office Corporate Group is seeking a mid-level associate with a minimum of three (3) States of experience in M&A.  The Fort Lauderdale Corporate Group is a nationally recognized practice with clients all over the United States as well as internationally.  The work is sophisticated, and associates are exposed to client interaction as well as given responsibilities early on.  Candidates should have solid hands-on M&A experience with private equity experience a plus.  In addition, candidates should possess strong academics, excellent communication skills, willing to take the lead, and willing to work the hours of a high paced busy practice.  Interested candidates should submit their resume and J.D. transcript online through the GT website.  Transcripts do not need to be official copies. Greenberg Traurig is committed to diversity and inclusion in the workplace. Individuals seeking employment at Greenberg Traurig are considered without regards to race, color, religion, sex, sexual orientation, gender identification, national origin, age, marital status, ancestry, disability, veteran status, or genetic information, among other protected bases. In support of our unwavering dedication to putting diversity, equity, and inclusion into action, GT participates in the Mansfield Rule Certification Program. This Program, which is administered by The Diversity Lab, aims to increase diverse representation in the legal industry. In July 2020, we achieved Mansfield Rule 3.0 Certification. A State later, in 2021, we achieved Mansfield 4.0 Certification Plus, meaning we went beyond the requirements of the original Mansfield program. Most recently, in 2022, GT gained Mansfield Rule 5.0 Certification Plus – again achieving the highest level of certification a law firm can obtain. GT is currently participating in the Mansfield Rule 6.0 Certification Program. Providing your data during the application process helps us with achieving our goals and with meeting reporting/record-keeping obligations under federal and state law and other legal requirements. Providing your data is entirely voluntary and will not be considered in the hiring process or thereafter. Any information that you do provide will be treated confidentially. #LI-Onsite",
      "Minimum JD State": 2021,
      "Maximum JD State": 2017,
      "Min Salary": "",
      "Max Salary": "",
      "Contact Info": "",
      "Date Updated": "2022-04-20T00:24:24.000Z",
      "Firm Size": ""
    },
    {
      JobID: 295213,
      "Firm ID": "",
      "Firm": "Greenberg Traurig LLP",
      City: "Fort Lauderdale",
      State: "Florida",
      "JobPracticeArea": "ASSOCIATE",
      PracticeArea: "INSURANCE",
      "Cases": "TRANSACTIONAL, REGULATORY",
      "JobPostPracticeArea": "ASSOCIATE - SENIOR INSURANCE REGULATORY",
      "JobDescription": "The Fort Lauderdale Insurance Regulatory and Transactions Practice Group is looking for a mid-level to senior associate.  Preferred candidates should have a transactional background, experience in the insurance regulatory environment and a background/interest in sophisticated legal, regulatory and transactional matters.  In addition, candidates should possess strong academics.  Interested candidates should submit their resume and J.D. transcript online through our website.  Transcripts do not need to be official copies. Greenberg Traurig is committed to having a diverse and inclusive workforce.  Individuals seeking employment at Greenberg Traurig are considered without regards to race, color, religion, sex, sexual orientation, gender identification, national origin, age, marital status, ancestry, physical or mental disability, veteran status, or genetic information, among other protected bases. To that end, GT is voluntarily participating in Diversity Lab’s Mansfield Rule 3.0 initiative, which measures and seeks to increase diversity within law firms.  Providing your data during the application process helps us with achieving that goal and with meeting reporting/recordkeeping obligations under federal and state law and other legal requirements.  Providing your data is entirely voluntary and will not be considered in the hiring process or thereafter.  Any information that you do provide will be treated confidentially. #LI-Onsite",
      "Minimum JD State": 2021,
      "Maximum JD State": "",
      "Min Salary": "",
      "Max Salary": "",
      "Contact Info": "",
      "Date Updated": "2023-09-28T21:38:46.000Z",
      "Firm Size": ""
    }
  ]