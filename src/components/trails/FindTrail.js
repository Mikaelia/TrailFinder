{
  /*
class AddTrail extends Component {
  onSubmit = e => {
    e.preventDefault()

    const {
      name,
      length,
      location,
      latitude,
      longitude,
      summary,
      difficulty,
      stars,
      starVotes,
      url,
      imgMedium,
      ascent,
      descent,
      conditionDetails,
      conditionDate,
      firestore,
      history
    } = this.props

    const newTrail = {
      name: name,
      length: length,
      location: location,
      latitude: latitude,
      longitude: longitude,
      summary: summary,
      difficulty: difficulty,
      stars: stars,
      starVotes: starVotes,
      url: url,
      imgMedium: imgMedium,
      ascent: ascent,
      descent: descent,
      conditionDetails: conditionDetails,
      conditionDate: conditionDate,
      notes: ''
    }

    firestore
      .add({ collection: 'trailmarks' }, newTrail)
      .then(() => history.push('/'))
  }

  render () {
    return (
      <div>
        <div className='row'>
          <div className='col-md-6'>
            <Link to='/' className='btn btn-link'>
              <i className='fas fa-arrow-circle-left' />
              Back To Dashboard
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

AddTrail.propTypes = {
  firestore: PropTypes.object.isRequired
}

export default firestoreConnect()(AddTrail)

*/
}
