import { useQualities } from '../../../hooks/useQualities'

const Quality = ({ id }) => {
  const { isLoading, getQuality } = useQualities()
  const quality = getQuality(id)
  return isLoading ? (
    'Loading...'
  ) : (
    <span className={`badge m-1 p-1 bg-${quality.color}`} key={quality._id}>
      {quality.name}
    </span>
  )
}

export default Quality
