/* eslint-disable react/no-unknown-property */
// Write your code here
import {format} from 'date-fns'
import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, starAppointment} = props
  const {id, title, date, starred} = appointmentDetails

  const formattedDate = format(new Date(date), 'dd MMMM yyyy, EEEE')

  const onClickStarIcon = () => {
    starAppointment(id)
  }

  const starBtnImg = starred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="appointment-list-item">
      <div className="appointment-title-container">
        <p className="appointment-title">{title}</p>
        <button
          type="button"
          className="star-btn"
          testid="star"
          onClick={onClickStarIcon}
        >
          <img src={starBtnImg} alt="star" className="star" />
        </button>
      </div>
      <p className="appointment-date">Date: {formattedDate}</p>
    </li>
  )
}

export default AppointmentItem
