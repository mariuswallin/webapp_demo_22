import type { NextPage } from 'next'
import Form from '../components/Form'
import StaticText from '../components/StaticText'
import Title from '../components/Title'
import { useWeatherContext } from '../context/WeatherContext'

const Contact: NextPage = () => {
  const { currentLocation } = useWeatherContext()

  const handleSubmit = (data: { email: string; name: string }) => {
    alert(data)
  }

  return (
    <>
      <Title title={'Kontakt oss'} />
      <StaticText />
      <Form currentLocation={currentLocation} handleSubmit={handleSubmit} />
    </>
  )
}

export default Contact
