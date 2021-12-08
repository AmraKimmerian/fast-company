const Bookmark = ({status, ...rest}) => {
  const classes = `btn btn-secondary bi ${status ? 'bi-bookmark-fill' : 'bi-bookmark'}`
  return <button className={classes} {...rest}/>
}

export default Bookmark