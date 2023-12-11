import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { Header } from "@/components/header";
import { Info } from "@/components/info";
import React, { useState, useEffect } from "react";
import WeatherDisplay from "@/components/weatherDisplay.js";
import styled from "styled-components";
import { Loading } from "@/components/loading";
import { Footer } from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	const [location, setLocation] = useState(null);
	const [weatherData, setWeatherData] = useState(null);
	const [time, setTime] = useState(null);
	const [info, setInfo] = useState(false);

	const toggleInfo = () => {
		setInfo(!info);
	};

	useEffect(() => {
		// client side fetch for ip address
		const fetchGeoLocation = async () => {
			try {
				// client side fetch for ip address
				const ipAddressResponse = await fetch("https://api.ipify.org/?format=json");
				const ipAddressData = await ipAddressResponse.json();
				const ip = ipAddressData.ip;

				// server side calls becaus api keys are stored in server side env
				// use this ip address to find their location
				const locationResponse = await fetch(`/api/location?ip=${ip}`);
				const locationData = await locationResponse.json();
				setLocation(locationData.city);
				setTime(locationData.time_zone.current_time);

				if (location === null) {
					throw "Location not found";
				}

				// use their location to get weather data
				const weatherDataResponse = await fetch(`/api/weather?location=${location}`);
				const weatherData = await weatherDataResponse.json();
				setWeatherData(weatherData);
			} catch (error) {
				if (error === "Location not found") {
					setWeatherData(null);
				} else {
					setWeatherData("WEATHER ERROR");
				}
				console.error("Error fetching data:", error);
			}
		};

		fetchGeoLocation();
	}, [location]);

	const date = String(time).substring(11, 13);
	console.log(date);

	var top = "#000000";
	var bottom = "#FFFFFF";
	var text = "#000000";

	var addOn = <></>;

	// if its night time
	if (date >= 18 || date <= 6) {
		top = "#445DE3";
		bottom = "#090D3A";
		text = "#FFFFFF";
		// if its day time
	} else {
		top = "#FFFFFF";
		bottom = "#4DA9FF";
		text = "#000000";
	}

	const PageWrapper = styled.div`
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		height: 100%;
		background: linear-gradient(${top}, ${bottom});
	`;

	const Location = styled.h1`
		color: ${text};
		font-size: 3rem;
		padding: 1rem;
		margin: 1rem;
		border-radius: 1rem;
		width: 100%;
	`;

	return (
		<PageWrapper>
			<Head>
				<title>Weather | CS392 Final</title>
				<meta name="description" content="Our weather app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/icon.png" />
			</Head>
			<Header toggleInfo={toggleInfo} />
			<Info infoVis={info} />
			<main className={`${styles.main} ${inter.className}`}>
				{/* <PageWrapper> */}
				{location ? <Location>This week in {location}...</Location> : <></>}
				{weatherData ? (
					<>
						<WeatherDisplay weatherData={weatherData} />{" "}
					</>
				) : (
					<Loading />
				)}
				{/* </PageWrapper> */}
			</main>
			<Footer />
		</PageWrapper>
	);
}
