import { set, get } from './index'
import { runIfFunc } from './utils'

export const link = connect => linkSetter => ReactComponent => {
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

  return connect(stateToProps, dispatchToProps)(ReactComponent)
}
