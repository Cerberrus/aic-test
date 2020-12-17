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
            return error.response;
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

    getSlide = async (id) => {
        const  slide = await this.getResource(`/slider/${id}`)
        return this._transformSlide(slide);
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
            title:       slide.title            || '',
            alt:         slide.imageDescription || '',
            images:      slide.path             || [],
        }
    }

    // POST
    postResource = async (url, properties, file=false) => {
        try {
            return await axios({
                method: 'post',
                headers: {
                    'Content-Type': file ? 'multipart/form-data' : 'application/json'
                },
                url: `${process.env.API_BASE}${url}?${properties}`,
                data: file,
                withCredentials: true,
            })
        } catch (error) {
            return error.response;
        }
    }

    postCoordinate = async (coordinate) => {
        const properties =
            `title=${coordinate.title}`+
            `&longitude=${coordinate.longitude}`+
            `&latitude=${coordinate.latitude}`+
            `&typeId=${coordinate.type}`

        return await this.postResource('/coordinate', properties)
    }

    postSlide = async (slide) => {
        const properties =
            `title=${slide.title}`+
            `&imageDescription=${slide.alt}`

        const file = slide.file

        return await this.postResource('/slider', properties, file)
    }

    postSettings = async (settings) => {
        const properties =
            `&phone=${settings.phone}`+
            `&instagramLogin=${settings.instLogin}`+
            `&instagramPassword=${settings.instPassword}`

        return await this.postResource(`/setting`, properties)
    }

    // PUT
    putResource = async (url, properties, file=false) => {
        try {
            return await axios({
                method: 'put',
                headers: {
                    'Content-Type': file ? 'multipart/form-data' : 'application/json'
                },
                url: `${process.env.API_BASE}${url}?${properties}`,
                data: file,
                withCredentials: true
            })
        } catch (error) {
            return error.response
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

    putSlide = async (slide) => {
        const properties =
            `title=${slide.title}`+
            `&imageDescription=${slide.alt}`

        const file = slide.file

        return await this.putResource(`/slider/${slide.id}`, properties, file)
    }

    // DELETE
    deleteResource = async (url) => {
        try {
            return await axios({
                method: 'delete',
                url: `${process.env.API_BASE}${url}`,
                withCredentials: true
            })
        } catch (error) {
            return error.response
        }
    }

    deleteCoordinate = async (id) => {
        return await this.deleteResource(`/coordinate/${id}`)
    }

    deleteSlide = async (id) => {
        return await this.deleteResource(`/slider/${id}`)
    }
}
