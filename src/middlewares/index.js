import {applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import logger, {createLogger} from 'redux-logger'

// const logger = createLogger()


export default applyMiddleware(thunk, logger)