import axios from 'axios'

export default class Model {
    // GET
    getResource = async (url) => {
        try {
            const response = await axios({
                method: 'get',
                url: `${process.env.API_BASE}${url}`,
            })

            return response.data
        } catch (error) {
            console.error(error);
        }
    }

    getAllVacancies = async () => {
        const  vacancies = await this.getResource('/vacancy')
        return vacancies.map(this._transformVacancy);
    }

    getAllInstagramImages = () => {
        return this.getResource('/instagram/image')
    }

    getAllSlides = async () => {
        const  slides = await this.getResource('/slider')
        return slides.map(this._transformSlide);
    }

    getAllCoordinates = async () => {
        return await this.getResource('/coordinate')
    }

    getCoordinate = async (id) => {
        const  coordinate = await this.getResource(`/coordinate/${id}`)
        return this._transformCoordinate(coordinate)
    }

    getCoordinateTypes = async () => {
        const  coordinateTypes = await this.getResource(`/coordinate-type`)
        return coordinateTypes.map(this._transformCoordinateType);
    }

    getSettings = async () => {
        const  settings = await this.getResource(`/setting`)
        return this._transformSetting(settings)
    }

    _transformSetting = (setting) => {
        return {
            instLogin:    setting.instagramLogin    || '',
            instPassword: setting.instagramPassword || '',
            phone:        setting.phone             || '',
        }
    }

    _transformCoordinate = (coordinate) => {
        return {
            id:        coordinate.coordinate.features.id,
            type:      coordinate.coordinate.features.properties.type         || -1,
            title:     coordinate.coordinate.features.title                   || '',
            longitude: coordinate.coordinate.features.geometry.coordinates[0] ||  0,
            latitude:  coordinate.coordinate.features.geometry.coordinates[1] ||  0,
        }
    }

    _transformCoordinateType = (type) => {
        return {
            id:    type.id,
            title: type.type || '',
        }
    }

    _transformVacancy = (vacancy) => {
        return {
            id:          vacancy.id,
            title:       vacancy.title            || '',
            description: vacancy.description      || '',
            alt:         vacancy.imageDescription || '',
            images:      vacancy.path             || [],
        }
    }

    _transformSlide = (slide) => {
        return {
            id:          slide.id,
            title:       slide.title              || '',
            alt:         slide.imageDescription   || '',
            images:      slide.path               || [],
            active:      false,
        }
    }

    // POST
    postResource = async (url, properties) => {
        try {
            console.log(`${process.env.API_BASE}${url}?${properties}`);

            const response = await axios({
                method: 'post',
                url: `${process.env.API_BASE}${url}?${properties}`,
                withCredentials: true,
            })

            return response
        } catch (error) {
            console.error(error);
        }
    }

    postCoordinate = async (coordinate) => {
        const properties =
            `title=${coordinate.title}`+
            `&longitude=${coordinate.longitude}`+
            `&latitude=${coordinate.latitude}`+
            `&typeId=${coordinate.type}`

        return await this.postResource(`/coordinate`, properties)
    }

    postSettings = async (settings) => {
        const properties =
            `&phone=${settings.phone}`+
            `&instagramLogin=${settings.instLogin}`+
            `&instagramPassword=${settings.instPassword}`

        return await this.postResource(`/setting`, properties)
    }

    // PUT
    putResource = async (url, properties) => {
        try {
            const response = await axios({
                method: 'put',
                url: `${process.env.API_BASE}${url}?${properties}`,
                withCredentials: true
            })

            return response
        } catch (error) {
            console.error(error);
        }
    }

    putCoordinate = async (coordinate) => {
        const properties =
            `title=${coordinate.title}`+
            `&longitude=${coordinate.longitude}`+
            `&latitude=${coordinate.latitude}`+
            `&typeId=${coordinate.type}`

        return await this.putResource(`/coordinate/${coordinate.id}`, properties)
    }
}
