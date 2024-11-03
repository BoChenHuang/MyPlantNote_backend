import * as _ from 'lodash'

export default () => ({
    test: {
        msg: "Hellooooo"
    },
    app: {
        port: parseInt(process.env.PORT, 10) || 3000,
        verification: process.env.VERIFICATION ? `${process.env.VERIFICATION}` : 'MyPlantNote'
    },
    database: {
        url: _.size(process.env.DB_ATLAS_URL) > 0 ? `${process.env.DB_ATLAS_URL}` : `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_SERVER}:${process.env.DB_PORT}`,
        db: _.size(process.env.DB_NAME) > 0 ?`${process.env.DB_NAME}`: 'MyPlantNote',
    },
    jwt: {
        secret: process.env.JWT_SECRET ? `${process.env.JWT_SECRET}` : 'secret of my-plant-note',
        expire: process.env.JWT_EXPIRE ? `${process.env.JWT_EXPIRE}` : '5400s'
    }
});