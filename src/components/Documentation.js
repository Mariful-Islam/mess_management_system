import React from "react";
import {Link} from "react-router-dom"

const Documentation = () => {
    return (
        <div style={{paddingLeft:10, paddingRight:10}} className='wrapper documentation'>
              <h3>Documentation</h3>
              <div>
                <strong>Introduction</strong>
                <p>This is a web application for managing student or people of a building. It manages payment, student entry or exit, student info query. It is not developed not only for a mess or house but also developed for more house.</p>
                <p>
                    <Link to='https://github.com/Mariful-Islam/fin-react-app' target='_blank'><svg height="20" aria-hidden="true" viewBox="0 0 16 16" version="1.1" width="20" data-view-component="true" class="octicon octicon-mark-github v-align-middle color-fg-default">
                        <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
                    </svg> Frontend</Link> <br/>
                    <Link to='https://github.com/Mariful-Islam/saaddev/tree/main/fin_api' target='_blank'><svg height="20" aria-hidden="true" viewBox="0 0 16 16" version="1.1" width="20" data-view-component="true" class="octicon octicon-mark-github v-align-middle color-fg-default">
                        <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
                    </svg>Backend</Link>

                </p>
                <strong>How can you use this web application?</strong> 
                <p className="mess_description">
                    1. First of all, goto sign up tab and create a account using username, email and password. <br/>
                    2. Then go to profile and create student account using associate mess, room number, nid, phone number, email, department, district and division. <br/>
                    3. After goto home and you can see all students are shown according to room number. In student tab all student's information are shown and you can search through student name. <br/>
                    4. In payment tab you can pay monthly bill by select month,  inter amount and press pay. Then the mess or house manager will get the payment invoice. When he confirm your invoice then you will get confirm email.<br/>
                    5. The manager can see total payment, due amount, paid amount, due amount number, paid amount number. He can download all data as a csv file. He can see payment info by month and year. <br/>
                    6. Student can also see his or her payment info. <br/>
                    7. A house owner can create a new mess or house by pressing new mess setup and fill up the info such as mess name, location, admin username, email and passoword then press setup. <br/>
                </p>    
              </div>
          </div>
    )
}

export default Documentation