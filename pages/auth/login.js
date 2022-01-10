import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/router';
import cookies from 'nookies';

// layout for page

import Auth from "layouts/Auth.js";

export default function Login() {
  const initialState = {
    schoolId: '',
    password: ''
  }

  const [signinInfo, setSigninInfo] = useState(initialState)
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect((context) => {
    if (cookies.get(context).token) {
      router.push('/')
    }
  })


  const handleSubmit = async (event) => {
		event.preventDefault()

		const { schoolId, password } = signinInfo

		if (!schoolId || !password) {
			return
		}


      const response = await fetch(process.env.NEXT_PUBLIC_SCHOOLERP_API + 'auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          schoolId: signinInfo.schoolId,
          password: signinInfo.password,
        })
      })
      const data = await response.json()
      console.log(data)
      if (data.code === 401) {
          setError(data.message)
        }
      cookies.set(null, 'token', data.tokens.access.token, { path: '/' })
      const { plannedRoute } = cookies.get()
      console.log(cookies.get());
			const parsedPlannedRoute = plannedRoute && JSON.parse(plannedRoute)

			const plannedHrefRoute = parsedPlannedRoute
				? parsedPlannedRoute.href
				: '/admin/dashboard'
			const plannedAsRoute = parsedPlannedRoute ? parsedPlannedRoute.as : '/admin/dashboard'

			router.replace(plannedHrefRoute, plannedAsRoute);
	};

	const handleInputChange = event => {
		const { name, value } = event.target;
		setSigninInfo({
			...signinInfo,
			[name]: value
		});
	};

  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-blueGray-500 text-sm font-bold">
                    Sign in
                  </h6>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <form onSubmit={handleSubmit}>
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
                      value={signinInfo.schoolId}
                      onChange={handleInputChange}
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
                      value={signinInfo.password}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  {/* <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                      />
                      <span className="ml-2 text-sm font-semibold text-blueGray-600">
                        Remember me
                      </span>
                    </label>
                  </div> */}

                  <div className="text-center mt-6">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="submit"
                    >
                      Sign In
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="flex flex-wrap mt-6 relative">
              {error && <div className="error"> {error}</div>}
              <div className="w-1/2">
                <a
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  className="text-blueGray-200"
                >
                  <small>Forgot password?</small>
                </a>
              </div>
              <div className="w-1/2 text-right">
                <Link href="/auth/register">
                  <a href="#pablo" className="text-blueGray-200">
                    <small>Create new account</small>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Login.layout = Auth;
