const Quality = (props) => {
  return (
    <span className={`badge m-1 p-1 bg-${props.color}`} key={props._id}>
      {props.name}
    </span>
  )
}

export default Quality
