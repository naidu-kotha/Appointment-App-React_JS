// Write your code here
import {Component} from 'react'
import {v4} from 'uuid'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {appointmentsList: [], title: '', date: '', isFilterActive: false}

  onSubmitAppointment = event => {
    event.preventDefault()
    const {title, date} = this.state

    if (title === '' || date === '') {
      alert('Enter Valid Details')
      event.preventDefault()
    } else {
      const newAppointment = {
        id: v4(),
        title,
        date,
        starred: false,
      }
      this.setState(prevState => ({
        appointmentsList: [...prevState.appointmentsList, newAppointment],
        title: '',
        date: '',
      }))
    }
  }

  starAppointment = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachItem => {
        if (id === eachItem.id) {
          return {...eachItem, starred: !eachItem.starred}
        }
        return eachItem
      }),
    }))
  }

  toggleIsFilterActive = () => {
    const {isFilterActive} = this.state

    this.setState({isFilterActive: !isFilterActive})
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeDate = event => {
    this.setState({date: event.target.value})
  }

  getFilteredAppointmentsList = () => {
    const {appointmentsList, isFilterActive} = this.state

    if (isFilterActive) {
      return appointmentsList.filter(eachItem => eachItem.starred === true)
    }
    return appointmentsList
  }

  render() {
    const {title, date, isFilterActive} = this.state
    const filteredAppointmentsList = this.getFilteredAppointmentsList()
    const starBtnBg = isFilterActive ? 'starred-btn-bg' : ''

    return (
      <div className="bg">
        <div className="appointment-card">
          <div className="add-appointment-card">
            <form
              className="appointment-details"
              onSubmit={this.onSubmitAppointment}
            >
              <h1 className="heading">Add Appointment</h1>
              <label htmlFor="title" className="label">
                Title
              </label>
              <input
                type="text"
                id="title"
                className="input"
                placeholder="Title"
                value={title}
                onChange={this.onChangeTitle}
              />
              <label htmlFor="date" className="label">
                Date
              </label>
              <input
                type="date"
                id="date"
                className="input"
                value={date}
                onChange={this.onChangeDate}
              />
              <button type="submit" className="btn">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="image"
            />
          </div>
          <div className="pending-appointments">
            <div className="heading-container">
              <h1 className="sub-heading">Appointments</h1>
              <button
                type="button"
                className={`star-button ${starBtnBg}`}
                onClick={this.toggleIsFilterActive}
              >
                Starred
              </button>
            </div>
            <ul className="appointments-list-container">
              {filteredAppointmentsList.map(eachItem => (
                <AppointmentItem
                  appointmentDetails={eachItem}
                  key={eachItem.id}
                  starAppointment={this.starAppointment}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
