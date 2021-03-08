TECH_ADDRESS = "2145 Sheridan Rd, Evanston, IL"
NORRIS_ADDRESS = "1999 Campus Dr, Evanston, IL"
KRESGE_ADDRESS = "1880 Campus Dr, Evanston, IL"
TARGET_ADDRESS = "1616 Sherman Ave, Evanston, IL"

TECH_COORDINATES = (42.0578383, -87.6761566)
NORRIS_COORDINATES = (42.0533945, -87.672668)
KRESGE_COORDINATES = (42.0515771, -87.67491000000001)
TARGET_COORDINATES = (42.0477542, -87.6820639)

NEARBY_CITIES = (
    "Evanston",
    "Chicago",
    "Wilmette",
    "Skokie",
    "Lincolnwood",
)

# used for address validation
# represents corners of rectangle bound
SOUTHWEST_LATITUDE_LONGITUDE = (41.99685, -87.745939)
NORTHEAST_LATITUDE_LONGITUDE = (42.080349, -87.657531)

NUM_PHOTOS_LIMIT = 10
PHOTO_SIZE_LIMIT_IN_MEGABYTES = 60  # 10MB

GOOGLE_MAPS_STYLES_CONFIG = [
    {
        "featureType": "water",
        "stylers": [{"visibility": "on"}, {"color": "#b5cbe4"}],
    },
    {"featureType": "landscape", "stylers": [{"color": "#efefef"}]},
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [{"color": "#83a5b0"}],
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [{"color": "#bdcdd3"}],
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [{"color": "#ffffff"}],
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [{"color": "#e3eed3"}],
    },
    {
        "featureType": "administrative",
        "stylers": [{"visibility": "on"}, {"lightness": 33}],
    },
    {"featureType": "road"},
    {
        "featureType": "poi.park",
        "elementType": "labels",
        "stylers": [{"visibility": "on"}, {"lightness": 20}],
    },
    {},
    {"featureType": "road", "stylers": [{"lightness": 20}]},
]
