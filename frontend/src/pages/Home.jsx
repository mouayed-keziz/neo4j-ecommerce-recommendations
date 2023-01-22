import { Button, Container, Group, Text } from "@mantine/core";
import { FeaturesSection, HeroHeader, ProductsCarousel, ProductsGrid } from "../components/_index";
import { useState } from "react";

const HomePage = () => {

    return (
        <Container size={"xl"} p={0}>
            <HeroHeader />
            <ProductsCarousel />
            <ProductsGrid useRecommandation={false} ProductsNumber={8} />
            <FeaturesSection
                title="lorem ipsum dolor sit amet consectetur"
                description="lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod."
            />
            <Container>
                <iframe
                    title="map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d47992575.366776414!2d-151.9690476!3d42.76224910000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8822e9243e612141%3A0xf5c615b3c1b3e1e5!2sLebron%20James%20Court!5e0!3m2!1sfr!2sdz!4v1662335412292!5m2!1sfr!2sdz"
                    width="100%"
                    height="350"
                    style={{ border: '1px solid black' }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />
            </Container>
        </Container>
    );
}


export default HomePage;

// Path: src\pages\Home.jsx

