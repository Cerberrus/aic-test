import React, { Component } from "react"
import { YMaps, Map, ZoomControl, ObjectManager } from "react-yandex-maps"

// Import model
import model from "~src/model/model"

// Import static files
import "./Geography.css"
import iconPlacemark from "~src/static/images/placemark.png"

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
    size: "small",
    position: {
        top: "auto",
        right: 0,
        bottom: 0,
        left: "auto",
    }
}

const managerOptions = {
    clusterize: true,
    gridSize: 12,
}

const managerObjects = {
    iconLayout: "default#image",
    iconImageHref: iconPlacemark,
    iconImageSize: [44, 44],
    iconImageOffset: [-5, -38],
}

const managerClusters = {
    preset: "islands#orangeClusterIcons",
}

export default class Geography extends Component {
    model = new model()

    state = {
        features:   {},
        filter:     -1,
        filterList: [],
    }

    componentDidMount() {
        this.model.getAllCoordinates()
            .then(response => {
                const filterList = [
                    {
                        id: -1,
                        type: "показать всё"
                    }
                ]

                filterList.push(...response.typeList)

                this.setState({
                    features:   response.coordinateList,
                    filterList: filterList
                })
            })
    }

    selectFilter = (filter) => {
        if (filter !== this.state.filter) {
            this.setState({filter})
        }
    }

    render() {
        const { filter, filterList, features } = this.state

        return (
            <section className="geography">
                <h2 className="container">география</h2>
                <YMaps>
                    <Map defaultState={mapState} options={mapOptions} className="geography__map">
                        <ObjectManager
                            options ={managerOptions}
                            objects ={managerObjects}
                            clusters={managerClusters}
                            features={features}
                            filter  ={object => object.properties.type === filter || filter === -1}
                        />

                        <div className="geography__buttonGroup">
                            {filterList.map((item) => (
                                <button
                                    key={item.id}
                                    className={`geography__button ${filter === item.id && "geography__button_active"}`}
                                    onClick={() => this.selectFilter(item.id)}
                                >
                                    {item.type}
                                </button>
                            ))}
                        </div>

                        <ZoomControl options={zoomOptions} style={{zIndex: 10}}/>
                    </Map>
                </YMaps>
            </section>
        )
    }
}
