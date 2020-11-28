import React from "react"
import { YMaps, Map, Placemark, ZoomControl, Clusterer, ListBox, ListBoxItem } from "react-yandex-maps"

// Import static files
import './geography.css'
import iconPlacemark from '~user/static/images/placemark.png'

const mapState = {
    center: [55.759381, 37.621563],
    zoom: 13,
    controls: [],
}

const placemarkIcon = {
    iconLayout: 'default#image',
    iconImageHref: iconPlacemark,
    iconImageSize: [44, 44],
    iconImageOffset: [-5, -38],
}

const zoom = {
    size: 'small',
    position: {
        top: 'auto',
        right: 24,
        bottom: 24,
        left: 'auto'
    }
}

const coordinates = [
    [55.779826, 37.531143],
    [55.756475, 37.555244],
    [55.752030, 37.578445],
    [55.770023, 37.606756],
    [55.753831, 37.622530],
    [55.759306, 37.643637],
    [55.764364, 37.655247],
    [55.768958, 37.692374],
    [55.735930, 37.668934],
    [55.736578, 37.688039],
];

const Geography = () => (
    <section className="geography container">
        <h2>география</h2>
        <YMaps>
            <Map defaultState={mapState} className="geography__map">
                <Clusterer
                    options={{
                        preset: 'islands#invertedOrangeClusterIcons',
                        groupByCoordinates: false,
                    }}
                >
                    {coordinates.map((coordinate, index) => (
                        <Placemark key={index} geometry={coordinate} options={placemarkIcon} />
                    ))}
                </Clusterer>

                <ListBox data={{ content: 'Тип метки' }} state={{expanded: true}} >
                    <ListBoxItem
                        data={{ content: 'юрлица' }}
                        state={{ selected: true }}
                    />
                    <ListBoxItem
                        data={{ content: 'физлица' }}
                        state={{ selected: true }}
                    />
                </ListBox>

                <ZoomControl options={zoom} />
            </Map>
        </YMaps>
    </section>
)

export default Geography

