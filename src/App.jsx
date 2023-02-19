import { useState, useEffect } from 'react'
import Map from './assets/Map'

function App() {
  const [RenderUseEffect, setRenderUseEffect] = useState(false)
  const [DATA, setDATA] = useState({
    IP: '',
    Location: '',
    Timezone: '',
    ISP: '',
    lat: '',
    lon: '',
    search: '',
    error: false,
  })

  function handleSubmit(event) {
    event.preventDefault()
    setDATA(prev => ({
      ...prev,
      lat: '',
      lon: '',
    }))
    setRenderUseEffect(prev => !prev)
  }

  useEffect(() => {
    fetch(`https://ipwho.is/${DATA.search}`)
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          setDATA(prev => ({
            ...prev,
            IP: json.ip,
            Location: `${json.city}, ${json.country} ${json.postal}`,
            Timezone: json.timezone.utc,
            ISP: json.connection.isp,
            lat: json.latitude,
            lon: json.longitude,
            error: false,
          }))
        } else {
          setDATA(prev => ({
            ...prev,
            error: true,
            lat: '5',
            lon: '5',
          }))
        }
      })
      .catch(err => console.error(err))
  }, [RenderUseEffect])

  function handleChange(event) {
    const { name, value } = event.target
    setDATA(prev => {
      return {
        ...prev,
        [name]: value,
      }
    })
  }

  return (
    <main>
      <section className='container'>
        <h1 className='title'>IP Address Tracker</h1>
        <form
          onSubmit={handleSubmit}
          style={{ marginBottom: DATA.error && '139px' }}
        >
          <input
            type='text'
            name='search'
            value={DATA.search}
            onChange={handleChange}
            className='search_bar'
            pattern='[0-9\.]+'
            title='Please enter numbers and "." symbol.'
            placeholder='Search for any IP Adress or domain'
            required
          />
          <button className='btn'>
            <img src='./images/icon-arrow.svg' alt='arrow' />
          </button>
          <span style={{ display: DATA.error ? 'block' : 'none' }}>
            Please enter correct IP Adress.
          </span>
        </form>
        <section className='details'>
          <div className='boxes'>
            <h2>IP ADDRESS</h2>
            <h1 className='IP'>{DATA.IP}</h1>
          </div>
          <div className='boxes'>
            <h2>LOCATION</h2>
            <h1 className='LOCATION'>{DATA.Location}</h1>
          </div>
          <div className='boxes'>
            <h2>TIMEZONE</h2>
            <h1 className='TIMEZONE'>UTC {DATA.Timezone}</h1>
          </div>
          <div className='boxes'>
            <h2>ISP</h2>
            <h1 className='ISP'>{DATA.ISP}</h1>
          </div>
        </section>
        {DATA.lat | DATA.lon && <Map lat={DATA.lat} lon={DATA.lon} />}
      </section>
    </main>
  )
}

export default App
