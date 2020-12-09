import axios from 'axios'

export default class GetData {
    constructor() {
        this._apiBase = 'https://aic.xutd.tk/api'
    }

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

    getVacancies = async () => {
        const  vacancies = await this.getResource('/vacancy')
        return vacancies.map(this._transformVacancies);
    }

    getInstagramImages = () => {
        return this.getResource('/instagram/image')
    }

    getSlides = async () => {
        const  slides = await this.getResource('/slider')
        return slides.map(this._transformSlides);
    }

    _extractImages = (images) => {}

    _transformVacancies = (vacancy) => {
        return {
            id:          vacancy.id,
            title:       vacancy.title                     || '',
            description: vacancy.description               || '',
            alt:         vacancy.imageDescription          || '',
            images:      vacancy.path                      || []
        }
    }

    _transformSlides = (slide) => {
        return {
            id:          slide.id,
            title:       slide.title            || '',
            alt:         slide.imageDescription || '',
            images:      slide.path             || []
        }
    }
}




// getAllCharacters = async () => {
//     const characters = await this.getResource('/characters?page=5&pageSize=10');
//     return characters.map(this._transformCharacter);
// }
//
// _transformCharacter = (character) => {
//     return {
//         id:      this._extractId(character),
//         name:    character.name    || 'Нет данных',
//         gender:  character.gender  || 'Нет данных',
//         born:    character.born    || 'Нет данных',
//         died:    character.died    || 'Нет данных',
//         culture: character.culture || 'Нет данных'
//     }
// }