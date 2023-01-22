import { Button, Container, Group, Text } from "@mantine/core";
import { FeaturesSection, HeroHeader, ProductsCarousel, ProductsGrid } from "../components/_index";
import { useState } from "react";

const HomePage = () => {

    return (
        <Container size={"xl"} p={0}>
            <HeroHeader />
            <ProductsCarousel />
            <ProductsGrid text="LISTE DES PRODUCTS" useRecommandation={false} ProductsNumber={8} />
            <FeaturesSection
                title="Téchnologies utilisées"
                description=""
            />
            <Container>
                <iframe
                    title="map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6400.983993793042!2d4.913946000000005!3d36.662670000000006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128d2fea39a0172f%3A0x375f0181ae906e45!2s%C3%89cole%20sup%C3%A9rieure%20en%20Sciences%20et%20Technologies%20de%20l&#39;Informatique%20et%20du%20Num%C3%A9rique!5e0!3m2!1sen!2sdz!4v1674415749002!5m2!1sen!2sdz"
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

