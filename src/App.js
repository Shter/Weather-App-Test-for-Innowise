import Form from './components/Form'
import Form1 from './components/Form1'
import Weather from './components/Weather'
import Titles from './components/Titles'
import Titles1 from './components/Titles1'
const React = require ('react')
const Api_Key = "dea746ff274123f27130c42e54036ee4"
const Api_Key1 = "929b8b5f99524d1db10122715192105"

class App extends React.Component {
    state = {
        temperature: undefined,
        humidity: undefined,
        description: undefined,
        error: undefined
    }

    toStorage = () => {

    }

    getWeather = async (e) => {
        if (localStorage.lastTime == undefined) {
            localStorage.lastTime = Date.now()
        }
        const city = e.target.elements.city.value
        e.preventDefault()
        var lastTime = localStorage.lastTime
        var currentTime = Date.now()
        var twoHoursTime = lastTime + 7200000
        if (!city){
            this.setState({
                temperature: '',
                description: '',
                error: "Please input city name"
            })
        }else if (city || city !== localStorage.city || lastTime <= currentTime <= twoHoursTime) {
            const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${Api_Key}`)
            const response = await api_call.json()
            console.log(response)
            localStorage.temp = response.main.temp
            localStorage.description = response.weather[0].description
            if (city) {
                this.setState({
                    temperature: response.main.temp,
                    description: response.weather[0].description,
                    error: ""
                })
            } else {
                this.setState({
                    error: "Please input city name"
                })
            }
        }else{
            if (city) {
                this.setState({
                    temperature: localStorage.temp,
                    description: localStorage.description,
                    error: ""
                })
            } else {
                this.setState({
                    temperature: '',
                    description: '',
                    error: "Please input city name"
                })
            }
        }
    }

    getWeather1 = async (e) => {
        if (localStorage.lastTime1 == undefined) {
            localStorage.lastTime1 = Date.now()
        }
        const city = e.target.elements.city.value
        e.preventDefault()
        var lastTime = localStorage.lastTime1
        var currentTime = Date.now()
        var twoHoursTime = lastTime + 7200000
        if (!city){
            this.setState({
                temperature: '',
                description: '',
                error: "Please input city name"
            })
        }else if (city || city !== localStorage.city1 || lastTime <= currentTime <= twoHoursTime){
            const api_call = await fetch(`http://api.apixu.com/v1/current.json?key=${Api_Key1}&q=${city}`)
            const response = await api_call.json()
            console.log(response)
            localStorage.temp1 = response['current']['temp_f']
            localStorage.description1 = response['current']['condition']['text']
            if(city){
                this.setState({
                    temperature: response['current']['temp_f'],
                    description: response['current']['condition']['text'],
                    error: ""
                })
            }else{
                this.setState({
                    error: "Please input city name"
                })
            }
        }else {
            if (city) {
                this.setState({
                    temperature: localStorage.temp1,
                    description: localStorage.description1,
                    error: ""
                })
            } else {
                this.setState({
                    temperature: '',
                    description: '',
                    error: "Please input city name"
                })
            }
        }
    }
    render() {
        return (
            <div>
                <Titles />
                <Form loadWeather={this.getWeather}/>
                <Titles1 />
                <Form1 loadWeather={this.getWeather1}/>
                <Weather
                    temperature={this.state.temperature}
                    description={this.state.description}
                    error={this.state.error} />
            </div>
        )
    }
}

export default App
