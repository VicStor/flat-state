import { set, get } from './index'
import { runIfFunc } from './utils'
import { NO_LINK_CONNECT } from './constants'

const isLinkSetter = ReactComponent => ReactComponent !== NO_LINK_CONNECT

export const link = connect =>
  curry((linkSetter, ReactComponent = NO_LINK_CONNECT) => {
    const Component = isLinkSetter(ReactComponent) ? linkSetter : ReactComponent

    const stateToProps = (state, ownProps) => {
      const linkConfig = runIfFunc(linkSetter, ownProps)

      return Object.entries(linkConfig).reduce(
        (stateProps, [propName, lens]) => ({
          ...stateProps,
          [propName]: get(lens, state)
        }),
        {}
      )
    }

    const dispatchToProps = dispatch => ({
      set: (...args) => dispatch(set(...args))
    })

    return connect(
      isLinkSetter(ReactComponent) ? stateToProps : null,
      dispatchToProps
    )(Component)
  })
