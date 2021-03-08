from django.shortcuts import reverse
from .models import Housing
from urllib.parse import urlencode
import googlemaps
from .constants import (
    TECH_COORDINATES,
    NORRIS_COORDINATES,
    KRESGE_COORDINATES,
    TARGET_COORDINATES,
    NEARBY_CITIES,
    SOUTHWEST_LATITUDE_LONGITUDE,
    NORTHEAST_LATITUDE_LONGITUDE,
)
import os

API_KEY = os.environ.get("SUBLETS_NU_GOOGLE_MAPS_API_KEY")
GMAPS = googlemaps.Client(API_KEY)


def url_builder(url_name, query_params):
    url = reverse(url_name) + "?"
    for param in query_params:
        if not query_params[param]:
            query_params[param] = ""
        elif "date" in param and query_params.get(
            param, None
        ):  # rent_start_date & rent_end_date formatting needs to be changed here
            query_params[param] = query_params[param].strftime("%m/%d/%Y")

    query_string = urlencode(query_params)
    url += query_string
    return url


def get_latitude(geocode_object):
    return geocode_object[0]["geometry"]["location"]["lat"]


def get_longitude(geocode_object):
    return geocode_object[0]["geometry"]["location"]["lng"]


def calculate_area(data):
    campus_area = ""

    # anything above is north campus
    # Sheil Catholic Center
    mid_campus_upper_bound = get_latitude(
        GMAPS.geocode("2110 Sheridan Rd, Evanston, IL")
    )

    # anything below is south campus
    # Cahn Auditorium
    mid_campus_lower_bound = get_latitude(
        GMAPS.geocode("600 Emerson St, Evanston, IL")
    )

    housing_latitude = get_latitude(GMAPS.geocode(data["street_address"]))

    if housing_latitude > mid_campus_upper_bound:
        campus_area = "North Campus"
    elif mid_campus_lower_bound <= housing_latitude <= mid_campus_upper_bound:
        campus_area = "Mid Campus"
    elif housing_latitude < mid_campus_lower_bound:
        campus_area = "South Campus"

    return campus_area


def calculate_distance_metrics(data, target):
    def extract_duration(distance_matrix_object):
        return distance_matrix_object["rows"][0]["elements"][0]["duration"][
            "text"
        ]

    def extract_distance(distance_matrix_object):
        return distance_matrix_object["rows"][0]["elements"][0]["distance"][
            "text"
        ]

    housingpost_geocode = GMAPS.geocode(data["street_address"])
    housing_coordinates = (
        get_latitude(housingpost_geocode),
        get_longitude(housingpost_geocode),
    )

    tech_distance_matrix = GMAPS.distance_matrix(
        housing_coordinates, TECH_COORDINATES, mode="walking"
    )
    norris_distance_matrix = GMAPS.distance_matrix(
        housing_coordinates, NORRIS_COORDINATES, mode="walking"
    )
    kresge_distance_matrix = GMAPS.distance_matrix(
        housing_coordinates, KRESGE_COORDINATES, mode="walking"
    )
    target_distance_matrix = GMAPS.distance_matrix(
        housing_coordinates, TARGET_COORDINATES, mode="walking"
    )

    duration_map = {
        "housing_location": housing_coordinates,
        "tech": extract_duration(tech_distance_matrix),
        "norris": extract_duration(norris_distance_matrix),
        "kresge": extract_duration(kresge_distance_matrix),
        "target": extract_duration(target_distance_matrix),
    }

    distance_map = {
        "tech": extract_distance(tech_distance_matrix),
        "norris": extract_distance(norris_distance_matrix),
        "kresge": extract_distance(kresge_distance_matrix),
        "target": extract_distance(target_distance_matrix),
    }

    return duration_map if target == "duration" else distance_map


def update_distance_metrics(data, duration_map, distance_map):
    data["latitude"] = duration_map["housing_location"][0]
    data["longitude"] = duration_map["housing_location"][1]
    data["duration_tech"] = duration_map["tech"]
    data["duration_norris"] = duration_map["norris"]
    data["duration_kresge"] = duration_map["kresge"]
    data["duration_target"] = duration_map["target"]


def validate_address_by_city(address):
    """
    Make sure address is within specified cities
    input: address(string)
    output: error_message(string) or empty string(if valid)
    """
    try:
        street, city, state, country = address.split(",")
    except ValueError:
        return "Your address must be in form 'street, city, state, country' (e.g. 633 Clark St, Evanston, IL, USA)."
    street = street.strip()
    city = city.strip()
    state = state.strip()
    country = country.strip()
    if city in NEARBY_CITIES:
        return ""
    return "Your city has to be one of {}. You entered '{}'.".format(
        NEARBY_CITIES, city
    )


def validate_address_by_geocode(address):
    geocode = GMAPS.geocode(address)
    if not geocode:
        return "Invalid address"
    lat = get_latitude(geocode)
    lng = get_longitude(geocode)
    sw_lat, sw_lng = SOUTHWEST_LATITUDE_LONGITUDE
    ne_lat, ne_lng = NORTHEAST_LATITUDE_LONGITUDE

    if (sw_lat <= lat <= ne_lat) and (sw_lng <= lng <= ne_lng):
        return None
    return "Your address is not close enough to Evanston."


def bytes_to_megabytes(bytes):
    return bytes / 1000000