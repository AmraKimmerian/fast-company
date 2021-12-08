const SearchStatus = props => {
  const counterClasses = `badge m-1 p-2 ${props.usersCount === 0 ? 'bg-danger' : 'bg-primary'}`
  const counterText = props.usersCount === 0 ? 'Никто с тобой не тусанет' : `${props.usersCount} человек тусует с тобой сегодня`

  return  <span className={counterClasses}>{counterText}</span>
}

export default SearchStatus