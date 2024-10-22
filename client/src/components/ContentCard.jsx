import propTypes from 'prop-types'
import '../assets/scss/components/content-card.scss'

const ContentCard = ( {heading, children} ) => {
  return (
    <div className="content-card">
        { heading && 
            <h2 className="content-card__heading">{heading}</h2> 
        }
        <div className="content-card__content">
            {children}
        </div>
    </div>
  )
}

ContentCard.propTypes = {
    heading: propTypes.string,
    children: propTypes.node,
}

export default ContentCard