import React, { useState } from "react";

// layout for page

import Auth from "layouts/Auth.js";

export default function Register() {
  const [schoolName, setSchoolName] = useState('')
  const [schoolResult, setSchoolResult] = useState([])
  const [schoolResultError, setSchoolResultError] = useState('')
  const [selectSchool, setSelectSchool] = useState([])
  const fetchSchoolInfo = async () => {
    const response = await fetch(process.env.NEXT_PUBLIC_NEIS_API + `${schoolName}`)
    const data = await response.json()
    if (data.RESULT) {
      setSchoolResultError('')
      setSchoolResult([])
      setSelectSchool([])
      setSchoolResultError(data.RESULT.MESSAGE)
    } else {
      setSchoolResultError('')
      setSchoolResult([])
      setSelectSchool([])
      setSchoolResult(data.schoolInfo[1].row)
    }
    
  }

  const submitSchoolInfo = async (event) => {
    event.preventDefault()
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_SCHOOLERP_API + 'auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        schoolId: event.target.schoolId.value,
        password: event.target.password.value,
        email: event.target.email.value,
        schoolName: event.target.schoolName.value,
        standardCode: event.target.standardCode.value
      })
      })
      const data = await response.json()
      console.log(data);
      if (data.code === 400) {
            setSchoolResultError(data.message)
          }
    } catch (error) {
      setSchoolResultError("서버 에러")
    }
    
    
    

  }
  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-blueGray-500 text-sm font-bold">
                    Sign up
                  </h6>
                </div>
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <form onSubmit={submitSchoolInfo}>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      ID
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="ID"
                      id="schoolId"
                      name="schoolId"
                      required
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                      id="password"
                      name="password"
                      required
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Email"
                      id="email"
                      name="email"
                      required
                    />
                  </div>
                  
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      신청학교명 검색
                    </label>
                      <input
                      type="text"
                      value={schoolName}
                      onChange={e => setSchoolName(e.target.value)}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="신청학교명"
                      required
                      />    
                  </div>

                  <div className="text-center mb-3">
                    <button
                      className="bg-red-400 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="button"
                      onClick={fetchSchoolInfo}
                    >
                      검색
                    </button>
                  </div>
                  <div>
                    {schoolResultError}
                  </div>

                  <div>
                    {schoolResult.map(result => {
                      return (
                        <div key={result.SD_SCHUL_CODE}>
                          <button
                            className="bg-red-400 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                            type="button"
                            value={[result.SCHUL_NM, result.SD_SCHUL_CODE]}
                            onClick={e => {
                              setSelectSchool(e.target.value)
                              setSchoolResult([])
                            }}
                          >
                            {result.SCHUL_NM} - {result.JU_ORG_NM} - {result.SD_SCHUL_CODE}
                          </button>
                        </div>
                      )
                    })}
                  </div>
                  <div>
                    <br />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      학교명(위에서 학교명을 검색하여 선택하면 자동으로 입력됩니다.)
                    </label>
                    <input
                      type="text"
                      value={selectSchool.slice(0, -8)}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="학교명"
                      disabled
                      id="schoolName"
                      name="schoolName"
                      required
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      표준번호(위에서 학교명을 검색하여 선택하면 자동으로 입력됩니다.)
                    </label>
                    <input
                      type="text"
                      value={selectSchool.slice(-7)}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="표준번호"
                      disabled
                      id="standardCode"
                      name="standardCode"
                      required
                    />
                  </div>

                  <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <span className="ml-2 text-sm font-semibold text-blueGray-600">
                        * 해당 사이트는 이메일 외 다른 개인정보를 저장하지 않습니다.
                      </span>
                    </label>
                  </div>

                  <div className="text-center mt-6">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="submit"
                    >
                      Create Account(회원가입)
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Register.layout = Auth;
