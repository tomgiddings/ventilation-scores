import type { NextPage } from 'next'
import Head from 'next/head'
import React from 'react';
import Image from 'next/image'
import { useState, useEffect } from 'react'

const Home: NextPage = () => {
  const dateObj = new Date();
  const dateComplete = dateObj.toLocaleDateString();
  const dateRenew = new Date(dateObj.setFullYear(dateObj.getFullYear() + 1)).toLocaleDateString();

  const [roomName, setRoomName] = useState('');
  const [roomLocation, setRoomLocation] = useState('');

  const [roomWidth, setRoomWidth] = useState(0);
  const [roomLength, setRoomLength] = useState(0);
  const [roomHeight, setRoomHeight] = useState(0);
  const [roomVolume, setRoomVolume] = useState(0);

  const [ventOutdoor, setVentOutdoor] = useState(false);
  const [ventWindows, setVentWindows] = useState(false);
  const [ventPurifier, setVentPurifier] = useState(false);
  const [ventCADR, setVentCADR] = useState(0);
  const [ventMinutes, setVentMinutes] = useState(0);

  const [score, setScore] = useState(0);
  const [rating, setRating] = useState('');

  useEffect(() => {
    if (roomWidth && roomLength && roomHeight) {
      setRoomVolume(roomWidth * roomLength * roomHeight);
    }

    if (ventPurifier && ventCADR) {
      setVentMinutes((roomVolume / ventCADR) * 60)
    }

    // create a numeric score / 100
    switch (true) {
      case score > 90: 
        setRating('A');
      break;
      case score > 70: 
        setRating('B');
      break;
      case score > 50: 
        setRating('C');
      break;
      case score > 40: 
        setRating('D');
      break;
      case score > 20: 
        setRating('E');
      break;
      default:
        setRating('F');
      break;
    }
  });

  const calculateRating = () => {
    let scoreValue = 0;
    // Purifier
    if (ventPurifier) {
      scoreValue = scoreValue + 20;
    }

    // Outdoor space
    if (ventOutdoor) {
      scoreValue = scoreValue + 20;
    }

    // Windows
    if (ventWindows) {
      scoreValue = scoreValue + 10;
    }

    // Vent minutes
    if (ventMinutes && ventMinutes < 15) {
      scoreValue = scoreValue + 20;
    }

    // Vent minutes
    if (ventMinutes && ventMinutes < 10) {
      scoreValue = scoreValue + 30;
    }

    setScore(scoreValue);
  }

  return (
    <>
      <Head>
        <title>Fresh air rating</title>
        <meta name="description" content="Create signage to indicate quality of ventilation" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="p-4">
        <h1 className="text-5xl font-light my-4">
          Room signage generator
        </h1>
        <h2 className="text-xl font-semibold my-4">Please provide the following information</h2>
        <form className="grid grid-cols-4 gap-4 my-6">
          {/* Room basics */}
          <div className="col-span-3 grid grid-cols-3 gap-4">
            <span className="p-1 col-span-1 items-center flex gap-1">
              <input type="text" className="p-2 font-semibold rounded" onChange={e => setRoomName(e.target.value)} placeholder="Room name" />
            </span>
            <span className="p-1 col-span-1 items-center flex gap-1">
              <input type="text" className="p-2 font-semibold rounded" onChange={e => setRoomLocation(e.target.value)} placeholder="Room address/location" />
            </span>
          </div>
          <div className="col-span-1 prose">
            <h3>Room information</h3>
            <p>This will be displayed on your signage.</p>
          </div>


          {/* Room dimensions */}
          <div className="col-span-3 grid grid-cols-3 gap-4">

            <span className="p-1 col-span-1 items-center flex gap-1">
              <input type="number" className="p-2 w-24 font-semibold rounded" onChange={e => setRoomWidth(parseFloat(e.target.value))} placeholder="Width" id="room-width" />
              <label className="form-check-label inline-block text-gray-800" htmlFor="room-width">
                Width (m)
              </label>
            </span>

            <span className="p-1 col-span-1 flex items-center gap-1">
              <input type="number" className="p-2 w-24 font-semibold rounded" onChange={e => setRoomLength(parseFloat(e.target.value))} placeholder="Length" id="room-length" />
              <label className="form-check-label inline-block text-gray-800" htmlFor="room-width">
                Length (m)
              </label>
            </span>

            <span className="p-1 col-span-1 flex items-center gap-1">
              <input type="number" className="p-2 w-24 font-semibold rounded" onChange={e => setRoomHeight(parseFloat(e.target.value))} placeholder="Height" id="room-height" />
              <label className="form-check-label inline-block text-gray-800" htmlFor="room-width">
                Height (m)
              </label>
            </span>

            <span className="p-1 col-span-1 flex items-center content-center gap-1">
              <input type="number" className="p-2 w-24 font-semibold rounded" onChange={e => setRoomVolume(parseFloat(e.target.value))} placeholder="Volume" value={roomVolume} id="room-volume" />
              <label className="form-check-label inline-block text-gray-800" htmlFor="room-volume">
                Volume (m<sup>3</sup>)
              </label>
            </span>
          </div>
          <div className="col-span-1 prose">
            <h3>Room size</h3>
            <p>Please enter your room dimensions, or if you already know the volume of your room you can enter this instead.</p>
          </div>

          {/* Ventilation */}
          <div className="col-span-3 grid grid-cols-3 gap-4">
            <span className="col-span-2 flex items-center">
              <input checked={ventOutdoor} onChange={e => setVentOutdoor(!ventOutdoor)} className="form-check-input appearance-none h-8 w-8 border border-gray-300 rounded bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" id="vent-outdoor" />
              <label className="form-check-label inline-block text-gray-800" htmlFor="vent-outdoor">
                Open/outdoor space
              </label>
            </span>
            <span className="col-span-2 flex items-center">
              <input checked={ventWindows} onChange={e => setVentWindows(!ventWindows)} className="form-check-input appearance-none h-8 w-8 border border-gray-300 rounded bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" id="vent-windows" />
              <label className="form-check-label inline-block text-gray-800" htmlFor="vent-windows">
                Openable windows
              </label>
            </span>
            <span className="col-span-2 flex items-center gap-1">
              <input checked={ventPurifier} onChange={e => setVentPurifier(!ventPurifier)} className="form-check-input appearance-none h-8 w-8 border border-gray-300 rounded bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" id="vent-purifier" />
              <label className="form-check-label inline-block text-gray-800" htmlFor="vent-purifier">
                Air purifier/mechanical ventilation
              </label>
              {ventPurifier &&
                <> 
                  <input type="text" className="p-2 w-24 font-semibold ml-3 rounded" onChange={e => setVentCADR(parseFloat(e.target.value))}  placeholder="CADR (m3/h)" value={ventCADR} id="vent-CADR" />
                  <label className="form-check-label inline-block text-gray-800" htmlFor="vent-CADR">
                    m<sup>3</sup> per hour (CADR)
                  </label>
                </>
              }
            </span>
          </div>
          <div className="col-span-1 prose">
            <h3>Ventilation</h3>
            <p>What options do you have for ventilation in your space?</p>
            <p>If you have an air purifier/mechanical ventilation please add its its clean air delivery rate (CADR)</p>
          </div>
        </form>
      </section>
      <section className="p-4">
        <h2 className="text-5xl font-light my-4">
          Your space
        </h2>
        <table className="table-fixed w-1/2 my-6">
          <tbody>
            <tr>
              <td>Room volume</td>
              <td>{roomVolume} m<sup>3</sup></td>
            </tr>
            <tr>
              <td>Open/outdoor space</td>
              <td>
                {ventOutdoor ?
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  :
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg> 
                }
              </td>
            </tr>

            <tr>
              <td>Openable windows</td>
              <td className="flex">
                {ventWindows ?
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  :
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg> 
                }
              </td>
            </tr>

            <tr>
              <td>Air purifier/mechanical ventilation</td>
              <td className="flex">
                {ventPurifier && ventCADR > 0 ?
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{ventCADR} m<sup>3</sup> per hour</span>
                    </>
                    :
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg> 
                }
              </td>
            </tr>
            {ventPurifier && ventCADR > 0 &&
              <tr>
                <td>Air purifier interval</td>
                <td className="flex">
                  {Math.round(ventMinutes)} minutes.
                </td>
              </tr>
            }
          </tbody>
        </table>

        <button className="bg-blue-600 text-white text-xl p-3 rounded" onClick={calculateRating}>
          Generate signage
        </button>
      </section>
      <section className="p-4">
        <h2 className="text-5xl font-light my-8">
          Your signage
        </h2>
        <article className="bg-white p-12 font-lato w-[82rem]">
            <h3 className="text-6xl font-semibold tracking-wide pb-6">Fresh air rating</h3>
            <div className="grid grid-cols-12 gap-4">
              {/* Rating */}
              <div className="grid col-span-8 grid-cols-4 gap-4 my-6 items-center">
                <span className={`col-span-1 text-white font-bold text-6xl p-3 ${rating === 'A' ? 'bg-green-700' : 'bg-gray-400'}`}>A</span>
                <span className={`col-span-3 text-3xl font-semibold`}>Excellent{rating === 'A' && ` (${score}%)`}</span>
                <span className={`col-span-1 text-white font-bold text-6xl p-3 ${rating === 'B' ? 'bg-green-600' : 'bg-gray-400'}`}>B</span>
                <span className={`col-span-3 text-3xl font-semibold`}>Good{rating === 'B' && ` (${score}%)`}</span>
                <span className={`col-span-1 text-white font-bold text-6xl p-3 ${rating === 'C' ? 'bg-green-500' : 'bg-gray-400'}`}>C</span>
                <span className={`col-span-3 text-3xl font-semibold`}>OK{rating === 'C' && ` (${score}%)`}</span>
                <span className={`col-span-1 text-white font-bold text-6xl p-3 ${rating === 'D' ? 'bg-yellow-300' : 'bg-gray-400'}`}>D</span>
                <span className={`col-span-3 text-3xl font-semibold`}>Needs improvement{rating === 'D' && ` (${score}%)`}</span>
                <span className={`col-span-1 text-white font-bold text-6xl p-3 ${rating === 'E' ? 'bg-orange-400' : 'bg-gray-400'}`}>E</span>
                <span className={`col-span-3 text-3xl font-semibold`}>Poor{rating === 'E' && ` (${score}%)`}</span>
                <span className={`col-span-1 text-white font-bold text-6xl p-3 ${rating === 'F' ? 'bg-red-600' : 'bg-gray-400'}`}>F</span>
                <span className={`col-span-3 text-3xl font-semibold`}>Very poor{rating === 'F' && ` (${score}%)`}</span>
              </div>

              <div className="col-span-4 bg-gray-200 m-4 p-4 text-lg flex flex-col gap-4 rounded-lg">
                <p className="text-4xl font-semibold">{roomName}</p>
                <p className="text-3xl text-gray-800">{roomLocation}</p>

                <table className="table-auto">
                  <tr>
                    <td className="text-gray-700">Room volume</td>
                    <td className="text-2xl">{roomVolume} m<sup>3</sup></td>
                  </tr>
                  <tr>
                    <td className="text-gray-700">Assessment date</td>
                    <td className="text-2xl">{dateComplete}</td>
                  </tr>
                  <tr>
                    <td className="text-gray-700">Suggested renewal</td>
                    <td className="text-2xl">{dateRenew}</td>
                  </tr>
                </table>

                {/* QR code TODO */}
                <p>Find out more online:</p>
                <figure className="" id="qr">

                </figure>
              </div>                
            </div>

            {/* Badges */}
            <div className="grid grid-cols-4 gap-4 mt-6">
              {/* Clean air */}
              {(ventPurifier && ventCADR > 0) &&
                <div className="border-8 border-black rounded-xl flex items-center font-semibold text-xl gap-1 col-span-1 flex-col p-6">
                  <svg version="1.1" className="w-24 h-24" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                    viewBox="0 0 512 512">
                  <g>
                    <g>
                      <path d="M482.815,93.937H29.185C13.093,93.937,0,107.029,0,123.123v265.755c0,16.093,13.093,29.186,29.185,29.186h453.63
                        c16.092,0,29.185-13.093,29.185-29.186V123.123C512,107.029,498.907,93.937,482.815,93.937z M482.815,397.665H29.185
                        c-4.845,0-8.787-3.942-8.787-8.788V123.123c0-4.845,3.942-8.788,8.787-8.788h453.63c4.845,0,8.787,3.942,8.787,8.788v265.755h0
                        C491.602,393.722,487.66,397.665,482.815,397.665z"/>
                    </g>
                  </g>
                  <g>
                    <g>
                      <path d="M165.227,138.709c-64.674,0-117.291,52.617-117.291,117.291s52.617,117.291,117.291,117.291S282.518,320.674,282.518,256
                        S229.901,138.709,165.227,138.709z M165.227,352.892c-53.427,0-96.892-43.466-96.892-96.892c0-53.426,43.466-96.892,96.892-96.892
                        c53.426,0,96.892,43.466,96.892,96.892C262.12,309.427,218.654,352.892,165.227,352.892z"/>
                    </g>
                  </g>
                  <g>
                    <g>
                      <path d="M252.137,262.786c-4.959-7.802-13.735-11.878-22.893-10.65c-11.264,1.517-22.867,0.816-33.891-2.002
                        c-1.243-5.677-4.005-10.79-7.84-14.892c1.022-2.523,2.468-4.881,4.257-6.924c7.147-8.16,11.081-18.629,11.081-29.475
                        c0-16.945-13.258-30.862-30.184-31.684l-24.291-1.179c-9.244-0.453-17.627,4.364-21.904,12.56
                        c-4.276,8.196-3.424,17.833,2.224,25.151c6.784,8.789,11.772,18.574,14.875,29.144c-4.704,4.049-8.212,9.444-9.922,15.585
                        c-2.285,0.198-4.6,0.078-6.844-0.367c-10.64-2.107-21.672-0.283-31.066,5.141c-14.675,8.472-20.099,26.913-12.347,41.981
                        l11.124,21.627c4.07,7.911,11.968,12.71,20.788,12.71c0.346,0,0.694-0.007,1.041-0.021c9.236-0.395,17.155-5.951,20.67-14.502
                        c4.25-10.345,10.288-19.619,17.974-27.634c2.942,0.902,6.063,1.389,9.298,1.389c2.924,0,5.754-0.405,8.446-1.147
                        c1.567,2.072,2.812,4.394,3.646,6.848c3.495,10.269,10.593,18.911,19.985,24.333c4.998,2.885,10.461,4.264,15.855,4.264
                        c10.443,0,20.627-5.167,26.675-14.561l13.167-20.447C257.068,280.262,257.096,270.587,252.137,262.786z M118.148,307.238
                        c-0.608,1.481-1.788,1.836-2.67,1.874c-0.882,0.035-2.089-0.215-2.821-1.639l-11.124-21.626
                        c-2.767-5.379-0.83-11.962,4.407-14.986c5.111-2.951,11.115-3.943,16.901-2.798c3.914,0.775,7.946,1.007,11.937,0.719
                        c0.934,2.318,2.133,4.501,3.56,6.513C129.792,284.674,123.018,295.385,118.148,307.238z M164.289,268.347
                        c-6.29,0-11.408-5.118-11.408-11.408s5.118-11.407,11.408-11.407s11.407,5.117,11.407,11.407S170.579,268.347,164.289,268.347z
                        M176.422,214.879c-2.8,3.198-5.136,6.819-6.93,10.688c-1.694-0.28-3.431-0.432-5.204-0.432c-0.578,0-1.151,0.017-1.723,0.048
                        c-3.845-12.279-9.783-23.67-17.721-33.954c-0.978-1.267-0.697-2.466-0.288-3.25c0.409-0.784,1.206-1.696,2.829-1.623l24.291,1.179
                        c6.042,0.294,10.774,5.261,10.774,11.309C182.452,204.744,180.31,210.439,176.422,214.879z M234.912,276.991l-13.168,20.448
                        c-3.273,5.085-9.942,6.699-15.181,3.676c-5.111-2.951-8.972-7.652-10.873-13.239c-1.421-4.174-3.49-8.141-6.072-11.73
                        c1.318-1.734,2.462-3.605,3.407-5.59c12.734,2.905,26.019,3.537,38.94,1.798c1.581-0.216,2.482,0.627,2.957,1.374
                        C235.396,274.474,235.779,275.645,234.912,276.991z"/>
                    </g>
                  </g>
                  <g>
                    <g>
                      <path d="M456.924,141.769H321.275c-5.632,0-10.199,4.566-10.199,10.199s4.567,10.199,10.199,10.199h135.649
                        c5.632,0,10.199-4.566,10.199-10.199S462.556,141.769,456.924,141.769z"/>
                    </g>
                  </g>
                  <g>
                    <g>
                      <path d="M456.924,193.785H321.275c-5.632,0-10.199,4.566-10.199,10.199s4.567,10.199,10.199,10.199h135.649
                        c5.632,0,10.199-4.566,10.199-10.199S462.556,193.785,456.924,193.785z"/>
                    </g>
                  </g>
                  <g>
                    <g>
                      <path d="M456.924,245.801H321.275c-5.632,0-10.199,4.566-10.199,10.199c0,5.633,4.567,10.199,10.199,10.199h135.649
                        c5.632,0,10.199-4.566,10.199-10.199C467.124,250.367,462.556,245.801,456.924,245.801z"/>
                    </g>
                  </g>
                  <g>
                    <g>
                      <path d="M456.924,297.817H321.275c-5.632,0-10.199,4.566-10.199,10.199c0,5.633,4.567,10.199,10.199,10.199h135.649
                        c5.632,0,10.199-4.566,10.199-10.199C467.124,302.383,462.556,297.817,456.924,297.817z"/>
                    </g>
                  </g>
                  <g>
                    <g>
                      <path d="M416.128,349.833h-94.853c-5.632,0-10.199,4.566-10.199,10.199c0,5.633,4.567,10.199,10.199,10.199h94.853
                        c5.632,0,10.199-4.566,10.199-10.199C426.327,354.399,421.76,349.833,416.128,349.833z"/>
                    </g>
                  </g>
                  <g>
                    <g>
                      <path d="M456.924,349.833h-5.1c-5.632,0-10.199,4.566-10.199,10.199c0,5.633,4.567,10.199,10.199,10.199h5.1
                        c5.632,0,10.199-4.566,10.199-10.199C467.124,354.399,462.556,349.833,456.924,349.833z"/>
                    </g>
                  </g>
                  </svg>
                  <span>Purifier installed</span>
                </div>
              }

              {/* Clean air */}
              {ventMinutes > 0 &&
                <div className="border-8 border-black rounded-xl flex items-center font-semibold text-xl gap-1 col-span-1 flex-col p-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <div className="flex items-center content-center gap-1">
                    <span className="font-bold text-3xl text-center">{Math.round(ventMinutes)}</span>minutes to clean air
                  </div>
                </div>
              }

              {/* Outdoor space */}
              {ventOutdoor &&
                <div className="border-8 border-black rounded-xl flex items-center font-semibold text-xl gap-1 col-span-1 flex-col p-6">
                  <svg version="1.1" className="w-24 h-24" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                    viewBox="0 0 297 297">
                  <g>
                    <path d="M144.865,162.638v11.946c0,4.11-2.164,8.014-5.817,9.897c-4.225,2.178-9.266,1.358-12.574-1.948l-7.817-7.819l-7.352,7.352
                      l18.259,18.258c2.034,2.035,3.155,4.74,3.155,7.618v79.593c0,5.226,4.237,9.463,9.463,9.463h15.763
                      c5.226,0,9.463-4.237,9.463-9.463V219.91c0-2.878,1.12-5.583,3.155-7.618l15.133-15.133l-7.352-7.352l-4.691,4.692
                      c-3.307,3.303-8.339,4.122-12.565,1.953c-3.657-1.877-5.826-5.779-5.826-9.889l0-23.925H144.865z"/>
                    <path d="M289.432,122.216c0-34.74-26.947-63.303-61.037-65.881C216.498,22.81,184.664,0,148.5,0S80.502,22.81,68.605,56.336
                      c-34.09,2.578-61.037,31.141-61.037,65.881c0,17.725,7.026,34.476,19.469,46.838c-0.501,3.078-0.753,6.191-0.753,9.307
                      c0,32.009,26.041,58.05,58.049,58.05h34.491v-27.176l-19.552-19.551c-2.034-2.033-3.156-4.739-3.156-7.618
                      c0-2.879,1.121-5.585,3.158-7.619l11.765-11.766c4.201-4.199,11.035-4.199,15.236,0l4.695,4.696v-7.861
                      c0-5.94,4.833-10.773,10.773-10.773h16.641c5.94,0,10.773,4.832,10.773,10.773v19.828l1.569-1.57
                      c2.034-2.034,4.74-3.155,7.617-3.155c2.878-0.001,5.584,1.12,7.619,3.155l11.766,11.766c0,0,0,0,0.001,0
                      c4.2,4.201,4.2,11.036,0,15.236l-16.426,16.426v15.209h31.365c32.008,0,58.049-26.041,58.049-58.05
                      c0-3.116-0.252-6.229-0.753-9.307C282.406,156.692,289.432,139.941,289.432,122.216z"/>
                  </g>
                  </svg>
                  <span className="font-semibold text-xl text-center">Outdoor space available</span>
                </div>
              }

              {/* Windows */}
              {ventWindows &&
                <div className="border-8 border-black rounded-xl  flex items-center font-semibold text-xl gap-1 col-span-1 flex-col p-6">
                  <svg className="w-24 h-24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 8H10C11.6569 8 13 6.65685 13 5C13 3.34315 11.6569 2 10 2C8.34315 2 7 3.34315 7 5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M4 16H15C16.6569 16 18 17.3431 18 19C18 20.6569 16.6569 22 15 22C13.3431 22 12 20.6569 12 19" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 12H19C20.6569 12 22 10.6569 22 9C22 7.34315 20.6569 6 19 6C17.3431 6 16 7.34315 16 9" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="font-semibold text-xl text-center">Windows for ventilation</span>
                </div>
              }

            </div>
        </article>
      </section>
    </>
  )
}

export default Home
