import React from "react";

const Documentation = () => {
    return (
        <div className='wrapper'>
              <h3>Documentation</h3>
              <h4>Student Status Sign</h4>
              <div style={{display:"flex", flexDirection:"column", gap:10}}>
                  <div style={{display:"flex", alignItems:"center", gap:10}}>
                      <div className='active_student'></div> বর্তমান ছাত্র
                  </div>
                  <div style={{display:"flex", alignItems:"center", gap:10}}>
                      <div className='leaving_student'></div> ১ মাসের মধ্যে মেস ছেড়ে দেবে এমন ছাত্র
                  </div>
                  <div style={{display:"flex", alignItems:"center", gap:10}}>
                      <div className='exit_student'></div> পূর্বে মেসে থাকতো এমন ছাত্র
                  </div>
              </div>
              <div>
                  <h4>Payment Sign</h4>
                  <div style={{display:"flex", alignItems:"center", gap:10}}>
                      <svg className="icon icon-tabler icon-tabler-check" width="24"
                               height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                               stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M5 12l5 5l10 -10"/>
                      </svg>
                      <p>Paid</p>

                  </div>
                  <div style={{display:"flex", alignItems:"center", gap:10}}>
                      <svg version="1.1" id="Layer_1" x="0px" y="0px" width="64px" height="64px" viewBox="0 0 64 64" >
                                <g>
                                    <line fill="white" color='white' stroke="white" stroke-width="5" stroke-miterlimit="10" x1="18.947" y1="17.153" x2="45.045" y2="43.056"/>
                                </g>
                                <g>
                                    <line fill="white" stroke="white" stroke-width="5" stroke-miterlimit="10" x1="19.045" y1="43.153" x2="44.947" y2="17.056"/>
                                </g>
                                <g>
                                    <circle fill="none" stroke="red" stroke-width="5" stroke-miterlimit="10" cx="32" cy="32" r="30.999"/>
                                </g>
                      </svg>
                      <p>Unpaid</p>
                  </div>
              </div>
          </div>
    )
}

export default Documentation