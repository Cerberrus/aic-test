import React, {Component} from "react"
import { YMaps, Map, Placemark,Button, ZoomControl, ObjectManager, GeoObject, ListBox, ListBoxItem } from "react-yandex-maps"

// Import static files
import './Geography.css'
import iconPlacemark from '~user/static/images/placemark.png'

// Map config
const mapState = {
    center: [55.759381, 37.621563],
    zoom: 13,
    controls: [],
}

const mapOptions = {
    suppressMapOpenBlock: true,
}

const zoomOptions = {
    size: 'small',
    position: {
        top: 'auto',
        right: 24,
        bottom: 24,
        left: 'auto',
    }
}

// Temporary
const features = {
    "type": "FeatureCollection",
    "features": [
        {"type": "Feature", "id": 1, "geometry": {"type": "Point", "coordinates": [55.779826, 37.531143]}, "properties": {type: 'юрлица'}},
        {"type": "Feature", "id": 2, "geometry": {"type": "Point", "coordinates": [55.756475, 37.555244]}, "properties": {type: 'физлица'}},
        {"type": "Feature", "id": 3, "geometry": {"type": "Point", "coordinates": [55.752030, 37.578445]}, "properties": {type: 'юрлица'}},
        {"type": "Feature", "id": 4, "geometry": {"type": "Point", "coordinates": [55.770023, 37.606756]}, "properties": {type: 'физлица'}},
        {"type": "Feature", "id": 5, "geometry": {"type": "Point", "coordinates": [55.753831, 37.622530]}, "properties": {type: 'юрлица'}},
        {"type": "Feature", "id": 6, "geometry": {"type": "Point", "coordinates": [55.759306, 37.643637]}, "properties": {type: 'физлица'}},
        {"type": "Feature", "id": 7, "geometry": {"type": "Point", "coordinates": [55.764364, 37.655247]}, "properties": {type: 'юрлица'}},
        {"type": "Feature", "id": 8, "geometry": {"type": "Point", "coordinates": [55.768958, 37.692374]}, "properties": {type: 'физлица'}},
        {"type": "Feature", "id": 9, "geometry": {"type": "Point", "coordinates": [55.735930, 37.668934]}, "properties": {type: 'юрлица'}},
        {"type": "Feature", "id": 10, "geometry": {"type": "Point", "coordinates": [55.736578, 37.688039]}, "properties": {type: 'физлица'}},
    ],
}

export default class Geography extends Component {
    state = {
        filter: 'показать всё',
        filterValues: [
            {
                id: 0,
                value: 'юрлица',
                active: false
            }, {
                id: 1,
                value: 'физлица',
                active: false
            }, {
                id: 2,
                value: 'показать всё',
                active: true
            }
        ]
    }

    selectFilter = (filter) => {
        if (filter !== this.state.filter) {
            this.setState(({filterValues}) => {
                const result = filterValues.map((item) => {
                    item.active = item.value === filter
                    return item
                })

                return {
                    filter: filter,
                    filterValues: result
                }
            })
        }
    }

    render() {
        const { filter, filterValues } = this.state

        return (
            <section className="geography container">
                <h2>география</h2>
                <YMaps>
                    <Map defaultState={mapState} options={mapOptions} className="geography__map">
                        <ObjectManager
                            options={{
                                clusterize: true,
                                gridSize: 12,
                            }}

                            objects={{
                                iconLayout: 'default#image',
                                iconImageHref: iconPlacemark,
                                iconImageSize: [44, 44],
                                iconImageOffset: [-5, -38],
                            }}

                            clusters={{
                                preset: 'islands#orangeClusterIcons',
                            }}

                            filter={object => object.properties.type === filter || filter === 'показать всё'}

                            features={features}
                        />

                        <div className="geography__buttonGroup">
                            {filterValues.map((item, index)  => (
                                <button
                                    key={index}
                                    className={item.active ? 'geography__button geography__button_active' : 'geography__button'}
                                    onClick={() => this.selectFilter(item.value)}
                                >
                                    {item.value}
                                </button>
                            ))}
                        </div>

                        <ZoomControl options={zoomOptions} />
                    </Map>
                </YMaps>
            </section>
        )
    }
}
