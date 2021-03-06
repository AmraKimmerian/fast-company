import Qualities from '../../ui/qualities'
import Quality from '../../ui/qualities/quality'

const QualitiesCard = ({ qualities }) => {
  return (
    <div className="card-body d-flex flex-column justify-content-center text-center">
      <h5 className="card-title">
        <span>Qualities</span>
      </h5>
      <p className="card-text">
        <Qualities qualities={qualities} />
      </p>
    </div>
  )
}
export default QualitiesCard
