import axios from 'axios'

export default class GetData {
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
        const  coordinates = await this.getResource('/coordinate')
        return coordinates
    }

    getCoordinate = async (id) => {
        const  coordinate = await this.getResource(`/coordinate/${id}`)
        return coordinate
    }

    _extractImages = (images) => {}

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
}
